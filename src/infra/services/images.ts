import { Size } from "../../domain/common";
import { ImageMediaService } from "../../domain/services";

export class ImageMediaServiceImpl implements ImageMediaService {
  getImageSize(filePath: string): Promise<Size | null> {
    throw new Error("Method not implemented.");
  }
}
