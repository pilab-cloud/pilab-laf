import * as React from "react";
import { useLaf } from "../i18n";
import { consoleEn } from "../messages/console.en";

type Msgs = typeof consoleEn;

/** English defaults overlaid with `t.components.console` (when the locale provides it), merged per label set. */
export function useConsoleMessages(): Msgs {
  const over = (useLaf().t.components as { console?: { [K in keyof Msgs]?: Partial<Msgs[K]> } }).console;
  return React.useMemo(() => ({ terminal: { ...consoleEn.terminal, ...over?.terminal }, vnc: { ...consoleEn.vnc, ...over?.vnc } }), [over]);
}
