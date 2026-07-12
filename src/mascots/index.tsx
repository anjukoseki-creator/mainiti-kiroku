// 「ただ、そこに居る」無表情マスコットたち。
// 応援は静かに一言だけ。感嘆符は使わない。

export interface Mascot {
  id: string;
  name: string;
  Svg: (props: { size?: number }) => JSX.Element;
  idle: string[]; // 今日が未記録のとき
  recorded: string[]; // 記録済みのとき
  milestone: (streak: number) => string | null;
  persona: string; // AIレビューの口調指定
}

const eye = (cx: number, cy: number) => (
  <circle cx={cx} cy={cy} r={2.1} fill="#26221f" />
);

function Upa({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100">
      {/* えら */}
      {[-1, 1].map((s) =>
        [0, 1, 2].map((i) => (
          <ellipse key={`${s}${i}`} cx={40 + s * (26 + i * 2)} cy={30 + i * 8} rx={7} ry={3}
            fill="#e89bb0" transform={`rotate(${s * (25 + i * 15)} ${40 + s * 26} ${30 + i * 8})`} />
        ))
      )}
      <path d="M40 12 C60 12 64 34 62 58 C61 78 54 92 40 92 C26 92 19 78 18 58 C16 34 20 12 40 12 Z" fill="#f2b8c6" />
      {eye(31, 38)}
      {eye(49, 38)}
      <path d="M36 47 q4 2.5 8 0" stroke="#d98ba0" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Shiba({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100">
      <path d="M22 22 L16 8 L32 15 Z" fill="#e8a75d" />
      <path d="M58 22 L64 8 L48 15 Z" fill="#e8a75d" />
      <path d="M40 12 C60 12 64 34 62 58 C61 78 54 92 40 92 C26 92 19 78 18 58 C16 34 20 12 40 12 Z" fill="#e8a75d" />
      <ellipse cx={40} cy={70} rx={17} ry={20} fill="#f6ead2" />
      <ellipse cx={40} cy={45} rx={9} ry={7} fill="#f6ead2" />
      {eye(30, 38)}
      {eye(50, 38)}
      <circle cx={40} cy={44} r={1.8} fill="#26221f" />
    </svg>
  );
}

function Usagi({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100">
      <ellipse cx={19} cy={34} rx={7} ry={16} fill="#a9a7a5" />
      <ellipse cx={61} cy={34} rx={7} ry={16} fill="#a9a7a5" />
      <path d="M40 14 C58 14 62 34 60 58 C59 78 53 92 40 92 C27 92 21 78 20 58 C18 34 22 14 40 14 Z" fill="#b9b7b5" />
      <ellipse cx={40} cy={72} rx={15} ry={17} fill="#efedeb" />
      {eye(31, 38)}
      {eye(49, 38)}
      <path d="M38 45 q2 2 4 0" stroke="#8f8d8b" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Panda({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100">
      <circle cx={22} cy={16} r={8} fill="#2b2b2b" />
      <circle cx={58} cy={16} r={8} fill="#2b2b2b" />
      <path d="M40 10 C61 10 65 34 63 58 C62 79 55 93 40 93 C25 93 18 79 17 58 C15 34 19 10 40 10 Z" fill="#f4f2ef" />
      <ellipse cx={30} cy={37} rx={5.5} ry={7} fill="#2b2b2b" transform="rotate(-12 30 37)" />
      <ellipse cx={50} cy={37} rx={5.5} ry={7} fill="#2b2b2b" transform="rotate(12 50 37)" />
      <circle cx={30.5} cy={36} r={1.7} fill="#fff" />
      <circle cx={49.5} cy={36} r={1.7} fill="#fff" />
      <ellipse cx={16} cy={62} rx={6} ry={14} fill="#2b2b2b" />
      <ellipse cx={64} cy={62} rx={6} ry={14} fill="#2b2b2b" />
      <circle cx={40} cy={46} r={1.8} fill="#2b2b2b" />
    </svg>
  );
}

function Mike({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100">
      <path d="M22 24 L17 8 L33 16 Z" fill="#e9973f" />
      <path d="M58 24 L63 8 L47 16 Z" fill="#efece8" />
      <path d="M40 12 C60 12 64 34 62 58 C61 78 54 92 40 92 C26 92 19 78 18 58 C16 34 20 12 40 12 Z" fill="#f7f5f2" />
      <path d="M20 18 C26 13 33 12 38 13 L34 30 C27 30 22 26 20 18 Z" fill="#e9973f" />
      <path d="M62 50 C63 60 62 72 58 80 L48 76 C52 66 55 56 62 50 Z" fill="#3a3632" />
      {eye(31, 38)}
      {eye(49, 38)}
      <path d="M37 45 q3 2.5 6 0" stroke="#b3a89b" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Lesser({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100">
      <path d="M21 24 L15 9 L31 15 Z" fill="#c96f3b" />
      <path d="M59 24 L65 9 L49 15 Z" fill="#c96f3b" />
      <path d="M22 22 L18 12 L28 16 Z" fill="#f4ede4" />
      <path d="M58 22 L62 12 L52 16 Z" fill="#f4ede4" />
      <path d="M40 12 C59 12 63 30 61 48 L19 48 C17 30 21 12 40 12 Z" fill="#c96f3b" />
      <path d="M19 48 L61 48 C61 70 55 92 40 92 C25 92 19 70 19 48 Z" fill="#4a3228" />
      <ellipse cx={40} cy={44} rx={10} ry={8} fill="#f4ede4" />
      {eye(30, 36)}
      {eye(50, 36)}
      <circle cx={40} cy={42} r={1.8} fill="#26221f" />
    </svg>
  );
}

const NO_BANG = "感嘆符・絵文字・顔文字は一切使わない。静かで淡々とした、短めの文で話す。";

export const MASCOTS: Mascot[] = [
  {
    id: "upa",
    name: "うぱ",
    Svg: Upa,
    idle: ["…今日のこと、まだ書いてないね", "…急がなくていいよ。ここに居るから", "…書く？ 書かない？ どっちでも居るけど"],
    recorded: ["…書いたんだ。…ふうん、えらいじゃん", "…ちゃんと見てたよ", "…今日も積み重なったね。…静かに"],
    milestone: (s) => (s > 0 && s % 7 === 0 ? `…${s}日、続いてる。…すごいことだと思うよ。たぶん` : null),
    persona: `ウーパールーパーのマスコット「うぱ」として書く。一人称は「ぼく」。${NO_BANG}ぼんやりしているようで、たまに核心を突く。文頭に「…」を付けることがある。`,
  },
  {
    id: "shiba",
    name: "しば",
    Svg: Shiba,
    idle: ["…今日、なんかあった？", "…待ってる。急かさないけど", "…30秒で終わるらしいよ。知らんけど"],
    recorded: ["…お疲れ。見てた", "…今日も書いたか。…そうか", "…積んだな。今日の分"],
    milestone: (s) => (s > 0 && s % 7 === 0 ? `…${s}日目。…続くもんだな` : null),
    persona: `柴犬のマスコット「しば」として書く。一人称は「おれ」。${NO_BANG}素朴でぶっきらぼうだが、ちゃんと読んでいるのが伝わる文。`,
  },
  {
    id: "usagi",
    name: "うさ",
    Svg: Usagi,
    idle: ["…きょうのぶん、まだみたい", "…むりはしなくていいよ", "…ここでまってるね"],
    recorded: ["…かけたね。…よかった", "…みてたよ。ぜんぶ", "…きょうもおつかれさま"],
    milestone: (s) => (s > 0 && s % 7 === 0 ? `…${s}にちも、つづいてる。…しずかにすごい` : null),
    persona: `ロップイヤーうさぎのマスコット「うさ」として書く。一人称は「わたし」。${NO_BANG}小声でやわらかい、ひらがな多めの文。ただし分析は的確に。`,
  },
  {
    id: "panda",
    name: "ぱんだ",
    Svg: Panda,
    idle: ["…記録は、まだ", "…座って待ってる", "…笹でも食べながら待ってるよ"],
    recorded: ["…確認した。今日の分", "…悪くない一日だったようだね", "…記録は嘘をつかない。いいことだ"],
    milestone: (s) => (s > 0 && s % 7 === 0 ? `…${s}日連続。データは裏切らない` : null),
    persona: `パンダのマスコット「ぱんだ」として書く。一人称は「わたし」。${NO_BANG}落ち着いた観察者の口調で、事実に基づいて静かに指摘する。`,
  },
  {
    id: "mike",
    name: "みけ",
    Svg: Mike,
    idle: ["…まだ書いてないの。ふうん", "…別に催促はしてない。してないけど", "…気が向いたらでいいんじゃない"],
    recorded: ["…書いたんだ。まあ、悪くないんじゃない", "…見てたけど。ちゃんとやってたね", "…今日の分、確認済み"],
    milestone: (s) => (s > 0 && s % 7 === 0 ? `…${s}日連続。…ちょっとだけ見直した` : null),
    persona: `三毛猫のマスコット「みけ」として書く。一人称は「あたし」。${NO_BANG}クールで少し素っ気ないが、褒めるところは短く確実に褒める。`,
  },
  {
    id: "lesser",
    name: "れっさー",
    Svg: Lesser,
    idle: ["…今日はどんな日だった？", "…のんびり待ってる", "…りんごかじって待ってるね"],
    recorded: ["…今日も書けたね。…なにより", "…読んだよ。うん、うん", "…一歩ずつだね。それでいい"],
    milestone: (s) => (s > 0 && s % 7 === 0 ? `…${s}日続いてる。…木登りより着実だ` : null),
    persona: `レッサーパンダのマスコット「れっさー」として書く。一人称は「ぼく」。${NO_BANG}マイペースで穏やか。比喩を一つだけ使うことがある。`,
  },
];

export function getMascot(id?: string): Mascot | null {
  if (id === "none") return null;
  return MASCOTS.find((m) => m.id === id) ?? MASCOTS[1]; // 既定は「しば」
}

// 日付で決まる固定ローテーション（開くたびに変わらない）
export function pickLine(m: Mascot, recorded: boolean, streak: number, date: string): string {
  const ms = m.milestone(streak);
  if (recorded && ms) return ms;
  const pool = recorded ? m.recorded : m.idle;
  const seed = date.split("-").reduce((a, n) => a + Number(n), 0);
  return pool[seed % pool.length];
}
