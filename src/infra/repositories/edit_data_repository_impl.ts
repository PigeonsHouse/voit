import SQLite from "react-native-sqlite-storage";
import { EditData } from "../../domain/entities";
import { DbEditData, EditDataRepository } from "../../domain/repositories";

export class EditDataRepositoryImpl extends EditDataRepository {
  editDataDbFile = "edit_data_database.db";
  tableName = "edit_data";
  version = 1;
  database: SQLite.SQLiteDatabase | null = null;

  async initDatabase(): Promise<void> {
    SQLite.enablePromise(true);
    this.database = await SQLite.openDatabase({
      name: this.editDataDbFile,
      location: "default",
    });
    this.database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${this.tableName} (id TEXT PRIMARY KEY, title TEXT)`,
        [],
      );
    });
  }

  async getEditDataList(): Promise<DbEditData[]> {
    if (!this.database) {
      throw new Error("Database is not initialized. Call initDatabase first.");
    }
    const editDataList: DbEditData[] = [];
    await this.database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${this.tableName}`,
        [],
        (tx, result) => {
          for (let i = 0; i < result.rows.length; i++) {
            const item = result.rows.item(i);
            editDataList.push({
              id: item.id,
              title: item.title,
            });
          }
        },
        (error) => {
          console.error("Error fetching edit data list:", error);
          throw error;
        },
      );
    });
    return editDataList;
  }

  async saveEditData(editData: EditData): Promise<void> {
    if (!this.database) {
      throw new Error("Database is not initialized. Call initDatabase first.");
    }
    this.database.transaction(
      (tx) => {
        tx.executeSql(
          `SELECT * FROM ${this.tableName}`,
          [],
          (tx, result) => {
            for (let i = 0; i < result.rows.length; i++) {
              if (result.rows.item(i).id === editData.id) {
                tx.executeSql(
                  `UPDATE ${this.tableName} SET title = ? WHERE id = ?`,
                  [editData.title, editData.id],
                );
                return;
              }
            }
            tx.executeSql(
              `INSERT INTO ${this.tableName} (id, title) VALUES (?, ?)`,
              [editData.id, editData.title],
            );
          },
          (error) => {
            console.error("Error fetching edit data list:", error);
            throw error;
          },
        );
      },
      (error) => {
        console.error("Transaction error:", error);
        throw error;
      },
    );
  }
}
