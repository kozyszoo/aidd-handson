// 1回だけ bundle して、複数フレームの静止画をまとめて書き出す。
// `npx remotion still` を回数分呼ぶより速い（bundle が1回で済む）。
//
//   node scripts/stills.mjs OnboardingVideo scope:1300 why:2300 ...
//   node scripts/stills.mjs OnboardingVideo --all   # scene-frames.mjs の中間フレームを全部
//
// 出力: out/stills/<name>.png
import path from "node:path";
import fs from "node:fs";
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";

const [compId, ...rest] = process.argv.slice(2);
if (!compId) {
  console.error("usage: node scripts/stills.mjs <compositionId> name:frame ...");
  process.exit(1);
}
const pairs = rest.map((p) => {
  const [name, frame] = p.split(":");
  return { name, frame: Number(frame) };
});
const outDir = path.resolve("out/stills");
fs.mkdirSync(outDir, { recursive: true });

const serveUrl = await bundle({
  entryPoint: path.resolve("src/index.ts"),
  webpackOverride: (c) => c,
});
const composition = await selectComposition({ serveUrl, id: compId });
for (const { name, frame } of pairs) {
  const output = path.join(outDir, `${name}.png`);
  await renderStill({ composition, serveUrl, output, frame, logLevel: "error" });
  console.log(`ok ${name} (${frame}) -> ${path.relative(process.cwd(), output)}`);
}
