import { useMemo, useState } from "react";
import { useStore } from "../store";
import { EntryCard } from "../components/EntryCard";
import { entryHasContent } from "../lib/streak";

export function LogsPage() {
  const { entries } = useStore();
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const all = Object.values(entries)
      .filter(entryHasContent)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter((e) =>
      [e.date, ...e.achievements, e.learning, e.tomorrowFocus]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [entries, query]);

  return (
    <div className="fade-in">
      <h1 style={{ fontSize: 20, marginBottom: 16 }}>過去ログ</h1>
      <input
        type="text"
        placeholder="検索（例: Python）"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      {list.length === 0 ? (
        <p style={{ color: "var(--text-soft)" }}>
          {query ? "見つかりませんでした" : "まだ記録がありません"}
        </p>
      ) : (
        list.map((e) => <EntryCard key={e.date} entry={e} />)
      )}
    </div>
  );
}
