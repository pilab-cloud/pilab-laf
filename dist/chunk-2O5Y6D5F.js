import { cn } from './chunk-3TRXGDSZ.js';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { jsx, jsxs } from 'react/jsx-runtime';

var buttonVariants = cva("btn", {
  variants: {
    variant: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      ghost: "btn-ghost",
      danger: "btn-danger"
    },
    size: { md: "", sm: "btn-sm" },
    fullWidth: { true: "", false: "auto" }
  },
  defaultVariants: { variant: "primary", size: "md", fullWidth: false }
});
function Button({
  className,
  variant,
  size,
  fullWidth,
  asChild,
  loading,
  leftIcon,
  rightIcon,
  disabled,
  children,
  type = "button",
  ...props
}) {
  const classes = cn(buttonVariants({ variant, size, fullWidth }), className);
  if (asChild) {
    return /* @__PURE__ */ jsx(Slot, { className: classes, ...props, children });
  }
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type,
      className: classes,
      disabled: disabled || loading,
      "aria-busy": loading || void 0,
      ...props,
      children: [
        loading ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin", "aria-hidden": true }) : leftIcon,
        children,
        rightIcon
      ]
    }
  );
}

export { Button, buttonVariants };
//# sourceMappingURL=chunk-2O5Y6D5F.js.map
//# sourceMappingURL=chunk-2O5Y6D5F.js.map