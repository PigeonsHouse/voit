import 'package:flutter/material.dart';

import 'create_edit_data_dialog.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    onPressFloatingButton() {
      showDialog(
        context: context,
        builder: (context) {
          return const CreateEditDataDialog();
        },
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
