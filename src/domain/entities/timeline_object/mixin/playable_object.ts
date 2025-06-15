export interface PlayableObject {
  /**
   * 再生速度
   */
  playSpeed: number;

  /**
   * 開始位置
   */
  startOffset: number;

  /**
   * 音量
   */
  volume: number;

  /**
   * パン
   * L: -1.0, R: 1.0
   */
  pan: number;
}

export function isPlayableObject(obj: any): obj is PlayableObject {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "playSpeed" in obj &&
    typeof obj.playSpeed === "number" &&
    "startOffset" in obj &&
    typeof obj.startOffset === "number" &&
    "volume" in obj &&
    typeof obj.volume === "number" &&
    "pan" in obj &&
    typeof obj.pan === "number"
  );
}
