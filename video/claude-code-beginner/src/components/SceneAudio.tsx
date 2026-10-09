import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { FPS } from "../theme";
import { HEAD_PAD, audioOf } from "../narration";

// シーンの音声を HEAD_PAD ぶん遅らせて鳴らす。音声ファイルがまだ無い（JSON が空）ときは何も鳴らさない。
export const SceneAudio: React.FC<{ video: string; sceneKey: string }> = ({ video, sceneKey }) => {
  const entry = audioOf(video, sceneKey);
  if (!entry) return null;
  return (
    <Sequence from={Math.round(HEAD_PAD * FPS)}>
      <Audio src={staticFile(entry.file)} />
    </Sequence>
  );
};
