import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { SceneAudio } from "../components/SceneAudio";
import { CARD_FRAMES, audioSceneFrames } from "../narration";
import { T } from "../theme";

// 1本の動画 = シーンの配列。key があるシーンは音声つき（narration/stepN.md の `## key` と同じ名前）。
// card: true は無音の章扉（60フレーム）。
export type SceneDef =
  | { key: string; node: React.ReactNode }
  | { card: true; node: React.ReactNode };

export const makeVideo = (video: string, scenes: SceneDef[]) => {
  const frames = (s: SceneDef) => ("card" in s ? CARD_FRAMES : audioSceneFrames(video, s.key));
  const duration = scenes.reduce((sum, s) => sum + frames(s), 0);
  const Component: React.FC = () => (
    <AbsoluteFill style={{ backgroundColor: T.bg }}>
      <Series>
        {scenes.map((s, i) => (
          <Series.Sequence key={i} durationInFrames={frames(s)}>
            {"key" in s ? <SceneAudio video={video} sceneKey={s.key} /> : null}
            {s.node}
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
  return { Component, duration };
};
