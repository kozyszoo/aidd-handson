// 1本を音声つきで書き出し、音量を -16 LUFS 付近へそろえる。
//   node scripts/render.mjs step0   → out/step0.mp4
import { execFileSync } from "node:child_process";
const video = process.argv[2];
if (!/^step[0-7]$/.test(video ?? "")) { console.error("usage: node scripts/render.mjs step0..step7"); process.exit(1); }
const id = "Step" + video.slice(4);
execFileSync("npx", ["remotion", "render", id, `out/${video}_raw.mp4`], { stdio: "inherit" });
execFileSync("ffmpeg", ["-y", "-i", `out/${video}_raw.mp4`, "-af", "loudnorm=I=-16:TP=-1.5:LRA=7",
  "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", `out/${video}.mp4`], { stdio: "inherit" });
const v = execFileSync("ffmpeg", ["-i", `out/${video}.mp4`, "-af", "volumedetect", "-f", "null", "-"], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).toString();
console.log("done", video);
