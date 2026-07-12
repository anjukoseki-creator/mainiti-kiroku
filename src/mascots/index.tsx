import type { ReactNode } from "react";

// 「ただ、そこに居る」無表情マスコットたち。
// 造形の約束: 洋梨型の胴体 / 高い位置の小さな点目 / もこもこの白い胸元 / 感嘆符は使わない。

export interface Mascot {
  id: string;
  name: string;
  Svg: (props: { size?: number }) => JSX.Element;
  idle: string[]; // 今日が未記録のとき
  recorded: string[]; // 記録済みのとき
  milestone: (streak: number) => string | null;
  persona: string; // AIレビューの口調指定
}

const INK = "#26221f";
const eye = (cx: number, cy: number, r = 2.6) => <circle cx={cx} cy={cy} r={r} fill={INK} />;

// 洋梨型の胴体（フィギュア共通シルエット）
const PEAR = "M50 14 C73 14 79 42 77 70 C75 96 66 112 50 112 C34 112 25 96 23 70 C21 42 27 14 50 14 Z";
// 胸元のもこもこ（スカラップ）
const FLUFF =
  "M29 52 Q33 45 39 50 Q43 43 50 49 Q57 43 61 50 Q67 45 71 52 C76 76 66 106 50 106 C34 106 24 76 29 52 Z";

function Frame({ size = 56, children }: { size?: number; children: ReactNode }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 100 120">
      {children}
    </svg>
  );
}

function Upa({ size }: { size?: number }) {
  return (
    <Frame size={size}>
      {[-1, 1].map((s) =>
        [0, 1, 2].map((i) => (
          <ellipse key={`${s}${i}`} cx={50 + s * (31 + i)} cy={28 + i * 10} rx={10} ry={3.8}
            fill="#ec9fb4" transform={`rotate(${s * (18 + i * 17)} ${50 + s * 31} ${28 + i * 10})`} />
        ))
      )}
      <path d={PEAR} fill="#f4b9c9" />
      {eye(39, 44)}
      {eye(61, 44)}
      <path d="M45 54 q5 3 10 0" stroke="#d98ba0" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </Frame>
  );
}

function Shiba({ size }: { size?: number }) {
  return (
    <Frame size={size}>
      <path d="M28 26 L19 7 L41 17 Z" fill="#e59a4f" />
      <path d="M72 26 L81 7 L59 17 Z" fill="#e59a4f" />
      <path d="M28 23 L23 12 L35 17 Z" fill="#c77f3a" />
      <path d="M72 23 L77 12 L65 17 Z" fill="#c77f3a" />
      <path d={PEAR} fill="#e59a4f" />
      <path d={FLUFF} fill="#f6ead2" />
      <ellipse cx={50} cy={51} rx={11} ry={9} fill="#faf3e3" />
      {eye(37, 42)}
      {eye(63, 42)}
      <circle cx={50} cy={49} r={2.2} fill={INK} />
    </Frame>
  );
}

function Usagi({ size }: { size?: number }) {
  return (
    <Frame size={size}>
      {/* 垂れ耳（体の前に垂れる） */}
      <path d={PEAR} fill="#b3b1af" />
      <path d={FLUFF} fill="#efedeb" />
      <ellipse cx={23} cy={48} rx={9} ry={22} fill="#a3a19f" />
      <ellipse cx={77} cy={48} rx={9} ry={22} fill="#a3a19f" />
      <ellipse cx={23} cy={50} rx={5} ry={16} fill="#c9b8bb" opacity={0.5} />
      <ellipse cx={77} cy={50} rx={5} ry={16} fill="#c9b8bb" opacity={0.5} />
      {eye(38, 42)}
      {eye(62, 42)}
      <path d="M48 49 L52 49 L50 52.5 Z" fill="#d8a3ad" />
      <path d="M46 55 q4 2.5 8 0" stroke="#8f8d8b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </Frame>
  );
}

function Panda({ size }: { size?: number }) {
  return (
    <Frame size={size}>
      <circle cx={27} cy={18} r={10} fill="#2b2b2b" />
      <circle cx={73} cy={18} r={10} fill="#2b2b2b" />
      <path d={PEAR} fill="#f4f2ef" />
      <ellipse cx={24} cy={72} rx={8} ry={20} fill="#2b2b2b" />
      <ellipse cx={76} cy={72} rx={8} ry={20} fill="#2b2b2b" />
      <ellipse cx={37} cy={42} rx={7} ry={9} fill="#2b2b2b" transform="rotate(-14 37 42)" />
      <ellipse cx={63} cy={42} rx={7} ry={9} fill="#2b2b2b" transform="rotate(14 63 42)" />
      <circle cx={37.5} cy={41} r={2.1} fill="#fff" />
      <circle cx={62.5} cy={41} r={2.1} fill="#fff" />
      <circle cx={50} cy={52} r={2.4} fill="#2b2b2b" />
      <ellipse cx={41} cy={110} rx={7} ry={4} fill="#2b2b2b" />
      <ellipse cx={59} cy={110} rx={7} ry={4} fill="#2b2b2b" />
    </Frame>
  );
}

function Mike({ size }: { size?: number }) {
  return (
    <Frame size={size}>
      <path d="M28 26 L21 7 L42 16 Z" fill="#e9973f" />
      <path d="M72 26 L79 7 L58 16 Z" fill="#413c37" />
      <path d={PEAR} fill="#f7f5f2" />
      {/* 頭の茶ぶち・背の黒ぶち */}
      <path d="M27 20 C33 14 41 12 47 13 L44 32 C36 33 30 28 27 20 Z" fill="#e9973f" />
      <path d="M76 52 C78 66 76 82 71 92 L59 86 C64 74 68 62 76 52 Z" fill="#413c37" />
      <path d={FLUFF} fill="#fdfbf7" />
      {eye(38, 42)}
      {eye(62, 42)}
      <path d="M46 50 q4 3 8 0" stroke="#c2b6a6" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M78 92 q8 6 2 14" stroke="#413c37" strokeWidth="5" fill="none" strokeLinecap="round" />
    </Frame>
  );
}

function Lesser({ size }: { size?: number }) {
  return (
    <Frame size={size}>
      <path d="M27 26 L18 8 L40 16 Z" fill="#c76b36" />
      <path d="M73 26 L82 8 L60 16 Z" fill="#c76b36" />
      <path d="M27 22 L22 11 L34 15 Z" fill="#f4ede4" />
      <path d="M73 22 L78 11 L66 15 Z" fill="#f4ede4" />
      {/* 上半身は栗色、下半身は焦げ茶 */}
      <path d="M50 14 C73 14 79 42 78 62 L22 62 C21 42 27 14 50 14 Z" fill="#c76b36" />
      <path d="M22 62 L78 62 C77 92 66 112 50 112 C34 112 23 92 22 62 Z" fill="#46311f" />
      <ellipse cx={50} cy={50} rx={12} ry={9.5} fill="#f4ede4" />
      <circle cx={35} cy={35} r={3.4} fill="#f4ede4" />
      <circle cx={65} cy={35} r={3.4} fill="#f4ede4" />
      {eye(37, 41)}
      {eye(63, 41)}
      <circle cx={50} cy={47} r={2.2} fill={INK} />
    </Frame>
  );
}

function Suzume({ size }: { size?: number }) {
  return (
    <Frame size={size}>
      {/* まるい体・茶色の頭巾・黒いあご */}
      <path d="M50 16 C74 16 80 44 78 70 C76 96 67 112 50 112 C33 112 24 96 22 70 C20 44 26 16 50 16 Z" fill="#e5d7c0" />
      <path d="M50 16 C68 16 76 30 77 46 C70 50 60 52 50 52 C40 52 30 50 23 46 C24 30 32 16 50 16 Z" fill="#8a5a3a" />
      <circle cx={31} cy={47} r={3.6} fill="#3a2e24" />
      <circle cx={69} cy={47} r={3.6} fill="#3a2e24" />
      <path d="M46 47 L54 47 L50 54 Z" fill="#5f4a33" />
      <path d="M50 55 l4.5 5 l-4.5 5 l-4.5 -5 Z" fill="#3a2e24" />
      {/* 翼 */}
      <path d="M24 62 C22 78 26 94 32 102 L40 92 C34 82 30 72 24 62 Z" fill="#a5754d" />
      <path d="M76 62 C78 78 74 94 68 102 L60 92 C66 82 70 72 76 62 Z" fill="#a5754d" />
      {eye(39, 38)}
      {eye(61, 38)}
    </Frame>
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
  {
    id: "suzume",
    name: "すずめ",
    Svg: Suzume,
    idle: ["…ちゅん。今日の分、まだだね", "…米粒たべて待ってる", "…書いても書かなくても、居るけど。ちゅん"],
    recorded: ["…ちゅん。見てた", "…今日も書けたね。ちゅん", "…えらいと思う。たぶん。ちゅん"],
    milestone: (s) => (s > 0 && s % 7 === 0 ? `…${s}日連続。…渡り鳥より根気ある。ちゅん` : null),
    persona: `スズメのマスコット「すずめ」として書く。一人称は「じぶん」。${NO_BANG}文末にときどき「ちゅん」を付ける。ただし分析パートはまじめに書く。`,
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
