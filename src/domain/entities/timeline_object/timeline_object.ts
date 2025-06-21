export abstract class TimelineObject {
  /**
   * オブジェクトのID
   */
  id: string;

  /**
   * タイムライン上の再生時間
   */
  duration: number;

  /**
   * レイヤー番号
   */
  layer: number;

  /**
   * タイムライン上の開始時間
   */
  startTime: number;

  /**
   * タイムライン上の終了時間
   */
  get endTime(): number {
    return this.startTime + this.duration;
  }

  protected constructor(
    id: string,
    layer: number,
    startTime: number,
    duration: number,
  ) {
    this.id = id;
    this.duration = duration;
    this.layer = layer;
    this.startTime = startTime;
  }
}
