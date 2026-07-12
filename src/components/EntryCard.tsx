import type { Entry } from "../types";
import { formatJa } from "../lib/dates";

export function EntryCard({ entry, showDate = true }: { entry: Entry; showDate?: boolean }) {
  return (
    <div className="card" style={{ marginBottom: 12 }}>
      {showDate && (
        <div style={{ fontSize: 13, color: "var(--text-soft)", marginBottom: 8 }}>
          {formatJa(entry.date)}
        </div>
      )}
      {entry.achievements.length > 0 && (
        <ul style={{ margin: "0 0 8px", paddingLeft: 20 }}>
          {entry.achievements.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      )}
      {entry.learning && (
        <p style={{ margin: "0 0 8px", whiteSpace: "pre-wrap" }}>
          <span style={{ color: "var(--text-soft)", fontSize: 13 }}>学び: </span>
          {entry.learning}
        </p>
      )}
      {entry.tomorrowFocus && (
        <p style={{ margin: 0, fontSize: 14 }}>
          <span style={{ color: "var(--text-soft)", fontSize: 13 }}>翌日の宣言: </span>
          {entry.tomorrowFocus}
          {entry.focusDone === true && <span style={{ color: "var(--accent)", fontSize: 13 }}> 達成</span>}
        </p>
      )}
    </div>
  );
}
