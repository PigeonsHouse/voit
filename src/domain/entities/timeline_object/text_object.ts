import { Size, Offset } from "../../common";
import { ColoredObject, ViewableObject } from "./mixin";
import { TimelineObject } from "./timeline_object";

export class TextObject extends TimelineObject implements ColoredObject, ViewableObject {
  declare id: string;
  declare startTime: number;
  declare duration: number;

  size: Size;
  position: Offset;
  angle: number;
  opacity: number;
  scale: number;
  color: string;

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

  constructor(
    id: string,
    startTime: number,
    duration: number,
    size: Size,
    position: Offset,
    angle: number,
    opacity: number,
    scale: number,
    color: string,
    text: string,
    font: string,
    fontSize: number,
    maxWidth: number,
  ) {
    super(id, startTime, duration);
    this.size = size;
    this.position = position;
    this.angle = angle;
    this.opacity = opacity;
    this.scale = scale;
    this.color = color;
    this.text = text;
    this.font = font;
    this.fontSize = fontSize;
    this.maxWidth = maxWidth;
  }
}
