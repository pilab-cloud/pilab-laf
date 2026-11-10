import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { Avatar } from "./display";
import { useLaf } from "../i18n";

export function Toolbar({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("toolbar", className)} {...props} />;
}

export function Table({ className, children, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="table-wrap">
      <table className={cn("table", className)} {...props}>
        {children}
      </table>
    </div>
  );
}

export function UserCell({ name, email }: { name: string; email?: string }) {
  return (
    <div className="cell-user">
      <Avatar name={name} />
      <div>
        <div>{name}</div>
        {email && <div className="cell-sub">{email}</div>}
      </div>
    </div>
  );
}

export interface PaginationProps {
  page: number;
  pageCount: number;
  total?: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
}

function pageWindow(page: number, count: number): (number | "…")[] {
  const set = new Set([1, count, page - 1, page, page + 1].filter((p) => p >= 1 && p <= count));
  const sorted = [...set].sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1]! > 1) out.push("…");
    out.push(p);
  });
  return out;
}

export function Pagination({ page, pageCount, total, pageSize, onPageChange }: PaginationProps) {
  const { t } = useLaf();
  const from = total && pageSize ? (page - 1) * pageSize + 1 : undefined;
  const to = total && pageSize ? Math.min(page * pageSize, total) : undefined;
  return (
    <nav className="pagination" aria-label={t.pagination}>
      <span>{from !== undefined ? t.showing(from, to!, total!) : t.pageOf(page, pageCount)}</span>
      <div className="pages">
        <button className="page-btn" aria-label={t.previousPage} disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          <ChevronLeft className="size-4" aria-hidden />
        </button>
        {pageWindow(page, pageCount).map((p, i) =>
          p === "…" ? (
            <span key={`gap${i}`} className="page-btn border-transparent bg-transparent">
              …
            </span>
          ) : (
            <button
              key={p}
              className="page-btn"
              aria-current={p === page ? "page" : undefined}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          ),
        )}
        <button className="page-btn" aria-label={t.nextPage} disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>
          <ChevronRight className="size-4" aria-hidden />
        </button>
      </div>
    </nav>
  );
}

export function AdminShell({
  sidebar,
  topbar,
  children,
}: {
  sidebar: React.ReactNode;
  topbar?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="admin">
      <aside className="admin-side">{sidebar}</aside>
      <div className="admin-main">
        {topbar && <header className="admin-top">{topbar}</header>}
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}

export function NavGroup({ label }: { label: string }) {
  return <div className="nav-group">{label}</div>;
}

export function NavLink({
  icon,
  current,
  badge,
  className,
  children,
  ...props
}: React.ComponentProps<"a"> & { icon?: React.ReactNode; current?: boolean; badge?: React.ReactNode }) {
  return (
    <a className={cn("nav-link", className)} aria-current={current ? "page" : undefined} {...props}>
      {icon}
      {children}
      {badge}
    </a>
  );
}
