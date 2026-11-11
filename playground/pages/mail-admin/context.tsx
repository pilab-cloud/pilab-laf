import * as React from "react";
import { Alert, Button, Skeleton, useToast } from "../../../lib";
import type { MailApi } from "./api";

export const num = (n: number) => n.toLocaleString("en-US");

export interface DrawerSpec {
  /** Changing the key remounts the drawer content (e.g. another mailbox). */
  key: string;
  title: string;
  icon?: React.ReactNode;
  size?: number;
  content: React.ReactNode;
}

export interface MailAdminContextValue {
  api: MailApi;
  path: string;
  navigate: (path: string) => void;
  openDrawer: (spec: DrawerSpec) => void;
  closeDrawer: () => void;
  /** Incremented after every mutation; tables refetch when it changes. */
  version: number;
  bump: () => void;
}

export const MailAdminContext = React.createContext<MailAdminContextValue | null>(null);

export function useMail(): MailAdminContextValue {
  const ctx = React.useContext(MailAdminContext);
  if (!ctx) throw new Error("useMail must be used inside <MailAdmin>");
  return ctx;
}

export interface AsyncState<T> {
  data: T | undefined;
  error: Error | undefined;
  loading: boolean;
  reload: () => void;
  setData: React.Dispatch<React.SetStateAction<T | undefined>>;
}

/** Loads `fn` on mount and whenever `deps` or the shared mutation `version` change; stale results are dropped. */
export function useAsync<T>(fn: (api: MailApi) => Promise<T>, deps: React.DependencyList = [], opts: { live?: boolean } = {}): AsyncState<T> {
  const { api, version } = useMail();
  const [data, setData] = React.useState<T>();
  const [error, setError] = React.useState<Error>();
  const [loading, setLoading] = React.useState(true);
  const [tick, setTick] = React.useState(0);
  const fnRef = React.useRef(fn);
  fnRef.current = fn;
  const dep = opts.live ? version : 0;
  React.useEffect(() => {
    let live = true;
    setLoading(true);
    fnRef.current(api).then(
      (d) => {
        if (!live) return;
        setData(d);
        setError(undefined);
        setLoading(false);
      },
      (e: Error) => {
        if (!live) return;
        setError(e);
        setLoading(false);
      },
    );
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, tick, dep, ...deps]);
  return { data, error, loading, reload: () => setTick((t) => t + 1), setData };
}

/** Runs a mutation: success toast, error toast, then bumps `version` so lists refetch. Resolves to the result or `undefined` on failure. */
export function useRun() {
  const { bump } = useMail();
  const { toast } = useToast();
  return React.useCallback(
    async <T,>(task: () => Promise<T>, success?: string): Promise<T | undefined> => {
      try {
        const out = await task();
        if (success) toast({ tone: "success", title: success });
        bump();
        return out;
      } catch (e) {
        toast({ tone: "error", title: "Request failed", description: (e as Error).message });
        return undefined;
      }
    },
    [bump, toast],
  );
}

/** Skeleton while loading, an alert with retry on failure, `children(data)` otherwise. */
export function Async<T>({ state, children, rows = 3 }: { state: AsyncState<T>; children: (data: T) => React.ReactNode; rows?: number }) {
  if (state.error && state.data === undefined)
    return (
      <Alert tone="danger" title="Could not load data" description={state.error.message} actions={<Button size="sm" variant="secondary" onClick={state.reload}>Retry</Button>} />
    );
  if (state.data === undefined)
    return (
      <div role="status" aria-label="Loading" className="grid gap-2">
        {Array.from({ length: rows }, (_, i) => (
          <Skeleton key={i} className="h-6 w-full" />
        ))}
      </div>
    );
  return <>{children(state.data)}</>;
}
