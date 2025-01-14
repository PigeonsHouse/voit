import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../states/main/edit_data.dart';
import '../edit.dart';
import '../../values/video_type.dart';

class CreateEditDataDialog extends ConsumerStatefulWidget {
  const CreateEditDataDialog({super.key});

  @override
  CreateEditDataDialogState createState() => CreateEditDataDialogState();
}

class CreateEditDataDialogState extends ConsumerState<CreateEditDataDialog> {
  VideoType videoType = VideoType.portrait;
  String title = "";

  final TextEditingController titleController = TextEditingController();
  final newEditDataFormKey = GlobalKey<FormState>();

  ButtonStyle selectedButtonStyle = const ButtonStyle(
    backgroundColor: WidgetStatePropertyAll(Colors.purple),
    foregroundColor: WidgetStatePropertyAll(Colors.white),
  );

  String? titleValidator(String? value) {
    if (value!.isEmpty) {
      return 'タイトルを入力してください';
    }
    return null;
  }

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

  onClickCreateButton() async {
    if (!newEditDataFormKey.currentState!.validate()) return;
    await ref
        .read(editDataNotifierProvider.notifier)
        .initEditData(title, videoType);
    if (!mounted) return;
    Navigator.pop(context);
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const Edit()),
    );
  }

  closeDialog() {
    Navigator.pop(context);
  }

  @override
  void initState() {
    super.initState();
    titleController.addListener(() {
      setState(() {
        title = titleController.text;
      });
    });
  }

  @override
  void dispose() {
    titleController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SimpleDialog(
      title: const Text('新しい動画の作成'),
      children: <Widget>[
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
                    onPressed: closeDialog,
                    style: ElevatedButton.styleFrom(
                      foregroundColor: Colors.purple,
                    ),
                    child: const Text('キャンセル'),
                  ),
                  ElevatedButton(
                    onPressed: onClickCreateButton,
                    style: ElevatedButton.styleFrom(
                      foregroundColor: Colors.white,
                      backgroundColor: Colors.purple,
                    ),
                    child: const Text('作成'),
                  ),
                ]),
              ),
            ],
          ),
        )
      ],
    );
  }
}
