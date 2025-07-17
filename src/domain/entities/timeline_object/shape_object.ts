import uuid from "react-native-uuid";
import { Size, Offset, ZeroSize, ZeroOffset } from "../../common";
import {
  ColoredObject,
  constructColoredObject,
  constructViewableObject,
  ViewableObject,
} from "./mixin";
import { TimelineObject } from "./timeline_object";

export type ShapeType =
  | "circle"
  | "rectangle"
  | "star"
  | "triangle"
  | "line"
  | "pentagon"
  | "hexagon";

export class ShapeObject
  extends TimelineObject
  implements ViewableObject, ColoredObject
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
   * 形状の種類
   */
  shapeType: ShapeType;

  constructor(
    id: string,
    duration: number,
    layer: number,
    startTime: number,
    size: Size,
    position: Offset,
    angle: number,
    opacity: number,
    scale: number,
    color: string,
    shapeType: ShapeType,
  ) {
    super(id, layer, startTime, duration);
    constructViewableObject(this, size, position, angle, opacity, scale);
    constructColoredObject(this, color);
    this.shapeType = shapeType;
  }

  public static create(layer: number, startTime: number) {
    return new ShapeObject(
      uuid.v4() as string,
      3,
      layer,
      startTime,
      ZeroSize,
      ZeroOffset,
      0,
      100,
      1,
      "white",
      "circle",
    );
  }
}
