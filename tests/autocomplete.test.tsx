import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { Autocomplete, ChipsInput, QuickSearch, type AutocompleteOption, type QuickSearchResult } from "../lib/components/autocomplete";
import { LafProvider } from "../lib";

const opt = (v: string, group?: string): AutocompleteOption => ({ value: v, label: v, group });

describe("Autocomplete", () => {
  it("debounces async loads, aborts stale ones and shows grouped results", async () => {
    const signals: AbortSignal[] = [];
    const load = vi.fn((q: string, signal: AbortSignal) => {
      signals.push(signal);
      return Promise.resolve([opt(`${q}-1`, "Hosts")]);
    });
    render(<Autocomplete label="Find" loadOptions={load} debounceMs={40} />);
    const input = screen.getByRole("combobox", { name: "Find" });
    await userEvent.click(input);
    await userEvent.type(input, "ab");
    await waitFor(() => expect(screen.getByRole("option", { name: "ab-1" })).toBeTruthy());
    expect(screen.getByRole("group", { name: "Hosts" })).toBeTruthy();
    const queries = load.mock.calls.map((c) => c[0]);
    expect(queries).not.toContain("a");
    expect(queries.at(-1)).toBe("ab");
    expect(signals.slice(0, -1).every((s) => s.aborted)).toBe(true);
  });

  it("shows loading, error with retry and empty states", async () => {
    let fail = true;
    const load = vi.fn(() => (fail ? Promise.reject(new Error("x")) : Promise.resolve([])));
    render(<Autocomplete label="Find" loadOptions={load} debounceMs={0} />);
    await userEvent.click(screen.getByRole("combobox"));
    expect((await screen.findByRole("alert")).textContent).toContain("Couldn't load options");
    fail = false;
    await userEvent.click(screen.getByRole("button", { name: "Retry" }));
    await waitFor(() => expect(screen.getByRole("status").textContent).toBe("No results"));
  });

  it("selects with the keyboard (single, controlled)", async () => {
    const onChange = vi.fn();
    render(<Autocomplete label="Pick" options={[opt("alpha"), opt("beta")]} value={null} onChange={onChange} />);
    const input = screen.getByRole("combobox");
    await userEvent.click(input);
    await userEvent.keyboard("{ArrowDown}{Enter}");
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ value: "beta" }));
  });

  it("creates a free-solo option on Enter and via the Create row (multiple)", async () => {
    const onChange = vi.fn();
    render(<Autocomplete multiple freeSolo label="Tags" options={[opt("prod")]} onChange={onChange} />);
    const input = screen.getByRole("combobox");
    await userEvent.type(input, "pr{Enter}");
    expect(onChange).toHaveBeenLastCalledWith([{ value: "pr", label: "pr" }]);
    await userEvent.type(input, "zzz");
    await userEvent.click(screen.getByRole("option", { name: "Create “zzz”" }));
    expect(onChange).toHaveBeenLastCalledWith([{ value: "pr", label: "pr" }, { value: "zzz", label: "zzz" }]);
    await userEvent.keyboard("{Backspace}");
    expect(onChange).toHaveBeenLastCalledWith([{ value: "pr", label: "pr" }]);
  });
});

describe("ChipsInput", () => {
  it("adds on Enter, comma, paste-split and blur; removes with Backspace and the x button", async () => {
    const onChange = vi.fn();
    function H() {
      const [v, setV] = React.useState<string[]>([]);
      return (
        <ChipsInput
          label="Tags"
          value={v}
          onChange={(n) => {
            onChange(n);
            setV(n);
          }}
        />
      );
    }
    render(<H />);
    const input = screen.getByRole("textbox", { name: "Tags" });
    await userEvent.type(input, "a{Enter}b,");
    expect(onChange).toHaveBeenLastCalledWith(["a", "b"]);
    await userEvent.click(input);
    await userEvent.paste("c d,e");
    expect(onChange).toHaveBeenLastCalledWith(["a", "b", "c", "d", "e"]);
    await userEvent.type(input, "f");
    fireEvent.blur(input);
    expect(onChange).toHaveBeenLastCalledWith(["a", "b", "c", "d", "e", "f"]);
    await userEvent.type(input, "{Backspace}");
    expect(onChange).toHaveBeenLastCalledWith(["a", "b", "c", "d", "e"]);
    await userEvent.click(screen.getByRole("button", { name: "Remove a" }));
    expect(onChange).toHaveBeenLastCalledWith(["b", "c", "d", "e"]);
  });

  it("validates, enforces max and duplicate policy, and can keep invalid chips in the danger tone", async () => {
    const onChange = vi.fn();
    const { rerender } = render(<ChipsInput label="Hosts" defaultValue={["ok"]} onChange={onChange} max={2} validate={(c) => (c.startsWith("x") ? "bad" : undefined)} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "xx{Enter}");
    expect(screen.getByRole("alert").textContent).toBe("bad");
    await userEvent.clear(input);
    await userEvent.type(input, "ok{Enter}");
    expect(screen.getByRole("alert").textContent).toContain("already added");
    await userEvent.clear(input);
    await userEvent.type(input, "two{Enter}three{Enter}");
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("alert").textContent).toContain("At most 2");

    rerender(<ChipsInput label="Hosts" value={["xbad", "fine"]} keepInvalid validate={(c) => (c.startsWith("x") ? "bad" : undefined)} icon={() => <svg data-testid="ic" />} />);
    expect(screen.getByText("xbad").closest("span.inline-flex[data-invalid]")).toBeTruthy();
    expect(screen.getByText("fine").closest("[data-invalid]")).toBeNull();
    expect(screen.getAllByTestId("ic")).toHaveLength(2);
  });
});

describe("QuickSearch", () => {
  const data: QuickSearchResult[] = [
    { id: "1", kind: "vm", name: "web-01", path: "dc / web-01", state: "running", group: "Virtual machines" },
    { id: "2", kind: "host", name: "web-host", path: "dc", group: "Hosts" },
  ];

  it("selects a result via the keyboard, then lists it under recent searches", async () => {
    const onSelect = vi.fn();
    const search = vi.fn((_q: string, _s: AbortSignal) => Promise.resolve(data));
    render(
      <LafProvider>
        <QuickSearch search={search} onSelect={onSelect} debounceMs={0} />
      </LafProvider>,
    );
    const input = screen.getByRole("combobox", { name: "Search inventory" });
    await userEvent.type(input, "web");
    expect(await screen.findByRole("group", { name: "Hosts" })).toBeTruthy();
    await userEvent.keyboard("{ArrowDown}{Enter}");
    expect(onSelect).toHaveBeenCalledWith(data[1]);
    await userEvent.click(input);
    const recent = await screen.findByRole("group", { name: "Recent searches" });
    expect(recent.textContent).toContain("web-host");
  });

  it("focuses on Ctrl+K and shows the empty state", async () => {
    render(<QuickSearch search={() => Promise.resolve([])} onSelect={() => {}} debounceMs={0} />);
    const input = screen.getByRole("combobox");
    act(() => {
      fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    });
    expect(document.activeElement).toBe(input);
    await userEvent.type(input, "zz");
    await waitFor(() => expect(screen.getByRole("status").textContent).toBe("No results for “zz”"));
  });
});
