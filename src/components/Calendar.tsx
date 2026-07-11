import { useState } from "react";
import type { EntryMap, ISODate } from "../types";
import { toISO, todayISO } from "../lib/dates";
import { entryHasContent } from "../lib/streak";

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

export function Calendar({
  entries,
  onSelect,
}: {
  entries: EntryMap;
  onSelect: (date: ISODate) => void;
}) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth()); // 0-11

  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = todayISO();

  const cells: (ISODate | null)[] = [
    ...Array<null>(first.getDay()).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => toISO(new Date(year, month, i + 1))),
  ];

  function move(delta: number) {
    const d = new Date(year, month + delta, 1);
    setYear(d.getFullYear());
    setMonth(d.getMonth());
  }

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <button className="ghost" style={{ padding: "4px 14px" }} onClick={() => move(-1)}>←</button>
        <strong>{year}年 {month + 1}月</strong>
        <button className="ghost" style={{ padding: "4px 14px" }} onClick={() => move(1)}>→</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, textAlign: "center" }}>
        {WEEKDAYS.map((w) => (
          <div key={w} style={{ fontSize: 12, color: "var(--text-soft)" }}>{w}</div>
        ))}
        {cells.map((date, i) => {
          if (!date) return <div key={`e${i}`} />;
          const recorded = entryHasContent(entries[date]);
          const isToday = date === today;
          return (
            <button
              key={date}
              onClick={() => recorded && onSelect(date)}
              style={{
                background: recorded ? "var(--accent-soft)" : "transparent",
                color: recorded ? "var(--accent)" : "var(--text)",
                border: isToday ? "1.5px solid var(--accent)" : "1.5px solid transparent",
                borderRadius: 10,
                padding: "8px 0",
                fontSize: 14,
                cursor: recorded ? "pointer" : "default",
              }}
            >
              {Number(date.slice(8))}
            </button>
          );
        })}
      </div>
    </div>
  );
}
