String toCompactYmdHms(DateTime dt) {
  final year = dt.year;
  final month = zeroPadding("${dt.month}");
  final day = zeroPadding("${dt.day}");
  final hour = zeroPadding("${dt.hour}");
  final minute = zeroPadding("${dt.minute}");
  final second = zeroPadding("${dt.second}");

  return "$year$month${day}_$hour$minute$second";
}

String toCompactYmdHm(DateTime dt) {
  final year = dt.year;
  final month = zeroPadding("${dt.month}");
  final day = zeroPadding("${dt.day}");
  final hour = zeroPadding("${dt.hour}");
  final minute = zeroPadding("${dt.minute}");

  return "$year$month${day}_$hour$minute";
}

String toSlashYmd(DateTime dt) {
  final year = dt.year;
  final month = zeroPadding("${dt.month}");
  final day = zeroPadding("${dt.day}");

  return "$year/$month/$day";
}

String toColonHms(DateTime dt) {
  final hour = zeroPadding("${dt.hour}");
  final minute = zeroPadding("${dt.minute}");
  final second = zeroPadding("${dt.second}");

  return "$hour:$minute:$second";
}

String toColonHm(DateTime dt) {
  final hour = zeroPadding("${dt.hour}");
  final minute = zeroPadding("${dt.minute}");

  return "$hour:$minute";
}

String zeroPadding(String str) {
  var addZero = "0$str";
  final pos = addZero.length;
  return addZero.substring(pos - 2, pos);
}

