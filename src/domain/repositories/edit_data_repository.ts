import { EditData } from "../entities";

export abstract class EditDataRepository {
  abstract initDatabase(): Promise<void>;
  abstract getEditDataList(): Promise<object[]>;
  abstract saveEditData(editData: EditData): Promise<void>;
  abstract restoreEditData(id: string): Promise<EditData>;
}
