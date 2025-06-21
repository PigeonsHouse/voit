import { Size } from "../common";

export abstract class ImageMediaService {
  abstract getImageSize(filePath: string): Promise<Size | null>;
}
