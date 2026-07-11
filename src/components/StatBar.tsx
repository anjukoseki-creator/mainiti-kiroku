import { useStore } from "../store";
import { calcStreak, recentCount } from "../lib/streak";
import { todayISO } from "../lib/dates";

export function StatBar() {
  const { entries, reviews } = useStore();
  const streak = calcStreak(entries);
  const recent = recentCount(entries, 30);

  let reviewNote = "AIレビューはまだありません";
  if (reviews.length > 0) {
    const last = reviews[0].createdAt.slice(0, 10);
    const days = Math.floor(
      (new Date(todayISO()).getTime() - new Date(last).getTime()) / 86400000
    );
    reviewNote = days === 0 ? "今日レビュー済み" : `前回AIレビューから ${days}日`;
  }

  return (
    <div style={{ color: "var(--text-soft)", fontSize: 13, marginTop: 6 }}>
      🔥 継続 {streak}日 ・ 直近30日で {recent}日記録
      <br />
      {reviewNote}
    </div>
  );
}
