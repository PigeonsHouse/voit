import 'dart:convert';
import 'dart:io';
import 'dart:isolate';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:just_audio/just_audio.dart';
import 'package:voicevox_flutter/voicevox_flutter.dart';
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart' as p;

class NativeVoiceService {
  late final Isolate isolate;
  late final SendPort sendPort;

  final List<String> _loadedModelNames = [];
  late final Map<String, dynamic> _modelNameMapCache;

  Future<void> initialize() async {
    final modelNameMapAsText = await rootBundle.loadString('assets/styleIdToModelName.json');
    _modelNameMapCache = json.decode(modelNameMapAsText);

    final receivePort = ReceivePort();
    final rootToken = RootIsolateToken.instance!;
    isolate = await Isolate.spawn<(SendPort, RootIsolateToken)>((message) async {
      BackgroundIsolateBinaryMessenger.ensureInitialized(message.$2);

      final receivePort = ReceivePort();
      message.$1.send(receivePort.sendPort);

      receivePort.listen((message) async {
        message = message as Map<String, dynamic>;

        switch (message['method']) {
          case 'initialize':
            await _initialize(
              message['openJdkDictPath'] as String,
            );
            (message['sendPort'] as SendPort).send(null);
          case 'audioQuery':
            (message['sendPort'] as SendPort).send(
              _audioQuery(message['text'] as String, message['styleId'] as int),
            );
          case 'synthesis':
            (message['sendPort'] as SendPort).send(
              await _synthesis(message['query'] as String, message['styleId'] as int),
            );
          case 'tts':
            (message['sendPort'] as SendPort).send(
              await _tts(message['query'] as String, message['styleId'] as int),
            );
          case 'loadVoiceModel':
            await _loadVoiceModel(
              message['modelPath'] as String,
            );
            (message['sendPort'] as SendPort).send(null);
        }
      });
    }, (receivePort.sendPort, rootToken));
    sendPort = await receivePort.first as SendPort;

    final r = ReceivePort();
    sendPort.send({
      'method': 'initialize', 
      'openJdkDictPath': await _setOpenJdkDict(),
      'sendPort': r.sendPort,
    });
    await r.first;
  }

  Future<void> _prepairModel(int styleId) async {
    final requiredModelName = _modelNameMapCache[styleId.toString()];

    if (requiredModelName == null) {
      Exception('このstyleId: $styleIdに対応するモデル.vvmがどれなのかわかりません assetsのstyleIdToModelName.jsonを更新してください。');
    }

    if (_loadedModelNames.contains(requiredModelName)) {
      return;
    }

    const modelAssetDir = 'assets/model';
    final modelDir = Directory('${(await getApplicationSupportDirectory()).path}/model');
    modelDir.createSync();
    await _copyFile(requiredModelName, modelAssetDir, modelDir.path);

    final receivePort = ReceivePort();
    sendPort.send({
      'method': 'loadVoiceModel',
      'modelPath': '${modelDir.path}/$requiredModelName',
      'sendPort': receivePort.sendPort,
    });
    await receivePort.first;

    _loadedModelNames.add(requiredModelName);
  }

  Future<String> audioQuery(String text, int styleId) async {
    await _prepairModel(styleId);

    final receivePort = ReceivePort();
    sendPort.send({
      'method': 'audioQuery',
      'text': text,
      'styleId': styleId,
      'sendPort': receivePort.sendPort,
    });
    return (await receivePort.first) as String;
  }

  Future<String> synthesis(String query, int styleId) async {
    await _prepairModel(styleId);

    final receivePort = ReceivePort();
    sendPort.send({
      'method': 'synthesis',
      'query': query,
      'styleId': styleId,
      'sendPort': receivePort.sendPort,
    });
    return (await receivePort.first) as String;
  }

  Future<String> tts(String query, int styleId) {
    final receivePort = ReceivePort();
    sendPort.send({
      'method': 'tts',
      'query': query,
      'styleId': styleId,
      'sendPort': receivePort.sendPort,
    });
    return receivePort.first as Future<String>;
  }

  void dispose() {
    isolate.kill();
  }
}

Future<void> _initialize(String openJdkDictPath) async {
  await VoicevoxFlutter.instance.initialize(
    openJdkDictPath: openJdkDictPath,
    cpuNumThreads: 4,
  );
}

Future<void> _loadVoiceModel(String modelPath) async {
  VoicevoxFlutter.instance.loadVoiceModel(modelPath);
}

String _audioQuery(String text, int styleId) {
  return VoicevoxFlutter.instance.audioQuery(text, styleId: styleId);
}

Future<String> _synthesis(String query, int styleId) async {
  final wavFile = File('${(await getApplicationDocumentsDirectory()).path}/${query.hashCode}.wav');
  final watch = Stopwatch()..start();
  VoicevoxFlutter.instance.synthesis(
    query,
    styleId: styleId,
    outputPath: wavFile.path,
  );
  watch.stop();

  debugPrint('${watch.elapsedMilliseconds}msで合成して${wavFile.path}に保存しました');
  return wavFile.path;
}

Future<String> _tts(String query, int styleId) async {
  final wavFile = File('${(await getApplicationDocumentsDirectory()).path}/voice.wav');
  final watch = Stopwatch()..start();
  VoicevoxFlutter.instance.tts(
    query,
    styleId: styleId,
    outputPath: wavFile.path,
  );
  watch.stop();
  debugPrint('${watch.elapsedMilliseconds}msで合成して${wavFile.path}に保存しました');
  return wavFile.path;
}

Future<void> _copyFile(String filename, String assetsDir, String targetDirPath) async {
  final data = await rootBundle.load('$assetsDir/$filename');
  final bytes = data.buffer.asUint8List(data.offsetInBytes, data.lengthInBytes);
  File('$targetDirPath/$filename').writeAsBytesSync(bytes);
}

Future<String> _setOpenJdkDict() async {
  final openJdkDictDir = Directory('${(await getApplicationSupportDirectory()).path}/open_jtalk_dic_utf_8');

  if (!openJdkDictDir.existsSync()) {
    openJdkDictDir.createSync();
    const openJdkDicAssetDir = 'assets/open_jtalk_dic_utf_8';

    final manifestContent = await rootBundle.loadString('AssetManifest.json');
    final manifestMap = json.decode(manifestContent) as Map<String, dynamic>;

    manifestMap.keys.where((e) => e.contains(openJdkDicAssetDir)).map(p.basename).forEach((name) async {
      await _copyFile(name, openJdkDicAssetDir, openJdkDictDir.path);
    });
    await Future.delayed(const Duration(seconds: 1));
  }
  return openJdkDictDir.path;
}

class VoiceGenerator {
  final _voiceService = NativeVoiceService();
  final _player = AudioPlayer();
  final _playlist = ConcatenatingAudioSource(children: []);

  VoiceGenerator() {
    _init();
  }

  Future<void> _init() async {
    await _player.setAudioSource(_playlist);
    _voiceService.initialize();
  }

  Future<String> generateAudioFile(String serif) async {
    final query = await _voiceService.audioQuery(serif, 3);
    final path = await _voiceService.synthesis(query, 3);

    return path;
  }

  Future<void> playGeneratedAudioFile(String path) async {
    await _playlist.add(AudioSource.file(path));
    _player.play();
  }
}
