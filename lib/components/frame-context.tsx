import * as React from "react";
import { useLafDefaults } from "../i18n";
import { uiEn } from "../messages/ui.en";

/** Catalogue keys of the app-frame family; every component takes `labels` to override single entries. */
export type AppFrameLabels = (typeof uiEn)["appFrame"];

const lafDefaults = { ui: uiEn };

export function useAppFrameLabels(labels?: Partial<AppFrameLabels>): AppFrameLabels {
  const ui = useLafDefaults(lafDefaults).t.components.ui.appFrame;
  return React.useMemo(() => ({ ...ui, ...labels }), [ui, labels]);
}

export const NARROW_QUERY = "(max-width: 859px)";

/** `matchMedia` as external store; `false` on the server and where `matchMedia` is missing. */
export function useMediaQuery(query: string): boolean {
  return React.useSyncExternalStore(
    (cb) => {
      if (typeof window === "undefined" || !window.matchMedia) return () => {};
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => (typeof window !== "undefined" && !!window.matchMedia ? window.matchMedia(query).matches : false),
    () => false,
  );
}

export function readStored(key?: string): string | null {
  if (!key || typeof localStorage === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStored(key: string | undefined, value: string) {
  if (!key || typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable (private mode, quota) */
  }
}

export interface AppFrameContextValue {
  /** True inside an `AppFrame`. */
  active: boolean;
  /** Viewport is below 860px: the sidebar is an overlay. */
  isMobile: boolean;
  /** Sidebar visible in the current mode (overlay open on mobile, expanded on desktop). */
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  /** Desktop sidebar is collapsed to the icon rail. */
  rail: boolean;
  sidebarId: string;
  mainId: string;
  /** Call after a navigation so the mobile overlay closes. */
  navigated: () => void;
}

const noop = () => {};

export const AppFrameContext = React.createContext<AppFrameContextValue>({
  active: false,
  isMobile: false,
  sidebarOpen: true,
  setSidebarOpen: noop,
  toggleSidebar: noop,
  rail: false,
  sidebarId: "",
  mainId: "",
  navigated: noop,
});

/** State of the surrounding `AppFrame` (sidebar, viewport mode). Safe to call outside one. */
export function useAppFrame(): AppFrameContextValue {
  return React.useContext(AppFrameContext);
}
