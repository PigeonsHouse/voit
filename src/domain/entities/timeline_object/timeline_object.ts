export abstract class TimelineObject {
  /**
   * オブジェクトのID
   */
  id: string;

  /**
   * タイムライン上の開始時間
   */
  startTime: number;

  /**
   * タイムライン上の再生時間
   */
  duration: number;

  /**
   * タイムライン上の終了時間
   */
  get endTime(): number {
    return this.startTime + this.duration;
  }

  constructor(id: string, startTime: number, duration: number) {
    this.id = id;
    this.startTime = startTime;
    this.duration = duration;
  }
}
