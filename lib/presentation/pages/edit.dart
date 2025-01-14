import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:voit/presentation/states/main/edit_data.dart';
import 'package:file_picker/file_picker.dart';
import 'package:image_picker/image_picker.dart';

enum RootMenuState {
  cameraRoll,
  media,
}

final imagePicker = ImagePicker();

class Edit extends ConsumerWidget {
  const Edit({super.key});

  Future<void> pickImage() async {
    XFile? file = await imagePicker.pickImage(source: ImageSource.camera);
    if (file != null) {
      print(file.path);
    }
  }

  Future<void> pickMedia() async {
    FilePickerResult? result = await FilePicker.platform.pickFiles();
    if (result != null) {
      print(result.files[0].path);
    }
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final targetEditData = ref.watch(editDataNotifierProvider);

    return Scaffold(
      body: Stack(
        children: [
          Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Text('Edit'),
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
                  color: Colors.purple,
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
                                color: Colors.white,
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
    );
  }
}
