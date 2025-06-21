import { EditData } from "../entities";

export abstract class PlayableMediaService {
  abstract getDuration(filePath: string): Promise<number | null>;
  abstract generateVideo(data: EditData): Promise<boolean>;
}
