import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { MenuSpecItems, type MenuItemSpec } from "./menu-spec";

export interface ActionBarProps {
  items: MenuItemSpec[];
  label: string;
  className?: string;
  labels?: { actions?: string };
}

const btn = "btn btn-ghost btn-sm shrink-0";

function Menu({ trigger, items, aria }: { trigger: React.ReactNode; items: MenuItemSpec[]; aria?: string }) {
  return (
    <DropdownPrimitive.Root>
      <DropdownPrimitive.Trigger className={btn} aria-label={aria}>
        {trigger}
      </DropdownPrimitive.Trigger>
      <DropdownPrimitive.Portal>
        <DropdownPrimitive.Content align="end" sideOffset={4} className="dropdown-menu relative! top-auto! left-auto! z-30 min-w-48">
          <MenuSpecItems items={items} />
        </DropdownPrimitive.Content>
      </DropdownPrimitive.Portal>
    </DropdownPrimitive.Root>
  );
}

function BarItem({ it }: { it: MenuItemSpec }) {
  switch (it.type) {
    case "separator":
      return <span role="separator" aria-orientation="vertical" className="mx-1 h-5 w-px shrink-0 bg-line" />;
    case "label":
      return <span className="shrink-0 px-1 text-xs text-muted">{it.label}</span>;
    case "checkbox":
      return (
        <button type="button" aria-pressed={it.checked} className={cn(btn, it.checked && "bg-primary-light")} onClick={() => it.onCheckedChange(!it.checked)}>
          {it.label}
        </button>
      );
    case "radio":
      return (
        <span role="group" className="flex shrink-0 gap-0.5">
          {it.options.map((o) => (
            <button key={o.value} type="button" className={btn} aria-pressed={false} onClick={() => it.onValueChange(o.value)}>
              {o.label}
            </button>
          ))}
        </span>
      );
    case "submenu":
      return <Menu items={it.items} trigger={<>{it.icon}{it.label}</>} />;
    default:
      return (
        <button
          type="button"
          className={cn(btn, it.danger && "text-danger")}
          disabled={!!it.disabled}
          title={typeof it.disabled === "string" ? it.disabled : undefined}
          onClick={() => it.onSelect()}
        >
          {it.icon}
          {it.label}
        </button>
      );
  }
}

const keyOf = (it: MenuItemSpec, i: number) => ("id" in it ? it.id : `${it.type}-${i}`);

/** Toolbar fed by `MenuItemSpec[]`; items that do not fit move into an overflow "Actions" menu. */
export function ActionBar({ items, label, className, labels }: ActionBarProps) {
  const actions = labels?.actions ?? "Actions";
  const ref = React.useRef<HTMLDivElement>(null);
  const widths = React.useRef<number[]>([]);
  const moreW = React.useRef(0);
  const [visible, setVisible] = React.useState(items.length);

  const measure = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.querySelectorAll<HTMLElement>("[data-ab]").forEach((c) => {
      widths.current[Number(c.dataset.ab)] = c.offsetWidth;
    });
    const more = el.querySelector<HTMLElement>("[data-ab-more]");
    if (more) moreW.current = more.offsetWidth;
    const avail = el.clientWidth;
    const total = widths.current.slice(0, items.length).reduce((a, b) => a + b + 4, 0);
    if (total <= avail || avail === 0) return setVisible(items.length);
    let used = moreW.current + 4;
    let n = 0;
    for (; n < items.length; n++) {
      used += (widths.current[n] ?? 0) + 4;
      if (used > avail) break;
    }
    setVisible(n);
  }, [items.length]);

  React.useLayoutEffect(() => {
    widths.current = [];
    setVisible(items.length);
  }, [items]);
  React.useLayoutEffect(() => {
    measure();
  });
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setVisible(items.length));
    ro.observe(el);
    return () => ro.disconnect();
  }, [items.length]);

  const shown = items.slice(0, visible);
  const hidden = items.slice(visible);
  return (
    <div ref={ref} role="toolbar" aria-label={label} className={cn("flex min-w-0 items-center gap-1 overflow-hidden", className)}>
      {shown.map((it, i) => (
        <span key={keyOf(it, i)} data-ab={i} className="flex shrink-0 items-center">
          <BarItem it={it} />
        </span>
      ))}
      {hidden.length > 0 && (
        <span data-ab-more className="ms-auto flex shrink-0">
          <Menu aria={actions} trigger={<><MoreHorizontal className="size-4" aria-hidden />{actions}</>} items={hidden} />
        </span>
      )}
    </div>
  );
}
