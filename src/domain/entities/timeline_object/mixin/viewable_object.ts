import { Offset, Size } from "../../../common";

export interface ViewableObject {
  /**
   * オブジェクトのサイズ
   */
  size: Size;

  /**
   * オブジェクトの位置
   */
  position: Offset;

  /**
   * オブジェクトの回転角度（度単位）
   * 0から360の範囲で指定
   */
  angle: number;

  /**
   * オブジェクトの不透明度
   * 0は完全に透明、100は完全に不透明
   */
  opacity: number;

  /**
   * オブジェクトの拡大率
   * 100は元のサイズ、200は2倍、50は半分のサイズを表す
   */
  scale: number;
}

export function isViewableObject(obj: any): obj is ViewableObject {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "size" in obj &&
    "position" in obj &&
    "angle" in obj &&
    "opacity" in obj &&
    "scale" in obj &&
    typeof obj.size === "object" &&
    typeof obj.position === "object" &&
    typeof obj.angle === "number" &&
    typeof obj.opacity === "number" &&
    typeof obj.scale === "number"
  );
}
