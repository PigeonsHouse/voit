import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../states/main/bottom_navigation.dart';
import '../values/page_type.dart';
import 'main/home.dart';
import 'main/projects.dart';
import 'main/templates.dart';

class MainApp extends ConsumerWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final currentPage = ref.watch(bottomNavigationNotifierProvider);

    Widget body;
    switch (currentPage) {
      case PageType.home:
        body = const Home();
        break;
      case PageType.projects:
        body = const Projects();
        break;
      case PageType.templates:
        body = const Templates();
        break;
      default:
        body = const Home();
    }

    var bottomNavigationBarItem = <BottomNavigationBarItem>[
      BottomNavigationBarItem(
        icon: currentPage == PageType.home
            ? const Icon(Icons.home)
            : const Icon(Icons.home_outlined),
        label: 'ホーム',
      ),
      BottomNavigationBarItem(
        icon: currentPage == PageType.projects
            ? const Icon(Icons.folder_copy)
            : const Icon(Icons.folder_copy_outlined),
        label: 'プロジェクト',
      ),
      BottomNavigationBarItem(
        icon: currentPage == PageType.templates
            ? const Icon(Icons.dashboard)
            : const Icon(Icons.dashboard_outlined),
        label: 'テンプレート',
      ),
    ];

    onSwitchBottomNavigation(int index) {
      ref
          .read(bottomNavigationNotifierProvider.notifier)
          .changePage(PageType.values[index]);
    }

    return MaterialApp(
      home: Scaffold(
        body: body,
        bottomNavigationBar: BottomNavigationBar(
          currentIndex: currentPage.index,
          onTap: onSwitchBottomNavigation,
          items: bottomNavigationBarItem,
        ),
      ),
    );
  }
}
