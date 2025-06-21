import { Offset, Size, ZeroOffset } from "../../common";
import {
  constructResourceObject,
  constructViewableObject,
  ResourceObject,
  ViewableObject,
} from "./mixin";
import { TimelineObject } from "./timeline_object";

export class ImageObject
  extends TimelineObject
  implements ViewableObject, ResourceObject
{
  declare id: string;
  declare duration: number;
  declare layer: number;
  declare startTime: number;
  declare filePath: string;
  declare size: Size;
  declare position: Offset;
  declare angle: number;
  declare opacity: number;
  declare scale: number;

  private constructor(
    id: string,
    layer: number,
    startTime: number,
    filePath: string,
    size: Size,
    duration: number,
    position: Offset,
    angle: number,
    opacity: number,
    scale: number,
  ) {
    super(id, layer, startTime, duration);
    constructViewableObject(this, size, position, angle, opacity, scale);
    constructResourceObject(this, filePath);
  }

  public static create(
    layer: number,
    startTime: number,
    filePath: string,
    size: Size,
  ): ImageObject {
    return new ImageObject(
      crypto.randomUUID(),
      layer,
      startTime,
      filePath,
      size,
      3,
      ZeroOffset,
      0,
      100,
      1,
    );
  }
}
