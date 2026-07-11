import { useState } from "react";
import { useStore } from "../store";
import { EntryForm } from "../components/EntryForm";
import { EntryCard } from "../components/EntryCard";
import { StatBar } from "../components/StatBar";
import { addDays, formatJa, todayISO } from "../lib/dates";
import { entryHasContent } from "../lib/streak";

export function Home() {
  const { entries, saveEntry, setFocusDone } = useStore();
  const today = todayISO();
  const yesterday = addDays(today, -1);
  const todayEntry = entries[today];
  const yFocus = entries[yesterday]?.tomorrowFocus?.trim();
  const yFocusDone = entries[yesterday]?.focusDone;

  const [editing, setEditing] = useState(false);
  const recorded = entryHasContent(todayEntry);
  const showForm = !recorded || editing;

  function markFocusDone() {
    setFocusDone(yesterday, true);
    // 今日の「できたこと」にも昇格させる
    const now = new Date().toISOString();
    const base = todayEntry ?? {
      date: today,
      achievements: [],
      learning: "",
      tomorrowFocus: "",
      createdAt: now,
      updatedAt: now,
    };
    if (!base.achievements.includes(yFocus!) && base.achievements.length < 3) {
      saveEntry({ ...base, achievements: [...base.achievements, yFocus!], updatedAt: now });
    }
  }

  return (
    <div className="fade-in">
      <h1 style={{ fontSize: 20 }}>{formatJa(today)}</h1>
      <StatBar />

      {yFocus && (
        <div className="card" style={{ marginTop: 20, background: "var(--accent-soft)", border: "none" }}>
          <div style={{ fontSize: 13, color: "var(--text-soft)", marginBottom: 4 }}>昨日の宣言</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <span>「{yFocus}」</span>
            {yFocusDone ? (
              <span style={{ color: "var(--accent)", whiteSpace: "nowrap" }}>✓ できた</span>
            ) : (
              <button style={{ padding: "6px 14px", whiteSpace: "nowrap", fontSize: 13 }} onClick={markFocusDone}>
                できた ✓
              </button>
            )}
          </div>
        </div>
      )}

      <div style={{ marginTop: 8 }}>
        {showForm ? (
          <EntryForm
            key={todayEntry?.updatedAt ?? "new"}
            date={today}
            initial={todayEntry}
            onSave={(e) => {
              saveEntry(e);
              setEditing(false);
            }}
          />
        ) : (
          <div style={{ marginTop: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ color: "var(--accent)", fontSize: 14 }}>今日は記録済みです ✓</span>
              <button className="ghost" style={{ padding: "6px 16px", fontSize: 13 }} onClick={() => setEditing(true)}>
                編集
              </button>
            </div>
            <EntryCard entry={todayEntry!} showDate={false} />
          </div>
        )}
      </div>
    </div>
  );
}
