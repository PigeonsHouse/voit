import { EditData } from "../entities";

export type DbEditData = {
  id: string;
  title: string;
};

export abstract class EditDataRepository {
  abstract initDatabase(): Promise<void>;
  abstract getEditDataList(): Promise<DbEditData[]>;
  abstract saveEditData(editData: EditData): Promise<void>;
}
