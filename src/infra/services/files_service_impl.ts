import RNFS from "react-native-fs";
import { EditData } from "../../domain/entities";
import { FilesService } from "../../domain/services";

export class FilesServiceImpl implements FilesService {
  async saveEditData(data: EditData): Promise<void> {
    const path = `${RNFS.DocumentDirectoryPath}/${data.id}.json`;
    await RNFS.writeFile(path, JSON.stringify(data), "utf8");
  }

  async restoreEditData(id: string): Promise<EditData> {
    const path = `${RNFS.DocumentDirectoryPath}/${id}.json`;
    const fileContent = await RNFS.readFile(path, "utf8");
    try {
      return Object.assign(EditData.Dummy(), JSON.parse(fileContent));
    } catch (error) {
      throw new Error("Failed to restore edit data");
    }
  }
}
