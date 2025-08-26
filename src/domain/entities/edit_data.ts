import uuid from "react-native-uuid";
import { Size } from "../common";
import { SceneData } from "./scene_data";

export class EditData {
  /**
   * 編集データのID
   */
  id: string;

  /**
   * 動画のタイトル
   */
  title: string;

  /**
   * 動画の解像度
   */
  resolution: Size;

  /**
   * シーンのリスト
   */
  scenes: SceneData[];

  constructor(props: {
    id?: string;
    title: string;
    resolution: Size;
    scenes?: SceneData[];
  }) {
    this.id = props.id ?? uuid.v4().toString();
    this.title = props.title;
    this.resolution = props.resolution;
    this.scenes = props.scenes ?? [new SceneData()];
  }

  /**
   * 動画の時間長を取得する
   */
  get duration(): number {
    return this.scenes.reduce((prev, scene) => prev + scene.duration, 0);
  }

  static Dummy(): EditData {
    return new EditData({
      title: "",
      resolution: { width: 0, height: 0 },
    });
  }
}
