import type { Page } from "../App";

const TABS: { id: Page; label: string; icon: string }[] = [
  { id: "home", label: "ホーム", icon: "✏️" },
  { id: "calendar", label: "カレンダー", icon: "📅" },
  { id: "logs", label: "ログ", icon: "📚" },
  { id: "review", label: "レビュー", icon: "🌱" },
  { id: "settings", label: "設定", icon: "⚙️" },
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
        gap: 4,
        padding: "6px 8px calc(6px + env(safe-area-inset-bottom))",
        zIndex: 10,
      }}
    >
      {TABS.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            background: "transparent",
            color: page === t.id ? "var(--accent)" : "var(--text-soft)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
            padding: "6px 12px",
            fontSize: 11,
            fontWeight: page === t.id ? 600 : 400,
          }}
        >
          <span style={{ fontSize: 18 }}>{t.icon}</span>
          {t.label}
        </button>
      ))}
    </nav>
  );
}
