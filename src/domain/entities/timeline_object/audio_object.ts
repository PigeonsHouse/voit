import {
  constructPlayableObject,
  constructResourceObject,
  PlayableObject,
  ResourceObject,
} from "./mixin";
import { TimelineObject } from "./timeline_object";

export class AudioObject
  extends TimelineObject
  implements PlayableObject, ResourceObject
{
  declare id: string;
  declare duration: number;
  declare layer: number;
  declare startTime: number;
  declare filePath: string;
  declare playSpeed: number;
  declare startOffset: number;
  declare volume: number;
  declare pan: number;

  private constructor(
    id: string,
    duration: number,
    layer: number,
    startTime: number,
    filePath: string,
    playSpeed: number,
    startOffset: number,
    volume: number,
    pan: number,
  ) {
    super(id, duration, layer, startTime);
    constructPlayableObject(this, playSpeed, startOffset, volume, pan);
    constructResourceObject(this, filePath);
  }

  public static create(
    duration: number,
    layer: number,
    startTime: number,
    filePath: string,
  ): AudioObject {
    return new AudioObject(
      crypto.randomUUID(),
      duration,
      layer,
      startTime,
      filePath,
      1,
      0,
      100,
      0,
    );
  }
}
