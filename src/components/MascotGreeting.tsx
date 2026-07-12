import { useStore } from "../store";
import { getMascot, pickLine } from "../mascots";
import { calcStreak } from "../lib/streak";
import { todayISO } from "../lib/dates";
import { entryHasContent } from "../lib/streak";

export function MascotGreeting() {
  const { entries, settings } = useStore();
  const mascot = getMascot(settings.mascot);
  if (!mascot) return null;

  const today = todayISO();
  const recorded = entryHasContent(entries[today]);
  const line = pickLine(mascot, recorded, calcStreak(entries), today);

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 14, marginTop: 20 }}>
      <mascot.Svg size={52} />
      <p style={{ margin: "0 0 6px", fontSize: 13.5, color: "var(--text-soft)", lineHeight: 1.6 }}>
        {line}
      </p>
    </div>
  );
}
