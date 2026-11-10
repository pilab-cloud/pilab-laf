import * as React from "react";
import { Button, Combobox, ContextMenuFor, Menu, type ComboboxOption, type MenuItemSpec } from "../../lib";

const ALL: ComboboxOption[] = [
  ...["Compute", "Storage", "Network"].map((l) => ({ value: l.toLowerCase(), label: l, group: "Infrastructure" })),
  ...["Identity", "Security"].map((l) => ({ value: l.toLowerCase(), label: l, group: "Access" })),
];

export default function ComboMenus() {
  const [single, setSingle] = React.useState<ComboboxOption[]>([]);
  const [multi, setMulti] = React.useState<ComboboxOption[]>([ALL[0]!]);
  const [opts, setOpts] = React.useState(ALL);
  const [pinned, setPinned] = React.useState(false);
  const [sort, setSort] = React.useState("name");

  const items: MenuItemSpec[] = [
    { id: "open", label: "Open", shortcut: "⌘O", onSelect: () => {} },
    { id: "rename", label: "Rename", shortcut: "F2", onSelect: () => {} },
    { id: "lock", label: "Edit", disabled: "You lack permission", onSelect: () => {} },
    { type: "separator" },
    { type: "label", label: "View" },
    { type: "checkbox", id: "pin", label: "Pinned", checked: pinned, onCheckedChange: setPinned },
    { type: "radio", id: "sort", value: sort, onValueChange: setSort, options: [{ value: "name", label: "Sort by name" }, { value: "date", label: "Sort by date" }] },
    { type: "submenu", id: "more", label: "More", items: [{ id: "copy", label: "Copy link", onSelect: () => {} }] },
    { type: "separator" },
    { id: "del", label: "Delete", danger: true, shortcut: "⌫", onSelect: () => {} },
  ];

  return (
    <div className="grid max-w-md gap-6">
      <Combobox label="Service" options={opts} value={single} onChange={setSingle} placeholder="Pick one…" clearable />
      <Combobox
        label="Services"
        multiple
        options={opts}
        value={multi}
        onChange={setMulti}
        placeholder="Pick several…"
        onCreate={(q) => {
          const o = { value: q.toLowerCase(), label: q, group: "Custom" };
          setOpts((l) => [...l, o]);
          setMulti((m) => [...m, o]);
        }}
      />
      <Combobox
        label="Async"
        options={async (q) => {
          await new Promise((r) => setTimeout(r, 300));
          return ALL.filter((o) => o.label.toLowerCase().includes(q.toLowerCase()));
        }}
        value={single}
        onChange={setSingle}
      />
      <div className="flex items-center gap-3">
        <Menu items={items} trigger={<Button>Actions</Button>} />
        <ContextMenuFor items={items}>
          <div className="rounded-md border border-line p-4 text-sm text-muted">Right-click this row</div>
        </ContextMenuFor>
      </div>
    </div>
  );
}
