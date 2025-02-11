import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:voit/repositories/edit_data.dart';

import '../../../domain/entities.dart';
import '../../../domain/repositories.dart';
import '../../../application/usecases.dart';
import '../../values/video_type.dart';

class EditDataNotifier extends Notifier<EditData> {
  late EditDataUsecase editDataUsecase;

  EditDataNotifier() {
    EditDataRepository editDataRepository = EditDataRepositoryImpl();
    editDataUsecase = EditDataUsecase(editDataRepository);
  }

  @override
  build() {
    return EditData(
      title: "",
      resolution: Rect.zero,
      scenes: [],
    );
  }

  Future<void> initEditData(String title, VideoType videoType) async {
    Rect rect = videoType == VideoType.landscape
        ? const Rect.fromLTWH(0, 0, 1920, 1080)
        : const Rect.fromLTWH(0, 0, 1080, 1920);
    state = await editDataUsecase.createEditData(title, rect);
  }

  void setTitle(String title) {
    state = editDataUsecase.updateTitle(state, title);
  }

  void addMedia(String baseString, TimelineObjectType type) {
    // 引数で受け付けたい
    final targetSceneId = state.scenes[0].id;
    state = editDataUsecase.importObject(state, targetSceneId, type, baseString);
  }
}

final editDataNotifierProvider =
    NotifierProvider<EditDataNotifier, EditData>(EditDataNotifier.new);
