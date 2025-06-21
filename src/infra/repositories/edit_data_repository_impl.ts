import { EditData } from "../../domain/entities";
import { EditDataRepository } from "../../domain/repositories";

export class EditDataRepositoryImpl extends EditDataRepository {
  initDatabase(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getEditDataList(): Promise<object[]> {
    throw new Error("Method not implemented.");
  }
  saveEditData(editData: EditData): Promise<void> {
    throw new Error("Method not implemented.");
  }
  restoreEditData(id: string): Promise<EditData> {
    throw new Error("Method not implemented.");
  }
}
