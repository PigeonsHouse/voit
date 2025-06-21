import { Size } from "../common";
import { EditData } from "../entities";
import { ImageMediaService } from "./image_media_service";
import { PlayableMediaService } from "./playable_media_service";

export class MediaService {
  playableMediaService: PlayableMediaService;
  imageMediaService: ImageMediaService;

  constructor(
    playableMediaService: PlayableMediaService,
    imageMediaService: ImageMediaService,
  ) {
    this.playableMediaService = playableMediaService;
    this.imageMediaService = imageMediaService;
  }

  getImageSize(filePath: string): Promise<Size | null> {
    return this.imageMediaService.getImageSize(filePath);
  }

  getDuration(filePath: string): Promise<number | null> {
    return this.playableMediaService.getDuration(filePath);
  }

  convertVideo(data: EditData): Promise<boolean> {
    return this.playableMediaService.generateVideo(data);
  }
}
