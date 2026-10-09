import React from "react";
import { Composition } from "remotion";
import { loadFont as loadRounded } from "@remotion/google-fonts/MPLUSRounded1c";
import { FPS, HEIGHT, WIDTH } from "./theme";
import { Video as Step0 } from "./videos/step0";
import { Video as Step1 } from "./videos/step1";
import { Video as Step2 } from "./videos/step2";
import { Video as Step3 } from "./videos/step3";
import { Video as Step4 } from "./videos/step4";
import { Video as Step5 } from "./videos/step5";
import { Video as Step6 } from "./videos/step6";
import { Video as Step7 } from "./videos/step7";

loadRounded();

const VIDEOS = { Step0, Step1, Step2, Step3, Step4, Step5, Step6, Step7 };

export const RemotionRoot: React.FC = () => (
  <>
    {Object.entries(VIDEOS).map(([id, v]) => (
      <Composition key={id} id={id} component={v.Component} durationInFrames={v.duration}
        fps={FPS} width={WIDTH} height={HEIGHT} />
    ))}
  </>
);
