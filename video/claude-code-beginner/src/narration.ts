import { FPS } from "./theme";
import step0 from "./data/step0.json";
import step1 from "./data/step1.json";
import step2 from "./data/step2.json";
import step3 from "./data/step3.json";
import step4 from "./data/step4.json";
import step5 from "./data/step5.json";
import step6 from "./data/step6.json";
import step7 from "./data/step7.json";

// 動画（Step）ごとの音声尺。src/data/stepN.json は scripts/sync_durations.mjs が書き換える（手で編集しない）。
// 音声生成前は JSON が空なので、仮の尺（20秒）で静止画の確認だけできる。
export type AudioEntry = { file: string; sec: number };
const ALL: Record<string, Record<string, AudioEntry>> = {
  step0, step1, step2, step3, step4, step5, step6, step7,
};

export const DRAFT_SEC = 20;

// 音声の前後に置く無音の余白（秒）。語り出しの前と、言い終わりの余韻。
export const HEAD_PAD = 0.5;
export const TAIL_PAD = 0.9;
// 章扉（無音）の固定尺
export const CARD_FRAMES = 60;

export const audioOf = (video: string, key: string): AudioEntry | undefined => ALL[video]?.[key];

export const audioSceneFrames = (video: string, key: string): number => {
  const sec = audioOf(video, key)?.sec ?? DRAFT_SEC;
  return Math.ceil((HEAD_PAD + sec + TAIL_PAD) * FPS);
};
