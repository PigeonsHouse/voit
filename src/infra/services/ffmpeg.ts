import { EditData } from "../../domain/entities";
import { PlayableMediaService } from "../../domain/services";

export class FfmpegPlayableMediaService implements PlayableMediaService {
  getDuration(filePath: string): Promise<number | null> {
    throw new Error("Method not implemented.");
  }
  generateVideo(data: EditData): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
