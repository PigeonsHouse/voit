import 'package:flutter/material.dart';
import 'package:uuid/uuid.dart';

import 'values.dart';

class EditData {
  /// 動画のタイトル
  String title;

  /// 動画の解像度
  Rect resolution;

  /// シーンのリスト
  List<SceneData> scenes;

  EditData({
    required this.title,
    required this.resolution,
    required this.scenes,
  });
}

class SceneData {
  /// シーンのID
  late String id;

  /// シーンのオブジェクトのリスト
  List<TimelineObject> objects;

  SceneData({required this.objects}) {
    var uuid = const Uuid();
    id = uuid.v4();
  }
}

class TimelineObject {
  /// オブジェクトのID
  late String id;

  /// タイムライン上の開始時間
  double startTime;

  /// タイムライン上の再生時間
  double duration;

  TimelineObject({
    required this.startTime,
    required this.duration,
  }) {
    var uuid = const Uuid();
    id = uuid.v4();
  }

  /// タイムライン上の終了時間
  double get endTime => startTime + duration;
}

enum TimelineObjectType {
  video,
  image,
  audio,
  text,
  shape,
}

class VideoObject extends TimelineObject {
  /// オブジェクトの中央の絶対座標
  Offset position;

  /// 角度
  double angle;

  /// 透明度
  double opacity;

  /// ファイルパス
  String filePath;

  /// 再生速度
  double speed;

  /// 開始位置
  double startOffset;

  /// 音量
  double volume;

  /// パン
  /// L: -1.0 ~ 1.0 :R
  double pan;

  VideoObject({
    required this.position,
    required this.angle,
    required this.opacity,
    required this.filePath,
    required this.speed,
    required this.startOffset,
    required this.volume,
    required this.pan,
    required super.startTime,
    required super.duration,
  });

  static VideoObject create(String path) {
    return VideoObject(
      position: Offset.zero,
      angle: 0,
      opacity: 1,
      filePath: path,
      speed: 1,
      startOffset: 0,
      volume: 100,
      pan: 0,
      startTime: 0,
      // ここ取得方法を考える
      // ffprobeと思うけど、typeが異なるバリデーションも必要
      duration: 100,
    );
  }
}

class ImageObject extends TimelineObject {
  /// オブジェクトの中央の絶対座標
  Offset position;

  /// 角度
  double angle;

  /// 透明度
  double opacity;

  /// ファイルパス
  String filePath;

  ImageObject({
    required this.position,
    required this.angle,
    required this.opacity,
    required this.filePath,
    required super.startTime,
    required super.duration,
  });

  static ImageObject create(String path) {
    return ImageObject(
      position: Offset.zero,
      angle: 0,
      opacity: 1,
      filePath: path,
      startTime: 0,
      // ここ取得方法を考える
      duration: 100,
    );
  }
}

class AudioObject extends TimelineObject {
  /// 再生速度
  double speed;

  /// 開始位置
  double startOffset;

  /// 音量
  double volume;

  /// パン
  /// L: -1.0 ~ 1.0 :R
  double pan;

  /// ファイルパス
  String filePath;

  AudioObject({
    required this.speed,
    required this.startOffset,
    required this.volume,
    required this.pan,
    required this.filePath,
    required super.startTime,
    required super.duration,
  });

  static AudioObject create(String path) {
    return AudioObject(
      filePath: path,
      speed: 1,
      startOffset: 0,
      volume: 100,
      pan: 0,
      startTime: 0,
      // ここ取得方法を考える
      duration: 100,
    );
  }
}

class TextObject extends TimelineObject {
  /// オブジェクトの中央の絶対座標
  Offset position;

  /// 字幕の文章
  String text;

  /// フォント
  String font;

  /// フォントサイズ
  double fontSize;

  /// 角度
  double angle;

  /// 透明度
  double opacity;

  /// 色
  Color color;

  /// 最大幅
  double maxWidth;

  TextObject({
    required this.position,
    required this.text,
    required this.font,
    required this.fontSize,
    required this.angle,
    required this.opacity,
    required this.color,
    required this.maxWidth,
    required super.startTime,
    required super.duration,
  });

  static TextObject create(String text) {
    return TextObject(
      position: Offset.zero,
      text: text,
      font: "",
      fontSize: 12,
      angle: 0,
      opacity: 1,
      color: Colors.white,
      maxWidth: 1000,
      startTime: 0,
      // ここ取得方法を考える
      duration: 100,
    );
  }
}

class ShapeObject extends TimelineObject {
  /// オブジェクトの中央の絶対座標
  Offset position;

  /// 図形の種類
  ShapeType type;

  /// 色
  Color color;

  /// 角度
  double angle;

  /// 透明度
  double opacity;

  /// 輪郭線のみ
  bool isOutlineOnly;

  ShapeObject({
    required this.position,
    required this.type,
    required this.color,
    required this.angle,
    required this.opacity,
    required this.isOutlineOnly,
    required super.startTime,
    required super.duration,
  });

  static ShapeObject create(String text) {
    return ShapeObject(
      position: Offset.zero,
      type: ShapeType.circle,
      color: Colors.white,
      angle: 0,
      opacity: 1,
      isOutlineOnly: false,
      startTime: 0,
      // ここ取得方法を考える
      duration: 100,
    );
  }
}
