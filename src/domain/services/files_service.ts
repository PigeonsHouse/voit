import { EditData } from "../entities";

export abstract class FilesService {
  abstract saveEditData(data: EditData): Promise<void>;
  abstract restoreEditData(id: string): Promise<EditData>;
}
