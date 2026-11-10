import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { useLaf } from "../i18n";

/* ── Dialog (modal "popup") ── */
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({
  title,
  description,
  footer,
  children,
  className,
  ...props
}: Omit<React.ComponentProps<typeof DialogPrimitive.Content>, "title"> & {
  title: string;
  description?: string;
  footer?: React.ReactNode;
}) {
  const { t: laf } = useLaf();
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[rgba(5,5,10,0.7)] backdrop-blur-xs" />
      <DialogPrimitive.Content
        className={cn("popup fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2", className)}
        {...(description ? {} : { "aria-describedby": undefined })}
        {...props}
      >
        <div className="popup-head">
          <div>
            <DialogPrimitive.Title className="popup-title">{title}</DialogPrimitive.Title>
            {description && (
              <DialogPrimitive.Description className="popup-sub">{description}</DialogPrimitive.Description>
            )}
          </div>
          <DialogPrimitive.Close className="popup-close" aria-label={laf.close}>
            <X className="size-4" aria-hidden />
          </DialogPrimitive.Close>
        </div>
        <div className="popup-body">{children}</div>
        {footer && <div className="popup-foot">{footer}</div>}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

/* ── Popover ── */
export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverClose = PopoverPrimitive.Close;

export function PopoverContent({
  title,
  footer,
  children,
  className,
  align = "start",
  ...props
}: Omit<React.ComponentProps<typeof PopoverPrimitive.Content>, "title"> & {
  title?: string;
  footer?: React.ReactNode;
}) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={8}
        className={cn("popover-panel relative! top-auto! left-auto! z-30", className)}
        {...props}
      >
        {title && <div className="popover-title">{title}</div>}
        {children}
        {footer && <div className="popover-foot">{footer}</div>}
        <PopoverPrimitive.Arrow className="fill-menu stroke-line-strong" width={12} height={6} />
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}

/* ── Dropdown menu (actions) ── */
export const DropdownMenu = DropdownPrimitive.Root;
export const DropdownMenuTrigger = DropdownPrimitive.Trigger;

export function DropdownMenuContent({
  className,
  align = "end",
  ...props
}: React.ComponentProps<typeof DropdownPrimitive.Content>) {
  return (
    <DropdownPrimitive.Portal>
      <DropdownPrimitive.Content
        align={align}
        sideOffset={4}
        className={cn("dropdown-menu relative! top-auto! left-auto! z-30 min-w-48", className)}
        {...props}
      />
    </DropdownPrimitive.Portal>
  );
}

export function DropdownMenuItem({
  danger,
  className,
  ...props
}: React.ComponentProps<typeof DropdownPrimitive.Item> & { danger?: boolean }) {
  return (
    <DropdownPrimitive.Item
      className={cn("dropdown-item outline-none data-[highlighted]:bg-surface-hover data-[highlighted]:text-fg", danger && "danger", className)}
      {...props}
    />
  );
}

export function DropdownMenuLabel({ className, ...props }: React.ComponentProps<typeof DropdownPrimitive.Label>) {
  return <DropdownPrimitive.Label className={cn("dropdown-label", className)} {...props} />;
}

export function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof DropdownPrimitive.Separator>) {
  return <DropdownPrimitive.Separator className={cn("dropdown-sep", className)} {...props} />;
}

/* ── Tabs (underline) ── */
export const Tabs = TabsPrimitive.Root;
export const TabsContent = TabsPrimitive.Content;

export function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return <TabsPrimitive.List className={cn("tabs", className)} {...props} />;
}

export function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "tab cursor-pointer border-0 border-b-2 bg-transparent font-[inherit] data-[state=active]:border-primary data-[state=active]:text-fg",
        className,
      )}
      {...props}
    />
  );
}

/* ── Tooltip (icon-only controls and truncated text) ── */
export const TooltipProvider = TooltipPrimitive.Provider;

export function Tooltip({
  content,
  children,
  side = "top",
}: {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}) {
  return (
    <TooltipPrimitive.Root delayDuration={400}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={6}
          className="z-60 rounded-md border border-line-strong bg-menu px-2 py-1 text-xs text-fg shadow-[0_16px_32px_rgba(0,0,0,0.5)]"
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
