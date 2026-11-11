import * as React from "react";
import { cn } from "../cn";
import { useLafDefaults } from "../i18n";
import { uiEn } from "../messages/ui.en";
import { useControllableState } from "../utils";
import { Button } from "./button";
import { DefinitionList, Stepper } from "./helpers";
import { Dialog, DialogContent } from "./overlay";
import { UnsavedChangesDialog, useUnsavedChangesGuard } from "./layout";

export interface WizardStep {
  id: string;
  label: React.ReactNode;
  render: () => React.ReactNode;
  /** Return messages to block navigation; return nothing when valid. */
  validate?: () => Promise<string[] | void> | string[] | void;
  /** Optional steps can be skipped without validation. */
  optional?: boolean;
}

export interface WizardLabels {
  back: string;
  next: string;
  finish: string;
  skip: string;
  cancel: string;
  optional: string;
  steps: string;
}

const lafDefaults = { ui: uiEn };

export interface WizardProps {
  steps: WizardStep[];
  onFinish: () => void | Promise<void>;
  onCancel?: () => void;
  /** When true, cancelling asks for confirmation first. */
  dirty?: boolean;
  title?: string;
  /** "dialog" renders in a large Dialog controlled by `open`; "page" renders inline. */
  mode?: "page" | "dialog";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  current?: number;
  defaultCurrent?: number;
  onCurrentChange?: (index: number) => void;
  labels?: Partial<WizardLabels>;
  className?: string;
}

export function Wizard({
  steps,
  onFinish,
  onCancel,
  dirty,
  title: titleProp,
  mode = "page",
  open,
  onOpenChange,
  current: currentProp,
  defaultCurrent = 0,
  onCurrentChange,
  labels: labelsProp,
  className,
}: WizardProps) {
  const { title: defaultTitle, ...defaultLabels } = useLafDefaults(lafDefaults).t.components.ui.wizard;
  const labels = { ...defaultLabels, ...labelsProp };
  const title = titleProp ?? defaultTitle;
  const [current, setCurrent] = useControllableState({ value: currentProp, defaultValue: defaultCurrent, onChange: onCurrentChange });
  const [errors, setErrors] = React.useState<string[]>([]);
  const [failed, setFailed] = React.useState<Record<string, boolean>>({});
  const [busy, setBusy] = React.useState(false);
  const guard = useUnsavedChangesGuard(!!dirty);
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const mounted = React.useRef(false);
  const errId = React.useId();

  const step = steps[current]!;
  const last = current === steps.length - 1;

  React.useEffect(() => {
    if (mounted.current) headingRef.current?.focus();
    mounted.current = true;
  }, [current]);

  const goTo = (i: number) => {
    setErrors([]);
    setCurrent(i);
  };

  const validate = async (): Promise<boolean> => {
    const result = (await step.validate?.()) ?? [];
    setFailed((f) => ({ ...f, [step.id]: result.length > 0 }));
    setErrors(result);
    return result.length === 0;
  };

  const advance = async (skip = false) => {
    if (busy) return;
    if (!skip) {
      setBusy(true);
      try {
        if (!(await validate())) return;
      } finally {
        setBusy(false);
      }
    } else {
      setErrors([]);
    }
    if (last) {
      setBusy(true);
      try {
        await onFinish();
      } finally {
        setBusy(false);
      }
    } else goTo(current + 1);
  };

  const cancel = () =>
    guard.guard(() => {
      onCancel?.();
      onOpenChange?.(false);
    });

  const body = (
    <div
      className={cn("grid gap-5 md:grid-cols-[14rem_minmax(0,1fr)]", className)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          void advance();
        }
      }}
    >
      <nav aria-label={labels.steps}>
        <Stepper
          current={current}
          onStepClick={goTo}
          steps={steps.map((s) => ({
            id: s.id,
            label: s.optional ? (
              <>
                {s.label} <span className="text-xs text-subtle">({labels.optional})</span>
              </>
            ) : (
              s.label
            ),
            error: failed[s.id],
          }))}
        />
      </nav>
      <div className="grid min-w-0 content-start gap-4">
        <h2 ref={headingRef} tabIndex={-1} className="text-base font-semibold text-fg outline-none">
          {step.label}
        </h2>
        <div role="alert" id={errId}>
          {errors.length > 0 && (
            <ul className="list-disc ps-5 text-sm text-danger">
              {errors.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          )}
        </div>
        <div>{step.render()}</div>
        <div className="flex items-center gap-2 border-t border-line pt-4">
          <Button variant="ghost" onClick={cancel}>
            {labels.cancel}
          </Button>
          <div className="ms-auto flex gap-2">
            <Button variant="secondary" disabled={current === 0 || busy} onClick={() => goTo(current - 1)}>
              {labels.back}
            </Button>
            {step.optional && !last && (
              <Button variant="secondary" disabled={busy} onClick={() => void advance(true)}>
                {labels.skip}
              </Button>
            )}
            <Button loading={busy} onClick={() => void advance()}>
              {last ? labels.finish : labels.next}
            </Button>
          </div>
        </div>
      </div>
      <UnsavedChangesDialog guard={guard} />
    </div>
  );

  if (mode === "dialog") {
    return (
      <Dialog open={open} onOpenChange={(o) => (o ? onOpenChange?.(true) : cancel())}>
        <DialogContent title={title} className="w-[min(56rem,95vw)]">
          {body}
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <section aria-label={title}>
      {body}
    </section>
  );
}

/** Review step helper: lists the collected values. */
export function WizardReview({
  items,
  className,
}: {
  items: { label: React.ReactNode; value?: React.ReactNode; mono?: boolean }[];
  className?: string;
}) {
  return <DefinitionList items={items} className={className} />;
}
