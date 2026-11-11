import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu";
import * as ContextPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { Kbd } from "./more";

/* ── Declarative menu model (shared by Menu, ContextMenuFor, ActionBar, row kebabs) ── */
export type MenuItemSpec =
  | {
      type?: "item";
      id: string;
      label: string;
      icon?: React.ReactNode;
      shortcut?: string;
      danger?: boolean;
      /** `true`, or a reason string shown as a tooltip. */
      disabled?: boolean | string;
      onSelect(): void;
    }
  | { type: "checkbox"; id: string; label: string; checked: boolean; onCheckedChange(v: boolean): void; disabled?: boolean | string }
  | { type: "radio"; id: string; value: string; onValueChange(v: string): void; options: { value: string; label: string }[] }
  | { type: "submenu"; id: string; label: string; icon?: React.ReactNode; items: MenuItemSpec[]; disabled?: boolean | string }
  | { type: "separator"; id?: string }
  | { type: "label"; id?: string; label: string };

const contentCls = "dropdown-menu relative! top-auto! start-auto! z-50 min-w-48";
const itemCls =
  "dropdown-item cursor-default outline-none data-[highlighted]:bg-surface-hover data-[highlighted]:text-fg data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

type Prim = typeof DropdownPrimitive | typeof ContextPrimitive;

export function MenuShortcut({ className, ...props }: React.ComponentProps<typeof Kbd>) {
  return <Kbd className={cn("ms-auto", className)} {...props} />;
}

function disabledProps(d?: boolean | string) {
  return d ? { disabled: true, title: typeof d === "string" ? d : undefined } : {};
}

function renderItems(P: Prim, items: MenuItemSpec[]): React.ReactNode {
  // Both primitive sets share an identical API; the union type just needs a loose view.
  const X = P as typeof DropdownPrimitive;
  return items.map((it, i) => {
    const key = ("id" in it && it.id) || `${it.type}-${i}`;
    switch (it.type) {
      case "separator":
        return <X.Separator key={key} className="dropdown-sep" />;
      case "label":
        return (
          <X.Label key={key} className="dropdown-label">
            {it.label}
          </X.Label>
        );
      case "checkbox":
        return (
          <X.CheckboxItem key={key} className={cn(itemCls, "relative ps-8")} checked={it.checked} onCheckedChange={it.onCheckedChange} {...disabledProps(it.disabled)}>
            <X.ItemIndicator className="absolute start-3 inline-flex">
              <Check className="size-3.5" aria-hidden />
            </X.ItemIndicator>
            {it.label}
          </X.CheckboxItem>
        );
      case "radio":
        return (
          <X.RadioGroup key={key} value={it.value} onValueChange={it.onValueChange}>
            {it.options.map((o) => (
              <X.RadioItem key={o.value} value={o.value} className={cn(itemCls, "relative ps-8")}>
                <X.ItemIndicator className="absolute start-3.5 inline-flex">
                  <Circle className="size-2 fill-current" aria-hidden />
                </X.ItemIndicator>
                {o.label}
              </X.RadioItem>
            ))}
          </X.RadioGroup>
        );
      case "submenu":
        return (
          <X.Sub key={key}>
            <X.SubTrigger className={itemCls} {...disabledProps(it.disabled)}>
              {it.icon}
              {it.label}
              <ChevronRight className="ms-auto size-3.5 rtl:rotate-180" aria-hidden />
            </X.SubTrigger>
            <X.Portal>
              <X.SubContent sideOffset={2} alignOffset={-4} className={contentCls}>
                {renderItems(P, it.items)}
              </X.SubContent>
            </X.Portal>
          </X.Sub>
        );
      default:
        return (
          <X.Item key={key} className={cn(itemCls, it.danger && "danger")} onSelect={() => it.onSelect()} {...disabledProps(it.disabled)}>
            {it.icon}
            {it.label}
            {it.shortcut && <MenuShortcut>{it.shortcut}</MenuShortcut>}
          </X.Item>
        );
    }
  });
}

/* ── Dropdown menu from specs ── */
export function Menu({
  items,
  trigger,
  align = "end",
  open,
  onOpenChange,
}: {
  items: MenuItemSpec[];
  /** Element that opens the menu (rendered via asChild). */
  trigger: React.ReactNode;
  align?: "start" | "center" | "end";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <DropdownPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DropdownPrimitive.Trigger asChild>{trigger}</DropdownPrimitive.Trigger>
      <DropdownPrimitive.Portal>
        <DropdownPrimitive.Content align={align} sideOffset={4} collisionPadding={8} className={contentCls}>
          {renderItems(DropdownPrimitive, items)}
        </DropdownPrimitive.Content>
      </DropdownPrimitive.Portal>
    </DropdownPrimitive.Root>
  );
}

/* ── Context menu from specs (right-click, Shift+F10, Menu key) ── */
export function ContextMenuFor({ items, children, disabled }: { items: MenuItemSpec[]; children: React.ReactNode; disabled?: boolean }) {
  return (
    <ContextPrimitive.Root>
      <ContextPrimitive.Trigger asChild disabled={disabled}>
        {children}
      </ContextPrimitive.Trigger>
      <ContextPrimitive.Portal>
        <ContextPrimitive.Content collisionPadding={8} className={contentCls}>
          {renderItems(ContextPrimitive, items)}
        </ContextPrimitive.Content>
      </ContextPrimitive.Portal>
    </ContextPrimitive.Root>
  );
}
