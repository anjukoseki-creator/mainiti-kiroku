import type { Page } from "../App";

const TABS: { id: Page; label: string }[] = [
  { id: "home", label: "今日" },
  { id: "calendar", label: "カレンダー" },
  { id: "logs", label: "記録" },
  { id: "review", label: "レビュー" },
  { id: "settings", label: "設定" },
];

export function Nav({ page, onChange }: { page: Page; onChange: (p: Page) => void }) {
  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        display: "flex",
        justifyContent: "center",
        gap: 2,
        padding: "10px 8px calc(10px + env(safe-area-inset-bottom))",
        zIndex: 10,
      }}
    >
      {TABS.map((t) => {
        const active = page === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            style={{
              background: "transparent",
              color: active ? "var(--accent)" : "var(--text-soft)",
              padding: "6px 14px",
              fontSize: 13,
              fontWeight: active ? 600 : 400,
              letterSpacing: "0.04em",
              borderBottom: active ? "2px solid var(--accent)" : "2px solid transparent",
              borderRadius: 0,
            }}
          >
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}
