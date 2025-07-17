import uuid from "react-native-uuid";
import { Offset, Size, ZeroOffset } from "../../common";
import {
  constructPlayableObject,
  constructResourceObject,
  constructViewableObject,
  PlayableObject,
  ResourceObject,
  ViewableObject,
} from "./mixin";
import { TimelineObject } from "./timeline_object";

export class VideoObject
  extends TimelineObject
  implements ViewableObject, PlayableObject, ResourceObject
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
  declare playSpeed: number;
  declare startOffset: number;
  declare volume: number;
  declare pan: number;
  declare filePath: string;

  private constructor(
    id: string,
    duration: number,
    layer: number,
    startTime: number,
    filePath: string,
    size: Size,
    position: Offset,
    angle: number,
    opacity: number,
    scale: number,
    playSpeed: number,
    startOffset: number,
    volume: number,
    pan: number,
  ) {
    super(id, layer, startTime, duration);
    constructViewableObject(this, size, position, angle, opacity, scale);
    constructPlayableObject(this, playSpeed, startOffset, volume, pan);
    constructResourceObject(this, filePath);
  }

  public static create(
    duration: number,
    layer: number,
    startTime: number,
    filePath: string,
    size: Size,
  ) {
    return new VideoObject(
      uuid.v4() as string,
      duration,
      layer,
      startTime,
      filePath,
      size,
      ZeroOffset,
      0,
      100,
      1,
      1,
      0,
      100,
      0,
    );
  }
}
