import uuid from "react-native-uuid";
import { TimelineObject } from "./timeline_object";

export class SceneData {
  /**
   * シーンのID
   */
  id: string;

  /**
   * シーン内のオブジェクトのリスト
   */
  objects: TimelineObject[];

  constructor(
    id: string = uuid.v4() as string,
    objects: TimelineObject[] = [],
  ) {
    this.id = id;
    this.objects = objects;
  }

  /**
   * シーンの時間長を取得する
   */
  get duration(): number {
    return this.objects.reduce((prev, obj) => Math.max(prev, obj.endTime), 0);
  }
}
