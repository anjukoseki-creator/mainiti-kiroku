import type { EntryMap, Entry, ISODate } from "../types";
import { addDays, todayISO } from "./dates";

function hasContent(e?: Entry): boolean {
  if (!e) return false;
  return (
    e.achievements.some((a) => a.trim() !== "") ||
    e.learning.trim() !== "" ||
    e.tomorrowFocus.trim() !== ""
  );
}

// 連続日数。今日が未記録でも昨日まで続いていれば継続扱い（猶予付き）。
export function calcStreak(entries: EntryMap, today: ISODate = todayISO()): number {
  let cursor = hasContent(entries[today]) ? today : addDays(today, -1);
  let streak = 0;
  while (hasContent(entries[cursor])) {
    streak++;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

// 直近N日間の記録日数
export function recentCount(
  entries: EntryMap,
  days = 30,
  today: ISODate = todayISO()
): number {
  let count = 0;
  for (let i = 0; i < days; i++) {
    if (hasContent(entries[addDays(today, -i)])) count++;
  }
  return count;
}

export const entryHasContent = hasContent;
