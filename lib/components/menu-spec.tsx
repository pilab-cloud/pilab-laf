import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";

/**
 * Local, structurally compatible copy of the design.md U4 `MenuItemSpec`.
 * Internal to tree/action-bar until lib/components/menu.tsx lands; not re-exported from lib/index.ts.
 */
export type MenuItemSpec =
  | {
      type?: "item";
      id: string;
      label: string;
      icon?: React.ReactNode;
      shortcut?: string;
      danger?: boolean;
      disabled?: boolean | string;
      onSelect(): void;
    }
  | { type: "checkbox"; id: string; label: string; checked: boolean; onCheckedChange(v: boolean): void }
  | { type: "radio"; id: string; value: string; onValueChange(v: string): void; options: { value: string; label: string }[] }
  | { type: "submenu"; id: string; label: string; icon?: React.ReactNode; items: MenuItemSpec[] }
  | { type: "separator" }
  | { type: "label"; label: string };

const itemCls =
  "dropdown-item flex items-center gap-2 outline-none data-[highlighted]:bg-surface-hover data-[highlighted]:text-fg data-[disabled]:opacity-50";

/** Renders specs as Radix dropdown-menu children (must sit inside a Content/SubContent). */
export function MenuSpecItems({ items }: { items: MenuItemSpec[] }) {
  return (
    <>
      {items.map((it, i) => {
        switch (it.type) {
          case "separator":
            return <DropdownPrimitive.Separator key={`sep-${i}`} className="dropdown-sep" />;
          case "label":
            return (
              <DropdownPrimitive.Label key={`lbl-${i}`} className="dropdown-label">
                {it.label}
              </DropdownPrimitive.Label>
            );
          case "checkbox":
            return (
              <DropdownPrimitive.CheckboxItem key={it.id} checked={it.checked} onCheckedChange={it.onCheckedChange} className={itemCls}>
                <span className="flex size-4 items-center justify-center">
                  <DropdownPrimitive.ItemIndicator>
                    <Check className="size-4" aria-hidden />
                  </DropdownPrimitive.ItemIndicator>
                </span>
                {it.label}
              </DropdownPrimitive.CheckboxItem>
            );
          case "radio":
            return (
              <DropdownPrimitive.RadioGroup key={it.id} onValueChange={it.onValueChange}>
                {it.options.map((o) => (
                  <DropdownPrimitive.RadioItem key={o.value} value={o.value} className={itemCls}>
                    <span className="flex size-4 items-center justify-center">
                      <DropdownPrimitive.ItemIndicator>
                        <Check className="size-4" aria-hidden />
                      </DropdownPrimitive.ItemIndicator>
                    </span>
                    {o.label}
                  </DropdownPrimitive.RadioItem>
                ))}
              </DropdownPrimitive.RadioGroup>
            );
          case "submenu":
            return (
              <DropdownPrimitive.Sub key={it.id}>
                <DropdownPrimitive.SubTrigger className={itemCls}>
                  {it.icon}
                  {it.label}
                </DropdownPrimitive.SubTrigger>
                <DropdownPrimitive.Portal>
                  <DropdownPrimitive.SubContent className="dropdown-menu relative! top-auto! left-auto! z-40 min-w-40">
                    <MenuSpecItems items={it.items} />
                  </DropdownPrimitive.SubContent>
                </DropdownPrimitive.Portal>
              </DropdownPrimitive.Sub>
            );
          default:
            return (
              <DropdownPrimitive.Item
                key={it.id}
                disabled={!!it.disabled}
                title={typeof it.disabled === "string" ? it.disabled : undefined}
                onSelect={() => it.onSelect()}
                className={cn(itemCls, it.danger && "danger")}
              >
                {it.icon && <span className="flex size-4 items-center justify-center [&>svg]:size-4">{it.icon}</span>}
                <span className="flex-1">{it.label}</span>
                {it.shortcut && <kbd className="ms-4 text-xs text-muted">{it.shortcut}</kbd>}
              </DropdownPrimitive.Item>
            );
        }
      })}
    </>
  );
}

/** Menu opened programmatically at viewport coordinates (context menus). */
export function PointMenu({
  x,
  y,
  items,
  onClose,
  label,
}: {
  x: number;
  y: number;
  items: MenuItemSpec[];
  onClose: () => void;
  label: string;
}) {
  return (
    <DropdownPrimitive.Root open onOpenChange={(o) => !o && onClose()} modal={false}>
      <DropdownPrimitive.Trigger asChild>
        {/* dynamic pointer anchor */}
        <span aria-hidden className="pointer-events-none fixed size-0" style={{ left: x, top: y }} />
      </DropdownPrimitive.Trigger>
      <DropdownPrimitive.Portal>
        <DropdownPrimitive.Content
          aria-label={label}
          align="start"
          sideOffset={0}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className="dropdown-menu relative! top-auto! left-auto! z-30 min-w-48"
        >
          <MenuSpecItems items={items} />
        </DropdownPrimitive.Content>
      </DropdownPrimitive.Portal>
    </DropdownPrimitive.Root>
  );
}
