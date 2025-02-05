import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'presentation/pages/main.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  var app = ProviderScope(child: MaterialApp(
    theme: ThemeData(
      fontFamily: 'Noto Sans JP',
    ),
    title: 'Voit',
    home: const MainApp(),
  ));
  runApp(app);
}
