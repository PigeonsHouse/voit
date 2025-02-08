# ぼいっと
動画編集ソフト ぼいっと

## 手順
### submoduleのセットアップ
voicevox_flutterはpub.devに公開されていないため、git submoduleで取得する。
`git submodule update --init --recursive`

### modelの取得
voicevox_coreの [0.15.0-preview13](https://github.com/VOICEVOX/voicevox_core/releases/download/0.15.0-preview.13) より、modelのzipファイルをダウンロード&解凍する。  

`assets/model`にダウンロードしたmodelを配置する。

```
assets/
L-model/
  L-0.vvm
  L-1.vvm
  L-2.vvm
  L-3.vvm
  ...
```

### open-jtalkの取得
[OpenJTaleの公式サイト](https://open-jtalk.sourceforge.net)からutf-8版をダウンロードする。

`assets/open_jtalk_dic_utf_8`にダウンロードしたmodelを配置する。
```
assets/
L-open_jtalk_dic_utf_8/
  L-char.bin
  L-COPYING
  L-left-id.def
  ...
```

### Android向けの準備
voicevox_flutterのexampleから`libc++_shared.so`をコピーしてくる。
```
cp ./voicevox_flutter/example/android/app/src/main/jniLibs/arm64-v8a/libc++_shared.so ./android/app/src/main/jniLibs/arm64-v8a/libc++_shared.so
```

voicevox_coreの [0.15.0-preview13](https://github.com/VOICEVOX/voicevox_core/releases/download/0.15.0-preview.13) より、Android(arm64)版のzipファイルをダウンロード&解凍する。
`android/app/src/main/jniLibs`の中に、先ほど解凍したフォルダの中の`libvoicevox_core.so`を配置する。

```
android/
L-app/
  L-src/
    L-main/
      L-jniLibs/
        L-arm64-v8a/
          L-libc++_shared.so     ← 追加
          L-libvoicevox_core.so  ← 追加
```

### iOS向けの準備
まだ非対応

### ライブラリのダウンロード
`flutter pub get`

### 起動
`flutter run`
