import 'dart:io';

import 'package:ffmpeg_kit_flutter_min_gpl/ffmpeg_kit.dart';
import 'package:ffmpeg_kit_flutter_min_gpl/return_code.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:voit/ext/voicevox.dart';
import 'package:voit/presentation/states/main/edit_data.dart';
import 'package:file_picker/file_picker.dart';
import 'package:image_picker/image_picker.dart';
import 'package:path/path.dart' as path;
import 'package:path_provider/path_provider.dart';
import 'package:flutter/services.dart';

enum RootMenuState {
  cameraRoll,
  media,
}

String getDateToString(DateTime dt) {
  final year = dt.year;
  final month = zeroPadding("${dt.month}");
  final day = zeroPadding("${dt.day}");
  final hour = zeroPadding("${dt.hour}");
  final minute = zeroPadding("${dt.minute}");
  final second = zeroPadding("${dt.second}");
  return "$year$month$day$hour$minute$second";
}

String zeroPadding(String str) {
  var addZero = "0$str";
  final pos = addZero.length;
  return addZero.substring(pos - 2, pos);
}

final imagePicker = ImagePicker();
const MethodChannel _channel = MethodChannel('com.example.voit/media_scanner');

class Edit extends ConsumerStatefulWidget {
  const Edit({super.key});

  @override
  EditState createState() => EditState();
}

class EditState extends ConsumerState<Edit> {
  String? _imagePath;
  final generator = VoiceGenerator();

  @override
  void initState() {
    super.initState();
  }

  Future<void> pickImage() async {
    final file = await imagePicker.pickImage(source: ImageSource.gallery);
    if (file != null) {
      final dir = await getApplicationDocumentsDirectory();
      final fileName = path.basename(file.path);
      final savePath = path.join(dir.path, fileName);
      await File(file.path).copy(savePath);
      setState(() {
        _imagePath = savePath;
      });
    }
  }

  Future<void> pickMedia() async {
    await FilePicker.platform.pickFiles();
  }

  Future<void> voiceVox() async {
    final path = await generator.generateAudioFile("ずんだもんなのだ");
    await generator.playGeneratedAudioFile(path);
  }

  Future<void> startEncode() async {
    if (_imagePath == null) return;

    final Directory publicMoviesDir = Directory("/storage/emulated/0/Movies");
    if (!publicMoviesDir.existsSync()) {
      // 存在しない場合は再帰的に作成
      publicMoviesDir.createSync(recursive: true);
    }

    final targetEditData = ref.watch(editDataNotifierProvider);
    final nowDateString = getDateToString(DateTime.now());
    final videoFileName = '${targetEditData.title}_$nowDateString.mp4';
    final videoOutputPath = path.join(publicMoviesDir.path, videoFileName);

    final ffmpegCommand =
        '-loop 1 -i $_imagePath -c:v libx264 -t 3 -pix_fmt yuv420p -vf scale=trunc(iw/2)*2:trunc(ih/2)*2 "$videoOutputPath"';
    await FFmpegKit.executeAsync(ffmpegCommand, (session) async {
      final returnCode = await session.getReturnCode();
      if (ReturnCode.isSuccess(returnCode)) {
        _scanVideoFile(videoOutputPath);
      }
    });
  }

  Future<void> _scanVideoFile(String filePath) async {
    await _channel.invokeMethod('scanFile', {'filePath': filePath});
  }

  @override
  Widget build(BuildContext context) {
    final targetEditData = ref.watch(editDataNotifierProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('EDIT'),
        backgroundColor: Colors.greenAccent,
        actions: [
          IconButton(onPressed: startEncode, icon: const Icon(Icons.file_upload))
        ],
      ),
      body: SafeArea(
        child: Stack(
          children: [
            Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(targetEditData.title),
                  Text(targetEditData.resolution.toString()),
                  Text(targetEditData.scenes.toString()),
                ],
              ),
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container(
                    decoration: const BoxDecoration(
                      border: Border(
                        top: BorderSide(
                          color: Colors.black12,
                          width: 1
                        )
                      )
                    ),
                    alignment: Alignment.centerLeft,
                    padding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                    child: SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          GestureDetector(
                            onTap: pickImage,
                            child: const Column(
                              children: [
                                Icon(
                                  Icons.camera_alt_outlined,
                                ),
                                Text('カメラロール', selectionColor: Colors.white),
                              ],
                            ),
                          ),
                          const SizedBox(width: 16),
                          GestureDetector(
                            onTap: pickMedia,
                            child: const Column(
                              children: [
                                Icon(Icons.photo_library_outlined),
                                Text('メディア'),
                              ],
                            ),
                          ),
                          const SizedBox(width: 16),
                          GestureDetector(
                            onTap: voiceVox,
                            child: const Column(
                              children: [
                                Icon(Icons.mic),
                                Text('VOICEVOX'),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  )
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
