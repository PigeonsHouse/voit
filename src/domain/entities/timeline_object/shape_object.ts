import { Size, Offset } from "../../common";
import { ColoredObject, ViewableObject } from "./mixin";
import { TimelineObject } from "./timeline_object";

export class ShapeObject
  extends TimelineObject
  implements ViewableObject, ColoredObject
{
  declare id: string;
  declare startTime: number;
  declare duration: number;

  size: Size;
  position: Offset;
  angle: number;
  opacity: number;
  scale: number;
  color: string;

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
  ) {
    super(id, startTime, duration);
    this.size = size;
    this.position = position;
    this.angle = angle;
    this.opacity = opacity;
    this.scale = scale;
    this.color = color;
  }
}
