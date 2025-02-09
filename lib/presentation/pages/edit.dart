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
import 'package:voit/utils/datetime.dart';
import '../values/video_type.dart';

enum RootMenuState {
  cameraRoll,
  media,
}

final imagePicker = ImagePicker();
const MethodChannel _channel = MethodChannel('com.example.voit/media_scanner');

class Edit extends ConsumerStatefulWidget {
  const Edit({super.key});

  @override
  EditState createState() => EditState();
}

class EditState extends ConsumerState<Edit> {
  final GlobalKey _menuKey = GlobalKey();
  final newEditDataFormKey = GlobalKey<FormState>();
  final TextEditingController titleController = TextEditingController();
  VideoType videoType = VideoType.portrait;
  String? _imagePath;
  OverlayEntry? _overlayEntry;
  final generator = VoiceGenerator();

  switchVideoTypeLandscape() {
    setState(() {
      videoType = VideoType.landscape;
    });
  }

  switchVideoTypePortrait() {
    setState(() {
      videoType = VideoType.portrait;
    });
  }


  String? titleValidator(String? value) {
    if (value!.isEmpty) {
      return 'タイトルを入力してください';
    }
    return null;
  }

  ButtonStyle selectedButtonStyle = const ButtonStyle(
    backgroundColor: WidgetStatePropertyAll(Colors.purple),
    foregroundColor: WidgetStatePropertyAll(Colors.white),
  );

  onClickCreateButton() async {
    // todo targetVideoDataを更新する
  }


  @override
  void initState() {
    super.initState();
  }

  void toggleTopSheet() {
    if (_overlayEntry != null) {
      hideTopSheet();
      return;
    }
    final RenderBox renderBox = _menuKey.currentContext!.findRenderObject() as RenderBox;
    final Offset position = renderBox.localToGlobal(Offset.zero);
    final double y = position.dy + renderBox.size.height;

    _overlayEntry = OverlayEntry(
      builder: (context) {
        return Positioned(
          top: y,
          left: 0,
          right: 0,
          child: Material(
            color: Colors.transparent,
            child: Container(
              margin: const EdgeInsets.only(top: 6),
              padding: const EdgeInsets.all(16),
              decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.vertical(bottom: Radius.circular(12)),
                boxShadow: [
                  BoxShadow(color: Colors.black26, offset: Offset(0, 2))
                ]
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Form(
                    key: newEditDataFormKey,
                    child: Column(
                      children: [
                        SimpleDialogOption(
                          child: TextFormField(
                            controller: titleController,
                            decoration: const InputDecoration(labelText: 'タイトル'),
                            validator: titleValidator,
                          ),
                        ),
                        SimpleDialogOption(
                          child: OverflowBar(
                            alignment: MainAxisAlignment.center,
                            children: [
                              ElevatedButton(
                                onPressed: switchVideoTypeLandscape,
                                style: videoType == VideoType.landscape
                                    ? selectedButtonStyle
                                    : null,
                                child: const Column(
                                  children: [Icon(Icons.computer), Text('横型動画')],
                                ),
                              ),
                              ElevatedButton(
                                onPressed: switchVideoTypePortrait,
                                style: videoType == VideoType.portrait
                                    ? selectedButtonStyle
                                    : null,
                                child: const Column(
                                  children: [Icon(Icons.smartphone), Text('縦型動画')],
                                ),
                              )
                            ],
                          ),
                        ),
                        SimpleDialogOption(
                          child: OverflowBar(children: [
                            ElevatedButton(
                              onPressed: hideTopSheet,
                              style: ElevatedButton.styleFrom(
                                foregroundColor: Colors.purple,
                                backgroundColor: Colors.white,
                              ),
                              child: const Text('キャンセル'),
                            ),
                            ElevatedButton(
                              onPressed: onClickCreateButton,
                              style: ElevatedButton.styleFrom(
                                foregroundColor: Colors.white,
                                backgroundColor: Colors.purple,
                              ),
                              child: const Text('保存'),
                            ),
                          ]),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );

    Overlay.of(context).insert(_overlayEntry!);
  }

  void hideTopSheet() {
    _overlayEntry?.remove();
    _overlayEntry = null;
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
    final nowDateString = toCompactYmdHms(DateTime.now());
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
        title: Text(targetEditData.title, style: const TextStyle(fontSize: 18),),
        actions: [
          IconButton(onPressed: toggleTopSheet, icon: const Icon(Icons.article), key: _menuKey,),
          IconButton(onPressed: startEncode, icon: const Icon(Icons.file_upload))
        ],
        bottom: PreferredSize(preferredSize: const Size.fromHeight(2), child: Container(color: Colors.black12, height: 2,)),
      ),
      body: SafeArea(
        child: Stack(
          children: [
            Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
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
                                Text('カメラロール'),
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
