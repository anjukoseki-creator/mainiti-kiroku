import { useStore } from "../store";
import { getMascot, pickLine } from "../mascots";
import { calcStreak, entryHasContent } from "../lib/streak";
import { todayISO } from "../lib/dates";

export function MascotGreeting() {
  const { entries, settings } = useStore();
  const mascot = getMascot(settings.mascot);
  if (!mascot) return null;

  const today = todayISO();
  const recorded = entryHasContent(entries[today]);
  const line = pickLine(mascot, recorded, calcStreak(entries), today);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, margin: "26px 0 4px" }}>
      <mascot.Svg size={84} />
      {/* 吹き出し */}
      <div style={{ position: "relative", flex: 1 }}>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: "14px 16px",
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          {line}
        </div>
        <div
          style={{
            position: "absolute",
            left: -6,
            top: "50%",
            width: 10,
            height: 10,
            background: "var(--surface)",
            borderLeft: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            transform: "translateY(-50%) rotate(45deg)",
          }}
        />
      </div>
    </div>
  );
}
