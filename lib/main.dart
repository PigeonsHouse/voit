import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'presentation/pages/main.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  const app = ProviderScope(child: MaterialApp(title: 'Voit', home: MainApp()));
  runApp(app);
}
