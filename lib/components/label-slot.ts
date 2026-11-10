import type * as React from "react";

/** Palette slot 1–12 (design F4); colours come from the --label-N tokens, never free hex. */
export type LabelSlot = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const LABEL_SLOTS: readonly LabelSlot[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export function labelSlotStyle(slot: LabelSlot): React.CSSProperties {
  return { backgroundColor: `var(--label-${slot}-bg)`, color: `var(--label-${slot}-fg)`, borderColor: `var(--label-${slot})` };
}
