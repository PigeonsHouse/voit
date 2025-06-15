import { PlayableObject, ResourceObject } from "./mixin";
import { TimelineObject } from "./timeline_object";

export class AudioObject extends TimelineObject implements PlayableObject, ResourceObject {
  declare id: string;
  declare startTime: number;
  declare duration: number;

  filePath: string;
  playSpeed: number;
  startOffset: number;
  volume: number;
  pan: number;

  constructor(
    id: string,
    startTime: number,
    duration: number,
    filePath: string,
    playSpeed: number,
    startOffset: number,
    volume: number,
    pan: number,
  ) {
    super(id, startTime, duration);
    this.filePath = filePath;
    this.playSpeed = playSpeed;
    this.startOffset = startOffset;
    this.volume = volume;
    this.pan = pan;
  }
}
