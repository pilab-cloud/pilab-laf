import { ChevronsDown, ChevronsLeft, ChevronsRight, ChevronsUp, X } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { useControllableState } from "../utils";
import type { DrawerPlacement } from "./app-frame";
import { NARROW_QUERY, useAppFrameLabels, useMediaQuery, type AppFrameLabels } from "./frame-context";

export interface DrawerPanelProps {
  /** Controlled visibility; omit for uncontrolled. A closed panel renders nothing. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** `left`/`right` are logical (they follow the writing direction, like `start`/`end`). */
  placement?: DrawerPlacement;
  /** `push` takes space from the content; `overlay` floats above it (always below 860px). */
  mode?: "push" | "overlay";
  title: string;
  icon?: React.ReactNode;
  /** Extra header controls, before the collapse/close buttons. */
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  /** Width (start/end) or height (bottom) in px. */
  size?: number;
  defaultSize?: number;
  onSizeChange?: (size: number) => void;
  minSize?: number;
  maxSize?: number;
  /** Adds a keyboard- and pointer-operable splitter on the inner edge. */
  resizable?: boolean;
  collapsible?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  closable?: boolean;
  /** Moves focus into the panel when it opens and back to the opener when it closes; Escape closes. */
  manageFocus?: boolean;
  labels?: Partial<AppFrameLabels>;
  className?: string;
  children?: React.ReactNode;
}

const STEP = 16;
const STEP_LARGE = 64;

/**
 * Non-modal panel that lives in the page flow (use the modal `Drawer` for blocking tasks). Inside `AppFrame`
 * pass it as `drawer`; elsewhere place it in a flex row/column, inside a `relative` parent for overlay mode.
 * It renders an `<aside>` landmark, so keep it outside `<main>`.
 */
export function DrawerPanel({
  open: openProp,
  defaultOpen = true,
  onOpenChange,
  placement: placementProp = "end",
  mode = "push",
  title,
  icon,
  actions,
  footer,
  size: sizeProp,
  defaultSize = 360,
  onSizeChange,
  minSize = 240,
  maxSize = 640,
  resizable,
  collapsible,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  closable = true,
  manageFocus,
  labels,
  className,
  children,
}: DrawerPanelProps) {
  const l = useAppFrameLabels(labels);
  const placement = placementProp === "left" ? "start" : placementProp === "right" ? "end" : placementProp;
  const bottom = placement === "bottom";
  const narrow = useMediaQuery(NARROW_QUERY);
  const overlay = mode === "overlay" || narrow;
  const [open, setOpen] = useControllableState<boolean>({ value: openProp, defaultValue: defaultOpen, onChange: onOpenChange });
  const [collapsed, setCollapsed] = useControllableState<boolean>({ value: collapsedProp, defaultValue: defaultCollapsed, onChange: onCollapsedChange });
  const [size, setSize] = useControllableState<number>({ value: sizeProp, defaultValue: defaultSize, onChange: onSizeChange });
  const clamp = (n: number) => Math.min(maxSize, Math.max(minSize, n));
  const titleId = React.useId();
  const ref = React.useRef<HTMLElement>(null);

  const wasOpen = React.useRef(open);
  const opener = React.useRef<HTMLElement | null>(null);
  React.useEffect(() => {
    if (!manageFocus) return;
    if (open && !wasOpen.current) {
      opener.current = document.activeElement as HTMLElement | null;
      ref.current?.focus();
    } else if (!open && wasOpen.current) {
      opener.current?.focus?.();
    }
    wasOpen.current = open;
  }, [open, manageFocus]);

  const drag = React.useRef<{ x: number; y: number; size: number } | null>(null);
  const isRtl = () => !!ref.current && getComputedStyle(ref.current).direction === "rtl";
  /** Positive when the pointer moves the splitter outward, i.e. grows the panel. */
  const grow = (dx: number, dy: number) => {
    if (bottom) return -dy;
    const towardStart = isRtl() ? dx : -dx;
    return placement === "end" ? towardStart : -towardStart;
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? STEP_LARGE : STEP;
    const outward = bottom ? "ArrowUp" : (placement === "end") !== isRtl() ? "ArrowLeft" : "ArrowRight";
    const inward = bottom ? "ArrowDown" : outward === "ArrowLeft" ? "ArrowRight" : "ArrowLeft";
    if (e.key === outward) setSize(clamp(size + step));
    else if (e.key === inward) setSize(clamp(size - step));
    else if (e.key === "Home") setSize(minSize);
    else if (e.key === "End") setSize(maxSize);
    else return;
    e.preventDefault();
  };

  if (!open) return null;

  const CollapseIcon = bottom ? (collapsed ? ChevronsUp : ChevronsDown) : (placement === "end") !== !!collapsed ? ChevronsRight : ChevronsLeft;
  const toggle = collapsible && (
    <button type="button" onClick={() => setCollapsed(!collapsed)} aria-expanded={!collapsed} aria-label={collapsed ? l.expandPanel : l.collapsePanel} className="popup-close">
      <CollapseIcon aria-hidden className={cn("size-4", !bottom && "rtl:rotate-180")} />
    </button>
  );
  const edge = bottom ? "border-t" : placement === "end" ? "border-s" : "border-e";
  const where = bottom ? "inset-x-0 bottom-0" : placement === "end" ? "inset-y-0 end-0" : "inset-y-0 start-0";
  const surface = overlay ? "bg-menu shadow-[0_16px_32px_rgba(0,0,0,0.5)]" : "bg-[rgba(12,12,16,0.72)] backdrop-blur-md";
  const base = cn("flex min-h-0 min-w-0 shrink-0 flex-col border-line-strong outline-none", edge, surface, overlay ? cn("absolute z-20", where) : "relative", placement === "start" && "order-first");

  if (collapsed) {
    return (
      <aside ref={ref} tabIndex={-1} aria-label={title} className={cn(base, bottom ? "h-10 flex-row items-center gap-2 px-3" : "w-10 items-center py-2", className)}>
        {toggle}
        {bottom && <span className="truncate text-sm text-muted">{title}</span>}
      </aside>
    );
  }

  return (
    <aside
      ref={ref}
      tabIndex={-1}
      aria-labelledby={titleId}
      data-placement={placement}
      style={{ "--drawer-size": `${clamp(size)}px` } as React.CSSProperties}
      onKeyDown={(e) => {
        if (manageFocus && closable && e.key === "Escape" && !e.defaultPrevented) setOpen(false);
      }}
      className={cn(base, bottom ? "h-(--drawer-size) max-h-full w-full" : "w-(--drawer-size) max-w-full", className)}
    >
      {resizable && (
        <div
          role="separator"
          tabIndex={0}
          aria-orientation={bottom ? "horizontal" : "vertical"}
          aria-label={l.resizePanel}
          aria-valuemin={minSize}
          aria-valuemax={maxSize}
          aria-valuenow={clamp(size)}
          onKeyDown={onKeyDown}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture?.(e.pointerId);
            drag.current = { x: e.clientX, y: e.clientY, size: clamp(size) };
          }}
          onPointerMove={(e) => {
            const d = drag.current;
            if (d) setSize(clamp(d.size + grow(e.clientX - d.x, e.clientY - d.y)));
          }}
          onPointerUp={() => (drag.current = null)}
          onPointerCancel={() => (drag.current = null)}
          className={cn(
            "absolute z-10 touch-none outline-none hover:bg-primary-light focus-visible:bg-primary-light focus-visible:ring-2 focus-visible:ring-primary/50",
            bottom ? "inset-x-0 -top-1 h-2 cursor-row-resize" : cn("inset-y-0 w-2 cursor-col-resize", placement === "end" ? "-start-1" : "-end-1"),
          )}
        />
      )}
      <div className="flex shrink-0 items-center gap-2 border-b border-line px-4 py-3">
        {icon && (
          <span aria-hidden className="flex shrink-0 text-muted">
            {icon}
          </span>
        )}
        <h2 id={titleId} className="min-w-0 flex-1 truncate text-base font-semibold text-fg">
          {title}
        </h2>
        {actions}
        {toggle}
        {closable && (
          <button type="button" onClick={() => setOpen(false)} aria-label={l.closePanel} className="popup-close">
            <X aria-hidden className="size-4" />
          </button>
        )}
      </div>
      <div className="min-h-0 flex-1 overflow-auto px-4 py-3 text-sm text-muted">{children}</div>
      {footer && <div className="flex shrink-0 justify-end gap-2.5 border-t border-line px-4 py-3">{footer}</div>}
    </aside>
  );
}

/** Alias of `DrawerPanel`, for readers looking for the inline counterpart of the modal `Drawer`. */
export const InlineDrawer = DrawerPanel;
