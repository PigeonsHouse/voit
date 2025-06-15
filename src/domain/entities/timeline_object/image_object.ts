import { Offset, Size } from "../../common";
import { ResourceObject, ViewableObject } from "./mixin";
import { TimelineObject } from "./timeline_object";

export class ImageObject extends TimelineObject implements ViewableObject, ResourceObject {
  declare id: string;
  declare startTime: number;
  declare duration: number;

  size: Size;
  position: Offset;
  angle: number;
  opacity: number;
  scale: number;
  filePath: string;

  constructor(
    id: string,
    startTime: number,
    duration: number,
    size: Size,
    position: Offset,
    angle: number,
    opacity: number,
    scale: number,
    filePath: string
  ) {
    super(id, startTime, duration);
    this.size = size;
    this.position = position;
    this.angle = angle;
    this.opacity = opacity;
    this.scale = scale;
    this.filePath = filePath;
  }
}