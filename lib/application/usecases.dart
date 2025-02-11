import 'package:flutter/material.dart';

import '../domain/entities.dart';
import '../domain/repositories.dart';

class EditDataUsecase {
  final EditDataRepository _editDataRepository;

  EditDataUsecase(this._editDataRepository);

  Future<EditData> createEditData(String title, Rect resolution) async {
    final data = EditData(
      title: title,
      resolution: resolution,
      scenes: [
        SceneData(
          objects: [],
        ),
      ],
    );
    await _editDataRepository.saveEditData(data);
    return data;
  }

  // シーンを追加する
  void addScene(EditData data) {
    data.scenes.add(
      SceneData(
        objects: [],
      ),
    );
  }

  // シーンを削除する
  void removeScene(EditData data, String sceneId) {
    data.scenes = data.scenes.where((scene) => scene.id != sceneId).toList();
  }

  // カメラロール・フォルダから素材を追加
  EditData importObject(EditData data, String sceneId, TimelineObjectType type, String baseString) {
    for (SceneData scene in data.scenes) {
      if (scene.id != sceneId) continue;
      switch (type) {
        case TimelineObjectType.video:
          scene.objects.add(VideoObject.create(baseString));
        case TimelineObjectType.image:
          scene.objects.add(ImageObject.create(baseString));
        case TimelineObjectType.audio:
          scene.objects.add(AudioObject.create(baseString));
        case TimelineObjectType.text:
          scene.objects.add(TextObject.create(baseString));
        case TimelineObjectType.shape:
          scene.objects.add(ShapeObject.create(baseString));
      }
    }

    return EditData(title: data.title, resolution: data.resolution, scenes: data.scenes);
  }

  // オブジェクトの開始位置を変更する
  void moveObjectPosition(int id, Offset position) {}

  // オブジェクトのパラメータ(エフェクト)を変更する
  void changeObjectParameter(int id, double parameter) {
    // これがエフェクトの数だけ生える気がする。実装大量に必要そう。
  }

  EditData updateTitle(EditData data, String title) {
    return EditData(title: title, resolution: data.resolution, scenes: data.scenes);
  }

  // 動画を出力する
  void exportVideo() {}

  // 編集データを保存する
  Future<void> save(EditData data) {
    return _editDataRepository.saveEditData(data);
  }

  // 編集データを開く
  Future<EditData> restore(int id) {
    return _editDataRepository.restoreEditData(id);
  }
}
