import { Offset, Size } from "../../common";
import { PlayableObject, ResourceObject, ViewableObject } from "./mixin";
import { TimelineObject } from "./timeline_object";

export class VideoObject extends TimelineObject implements ViewableObject, PlayableObject, ResourceObject {
  declare id: string;
  declare startTime: number;
  declare duration: number;

  size: Size;
  position: Offset;
  angle: number;
  opacity: number;
  scale: number;
  playSpeed: number;
  startOffset: number;
  volume: number;
  pan: number;
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
    playSpeed: number,
    startOffset: number,
    volume: number,
    pan: number,
    filePath: string
  ) {
    super(id, startTime, duration);
    this.size = size;
    this.position = position;
    this.angle = angle;
    this.opacity = opacity;
    this.scale = scale;
    this.playSpeed = playSpeed;
    this.startOffset = startOffset;
    this.volume = volume;
    this.pan = pan;
    this.filePath = filePath;
  }
}