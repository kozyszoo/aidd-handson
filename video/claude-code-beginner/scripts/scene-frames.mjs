// 各シーンの開始・中間・終了フレームを出す。シーンの並びは引数（Series の順）。
//   node scripts/scene-frames.mjs step0 title intro card1 ...
//   node scripts/scene-frames.mjs --pairs step0 title intro card1 ...   # stills.mjs 用の "name:frame" 列
// "card" で始まるキーは無音の章扉（60フレーム）。
import { readFileSync } from "node:fs";

const args = process.argv.slice(2);
const pairs = args.includes("--pairs");
const [video, ...order] = args.filter((a) => a !== "--pairs");
if (!video || order.length === 0) {
  console.error("usage: node scripts/scene-frames.mjs [--pairs] <stepN> <sceneKey> ...");
  process.exit(1);
}
const data = JSON.parse(readFileSync(new URL(`../src/data/${video}.json`, import.meta.url), "utf8"));
const HEAD = 0.5, TAIL = 0.9, CARD = 60, FPS = 30, DRAFT = 20;
const A = (k) => Math.ceil((HEAD + (data[k]?.sec ?? DRAFT) + TAIL) * FPS);
let t = 0;
const out = [];
for (const k of order) {
  const isCard = k.startsWith("card");
  const d = isCard ? CARD : A(k);
  const mid = t + (isCard ? Math.round(d * 0.66) : Math.min(120, d - 10));
  const end = t + d - 12;
  out.push(`${k}:${mid}`);
  if (!isCard && d > 300) out.push(`${k}_end:${end}`);
  if (!pairs) console.log(`${k}\t${t}\t${mid}\t${t + d - 1}`);
  t += d;
}
if (pairs) console.log(out.join(" "));
else console.log(`TOTAL\t${t}`);
