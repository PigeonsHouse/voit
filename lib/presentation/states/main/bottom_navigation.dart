import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../values/page_type.dart';

class BottomNavigationNotifier extends Notifier<PageType> {
  @override
  build() {
    return PageType.home;
  }

  void changePage(PageType pageType) {
    state = pageType;
  }
}

final bottomNavigationNotifierProvider =
    NotifierProvider<BottomNavigationNotifier, PageType>(
        BottomNavigationNotifier.new);
