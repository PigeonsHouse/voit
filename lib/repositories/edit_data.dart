import 'package:flutter/material.dart';

import 'package:voit/domain/entities.dart';
import 'package:voit/domain/repositories.dart';

class EditDataRepositoryImpl extends EditDataRepository {
  @override
  // TODO: 仮実装
  Future<EditData> getEditData() {
    return Future.value(EditData(
      title: '動画のタイトル',
      resolution: const Rect.fromLTWH(0, 0, 1920, 1080),
      scenes: [
        SceneData(
          objects: [
            VideoObject(
              startTime: 0,
              duration: 5,
              position: const Offset(100, 100),
              angle: 0,
              opacity: 0,
              filePath: "",
              speed: 1,
              startOffset: 0,
              volume: 100,
              pan: 0,
            ),
          ],
        ),
      ],
    ));
  }

  @override
  // TODO: 仮実装
  Future<void> saveEditData(EditData editData) async {
    debugPrint('editData: $editData');
  }

  @override
  // TODO: 仮実装
  Future<EditData> restoreEditData(int id) {
    // ここでデータを復元する
    return Future.value(EditData(
      title: '動画のタイトル',
      resolution: const Rect.fromLTWH(0, 0, 1920, 1080),
      scenes: [
        SceneData(
          objects: [
            VideoObject(
              startTime: 0,
              duration: 5,
              position: const Offset(100, 100),
              angle: 0,
              opacity: 0,
              filePath: "",
              speed: 1,
              startOffset: 0,
              volume: 100,
              pan: 0,
            ),
          ],
        ),
      ],
    ));
  }
}
