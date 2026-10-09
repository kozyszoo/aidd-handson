// レンダリングした mp4 を Playwright(chromium) で実再生し、stall・エラー・尺のズレが
// 無いかを機械検証する。currentTime への直接シークは環境によって効かないことがあるため、
// 8倍速再生 + 定期スクリーンショットで全編を素早く走査する方式にしている（実績あり）。
//
// 前提: out/<name>.mp4 を配信するローカルサーバーが起動していること。
//   例: cd out && python3 -m http.server 8791 &
// 使い方:
//   node scripts/verify_playback.mjs http://localhost:8791/preview.html
import { chromium } from "playwright";

const URL = process.argv[2] || "http://localhost:8791/preview.html";
const STEPS = Number(process.argv[3] || 10);

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await context.newPage();

const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => consoleErrors.push(String(err)));

await page.goto(URL);
await page.waitForFunction(() => {
  const v = document.querySelector("video");
  return v && v.readyState >= 1;
});

const meta = await page.evaluate(() => {
  const v = document.querySelector("video");
  return { duration: v.duration, videoWidth: v.videoWidth, videoHeight: v.videoHeight };
});
console.log("meta:", JSON.stringify(meta));

await page.evaluate(() => {
  const v = document.querySelector("video");
  v.muted = true;
  v.playbackRate = 8;
  v.play();
});

for (let i = 0; i < STEPS; i++) {
  await page.waitForTimeout(3500); // 8倍速で約28秒分進む
  const state = await page.evaluate(() => {
    const v = document.querySelector("video");
    return { currentTime: v.currentTime, paused: v.paused, ended: v.ended };
  });
  console.log(`step${i}:`, JSON.stringify(state));
  await page.screenshot({ path: `out/verify_step${i}.png` });
  if (state.ended) break;
}

console.log("consoleErrors:", JSON.stringify(consoleErrors));
await browser.close();
