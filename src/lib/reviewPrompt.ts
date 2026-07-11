import type { Entry, Review } from "../types";

export function buildReviewPrompt(
  entries: Entry[],
  previousReview?: Review
): string {
  const logs = entries
    .map((e) => {
      const lines = [`## ${e.date}`];
      if (e.achievements.some((a) => a.trim()))
        lines.push(`できたこと: ${e.achievements.filter((a) => a.trim()).join(" / ")}`);
      if (e.learning.trim()) lines.push(`学んだこと: ${e.learning.trim()}`);
      if (e.tomorrowFocus.trim()) {
        const done = e.focusDone === true ? "（達成✓）" : e.focusDone === false ? "（未達成）" : "";
        lines.push(`翌日の宣言: ${e.tomorrowFocus.trim()}${done}`);
      }
      return lines.join("\n");
    })
    .join("\n\n");

  const prev = previousReview
    ? `\n# 前回のレビュー（${previousReview.periodTo}まで）\n${previousReview.content}\n`
    : "";

  return `あなたは私専属の成長コーチです。以下は私の日々の成長ログです。
他人との比較ではなく「過去の私」との比較で分析してください。
単なる要約ではなく、ログの積み重ねからしか見えない変化（努力の質の変化、テーマの移り変わり、インプット/アウトプットのバランスなど）を発見してください。
励ますだけでなく、具体的な行動につながる指摘をしてください。

以下の5つの見出しでMarkdown形式で出力してください。
## 最近伸びていること
## 努力の傾向
## 改善ポイント
## 過去との比較
## 来週へのアドバイス
${prev}
# 成長ログ
${logs}`;
}
