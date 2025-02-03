import 'dart:io';

import 'package:ffmpeg_kit_flutter_min_gpl/ffmpeg_kit.dart';
import 'package:ffmpeg_kit_flutter_min_gpl/return_code.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:voit/presentation/states/main/edit_data.dart';
import 'package:file_picker/file_picker.dart';
import 'package:image_picker/image_picker.dart';
import 'package:path/path.dart' as path;
import 'package:path_provider/path_provider.dart';

enum RootMenuState {
  cameraRoll,
  media,
}

final imagePicker = ImagePicker();

class Edit extends ConsumerStatefulWidget {
  const Edit({super.key});

  @override
  EditState createState() => EditState();
}

class EditState extends ConsumerState<Edit> {
  String? _imagePath;
  String? _videoPath;

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
      print(savePath);
    }
  }

  Future<void> pickMedia() async {
    FilePickerResult? result = await FilePicker.platform.pickFiles();
    if (result != null) {
      print(result.files[0].path);
    }
  }

  Future<void> startEncode() async {
    if (_imagePath == null) return;

    Directory? externalDir;
    if (Platform.isAndroid) {
      externalDir = await getExternalStorageDirectory();
    } else if (Platform.isIOS) {
      externalDir = await getApplicationDocumentsDirectory();
    }

    if (externalDir == null) return;

    const videoFileName = 'video_from_image.mp4';
    final videoOutputPath = path.join(externalDir.path, videoFileName);

    final ffmpegCommand =
        '-loop 1 -i $_imagePath -c:v libx264 -t 3 -pix_fmt yuv420p -vf scale=trunc(iw/2)*2:trunc(ih/2)*2 "$videoOutputPath"';
    await FFmpegKit.execute(ffmpegCommand).then((session) async {
      final returnCode = await session.getReturnCode();
      final logs = await session.getAllLogs();
      print('FFmpeg returnCode: $returnCode');
      for (final log in logs) {
        print('FFmpeg log: ${log.getMessage()}');
      }
      if (ReturnCode.isSuccess(returnCode)) {
        setState(() {
          _videoPath = videoOutputPath;
        });
        print(videoOutputPath);
      } else {
        final failStackTrace = await session.getFailStackTrace();
        print('FFmpeg execution failed: $failStackTrace');
      }
    });
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
