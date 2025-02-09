import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:voit/presentation/pages/edit.dart';
import 'package:voit/presentation/values/video_type.dart';
import 'package:voit/utils/datetime.dart';

import '../../states/main/edit_data.dart';

class Home extends ConsumerWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    onPressFloatingButton() async {
      final defaultTitle = "video_${toCompactYmdHms(DateTime.now())}";
      const defaultVideoType = VideoType.landscape;
      await ref
          .read(editDataNotifierProvider.notifier)
          .initEditData(defaultTitle, defaultVideoType);
      if (!context.mounted) return;
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => const Edit()),
      );
    }

    return Scaffold(
      body: const Center(
        child: Text('ここにホームの画面が出るよ'),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: onPressFloatingButton,
        child: const Icon(Icons.add),
      ),
    );
  }
}
