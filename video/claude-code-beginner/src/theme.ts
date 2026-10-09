// レポート動画のブランドカラー（プレースホルダ配色。案件ごとに accent/accentDeep/accentSoft を
// 対象レポートの配色に合わせて差し替える。他の色はそのままでよい）
export const theme = {
  bg: "#fafafa",
  paper: "#ffffff",
  ink: "#1a1a1a",
  inkSoft: "#6f6f6f",
  accent: "#0f766e",
  accentDeep: "#115e59",
  accentSoft: "#e3f3f0",
  green: "#1a9e5c",
  greenSoft: "#e6f7ee",
  blue: "#4a90d9",
  blueSoft: "#e4f0fb",
  yellowSoft: "#fff4cf",
  yellowLine: "#f5c542",
  red: "#c0392b",
  redSoft: "#fde5e0",
  line: "#d5d5d5",
} as const;

export const FONT_STACK =
  '"M PLUS Rounded 1c", "Hiragino Maru Gothic ProN", "Hiragino Sans", "Yu Gothic UI", sans-serif';

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

// 短い別名（シーン定義で多用するため）
export const T = theme;
