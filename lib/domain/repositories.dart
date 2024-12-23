import 'entities.dart';

abstract class EditDataRepository {
  Future<EditData> getEditData();
  Future<void> saveEditData(EditData editData);
  Future<EditData> restoreEditData(int id);
}
