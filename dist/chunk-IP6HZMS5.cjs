'use strict';

var chunkFTHFEMX6_cjs = require('./chunk-FTHFEMX6.cjs');
var reactSlot = require('@radix-ui/react-slot');
var classVarianceAuthority = require('class-variance-authority');
var lucideReact = require('lucide-react');
var jsxRuntime = require('react/jsx-runtime');

var buttonVariants = classVarianceAuthority.cva("btn", {
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
  const classes = chunkFTHFEMX6_cjs.cn(buttonVariants({ variant, size, fullWidth }), className);
  if (asChild) {
    return /* @__PURE__ */ jsxRuntime.jsx(reactSlot.Slot, { className: classes, ...props, children });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "button",
    {
      type,
      className: classes,
      disabled: disabled || loading,
      "aria-busy": loading || void 0,
      ...props,
      children: [
        loading ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Loader2, { className: "animate-spin", "aria-hidden": true }) : leftIcon,
        children,
        rightIcon
      ]
    }
  );
}

exports.Button = Button;
exports.buttonVariants = buttonVariants;
//# sourceMappingURL=chunk-IP6HZMS5.cjs.map
//# sourceMappingURL=chunk-IP6HZMS5.cjs.map