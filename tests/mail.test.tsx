import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { DnsRecordTable, HealthGrid, LafProvider, QueueStatusBadge, QuotaBar, TraceTimeline } from "../lib";
import { hu } from "../lib/locales/hu";

const wrap = (ui: React.ReactNode, locale: "en" | "hu" = "en") =>
  render(
    <LafProvider locale={locale} messages={locale === "hu" ? hu : undefined}>
      {ui}
    </LafProvider>,
  );

describe("mail components", () => {
  it("QueueStatusBadge labels known and unknown statuses", () => {
    wrap(
      <>
        <QueueStatusBadge status="TRANSIENT_FAILURE" />
        <QueueStatusBadge status="WEIRD" />
      </>,
    );
    expect(screen.getByText("Retrying")).toBeTruthy();
    expect(document.querySelectorAll(".badge")).toHaveLength(2);
    expect(screen.queryByText("TRANSIENT_FAILURE")).toBeNull();
  });

  it("QuotaBar renders a meter, or an unlimited note without a quota", () => {
    const { rerender } = wrap(<QuotaBar usedBytes={900} quotaBytes={1000} />);
    expect(screen.getByRole("meter")).toBeTruthy();
    expect(screen.getByText(/90/)).toBeTruthy();
    rerender(
      <LafProvider>
        <QuotaBar usedBytes={2048} />
      </LafProvider>,
    );
    expect(screen.queryByText(/%/)).toBeNull();
  });

  it("HealthGrid lists services", () => {
    wrap(
      <HealthGrid
        services={[
          { id: "smtp", name: "SMTP", status: "up" },
          { id: "pop3", name: "POP3", status: "down", detail: "refused" },
        ]}
      />,
    );
    const list = screen.getByRole("list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);
    expect(within(list).getByText("POP3")).toBeTruthy();
  });

  it("DnsRecordTable shows rows with a copy button", async () => {
    wrap(<DnsRecordTable records={[{ id: "mx", type: "MX", host: "pilab.hu", value: "10 mx.pilab.hu.", purpose: "Mail routing", state: "verified" }]} />);
    expect(screen.getByRole("table")).toBeTruthy();
    expect(screen.getByText("10 mx.pilab.hu.")).toBeTruthy();
    expect(screen.getAllByRole("button").length).toBe(1);
    await userEvent.setup().click(screen.getByRole("button"));
  });

  it("TraceTimeline renders hops in order", () => {
    wrap(
      <TraceTimeline
        hops={[
          { id: "a", time: "2025-01-01T10:00:00Z", label: "Received" },
          { id: "b", time: "2025-01-01T10:00:01Z", label: "Delivered", tone: "ok", elapsedMs: 900 },
        ]}
      />,
    );
    expect(within(screen.getByRole("list")).getAllByRole("listitem").map((li) => li.textContent)[0]).toContain("Received");
  });

  it("has no axe violations and translates to Hungarian", async () => {
    const { container } = wrap(
      <>
        <QuotaBar usedBytes={10} quotaBytes={100} />
        <DnsRecordTable records={[{ id: "x", type: "TXT", host: "a", value: "v=spf1 -all", purpose: "SPF", state: "missing" }]} />
        <TraceTimeline hops={[{ id: "a", time: 0, label: "Hop" }]} />
      </>,
      "hu",
    );
    expect(await axe(container)).toHaveNoViolations();
    expect(screen.getByRole("table").getAttribute("aria-label")).not.toBe("DNS records");
  });
});
