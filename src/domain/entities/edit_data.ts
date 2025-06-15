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

  constructor(
    id: string,
    title: string,
    resolution: Size,
    scenes: SceneData[]
  ) {
    this.id = id;
    this.title = title;
    this.resolution = resolution;
    this.scenes = scenes;
  }

  /**
   * 動画の時間長を取得する
   */
  get duration(): number {
    return this.scenes.reduce((prev, scene) => prev + scene.duration, 0);
  }
}

export default EditData