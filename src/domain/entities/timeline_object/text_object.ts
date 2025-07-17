import uuid from "react-native-uuid";
import { Size, Offset, ZeroOffset } from "../../common";
import {
  ColoredObject,
  constructColoredObject,
  ViewableObject,
  constructViewableObject,
} from "./mixin";
import { TimelineObject } from "./timeline_object";

export class TextObject
  extends TimelineObject
  implements ColoredObject, ViewableObject
{
  declare id: string;
  declare duration: number;
  declare layer: number;
  declare startTime: number;
  declare size: Size;
  declare position: Offset;
  declare angle: number;
  declare opacity: number;
  declare scale: number;
  declare color: string;

  /**
   * 字幕の内容
   */
  text: string;

  /**
   * フォント
   */
  font: string;

  /**
   * フォントサイズ
   */
  fontSize: number;

  /**
   * 最大幅
   */
  maxWidth: number;

  private constructor(
    id: string,
    duration: number,
    layer: number,
    startTime: number,
    text: string,
    font: string,
    fontSize: number,
    maxWidth: number,
    size: Size,
    position: Offset,
    angle: number,
    opacity: number,
    scale: number,
    color: string,
  ) {
    super(id, layer, startTime, duration);
    constructViewableObject(this, size, position, angle, opacity, scale);
    constructColoredObject(this, color);

    this.text = text;
    this.font = font;
    this.fontSize = fontSize;
    this.maxWidth = maxWidth;
  }

  public static create(
    layer: number,
    startTime: number,
    text: string,
  ): TextObject {
    return new TextObject(
      uuid.v4() as string,
      3,
      layer,
      startTime,
      text,
      // 後で考える
      "",
      // 後で考える
      60,
      // 後で考える
      1000,
      // サイズは後で考える
      {
        width: 100,
        height: 100,
      },
      ZeroOffset,
      0,
      100,
      1,
      "white",
    );
  }
}
