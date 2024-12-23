import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:voit/presentation/states/main/edit_data.dart';

class Edit extends ConsumerWidget {
  const Edit({super.key});

  Future<void> pickFile() async {
    FilePickerResult? result = await FilePicker.platform.pickFiles();
    if (result != null) {}
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final targetEditData = ref.watch(editDataNotifierProvider);

    return Scaffold(
      body: Center(
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
      // ボトムバーにしたいね
      floatingActionButton: FloatingActionButton(
        onPressed: pickFile,
        child: const Icon(Icons.add),
      ),
    );
  }
}
