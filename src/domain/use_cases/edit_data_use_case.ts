import { Offset, Size } from "../common";
import { editDataConstants } from "../constants";
import {
  AudioObject,
  EditData,
  ImageObject,
  isViewableObject,
  SceneData,
  ShapeObject,
  TextObject,
  TimelineObject,
  VideoObject,
  ViewableObject,
} from "../entities";
import { EditDataRepository } from "../repositories";
import { MediaService } from "../services";

export class EditDataUseCase {
  private repository: EditDataRepository;

  private mediaService: MediaService;

  constructor(repository: EditDataRepository, mediaService: MediaService) {
    this.repository = repository;
    this.mediaService = mediaService;
  }

  async getEditDataList(): Promise<object[]> {
    return await this.repository.getEditDataList();
  }

  async createEditData(title: string, resolution: Size): Promise<EditData> {
    const data = new EditData(title, resolution);
    await this.repository.saveEditData(data);
    return data;
  }

  // シーンを追加する
  async addScene(data: EditData): Promise<void> {
    data.scenes.push(new SceneData());
    await this.repository.saveEditData(data);
  }

  // シーンを削除する
  async removeScene(data: EditData, sceneId: string): Promise<void> {
    data.scenes = data.scenes.filter((scene) => scene.id !== sceneId);
    await this.repository.saveEditData(data);
  }

  // カメラロール・フォルダから素材を追加
  async importObject(
    data: EditData,
    sceneId: string,
    type: "video" | "image" | "audio" | "text" | "shape",
    baseString: string,
    startTime: number,
  ): Promise<string | undefined> {
    // TODO: 各種パラメータ取得失敗時などで追加に失敗したケースを考える
    let newObject: TimelineObject | undefined;
    for (const scene of data.scenes) {
      if (scene.id !== sceneId) continue;
      if (type === "video") {
        const mediaDuration = await this.mediaService.getDuration(baseString);
        // layerとsizeは仮の値
        const layerNum = 0;
        const size = { width: 100, height: 100 };
        newObject = VideoObject.create(
          mediaDuration!,
          layerNum,
          startTime,
          baseString,
          size,
        );
        scene.objects.push(newObject);
      } else if (type === "image") {
        const size = await this.mediaService.getImageSize(baseString);
        if (size == null) {
          // TODO: エラー処理
          return;
        }
        const layerNum = 0;
        newObject = ImageObject.create(layerNum, startTime, baseString, size);
        scene.objects.push(newObject);
      } else if (type === "audio") {
        const mediaDuration = await this.mediaService.getDuration(baseString);
        const layerNum = 0;
        newObject = AudioObject.create(
          mediaDuration!,
          layerNum,
          startTime,
          baseString,
        );
        scene.objects.push(newObject);
      } else if (type === "text") {
        const layerNum = 0;
        newObject = TextObject.create(layerNum, startTime, baseString);
        scene.objects.push(newObject);
      } else if (type === "shape") {
        const layerNum = 0;
        newObject = ShapeObject.create(layerNum, startTime);
        scene.objects.push(newObject);
      }
    }
    await this.repository.saveEditData(data);
    return newObject?.id;
  }

  searchTimelineObject(data: EditData, id: string): TimelineObject | null {
    for (const scene of data.scenes) {
      for (const object of scene.objects) {
        if (object.id === id) {
          return object;
        }
      }
    }
    return null;
  }

  searchViewableObject(data: EditData, id: string): ViewableObject | null {
    for (const scene of data.scenes) {
      for (const object of scene.objects) {
        if (object.id === id) {
          if (isViewableObject(object)) {
            return object;
          } else {
            return null;
          }
        }
      }
    }
    return null;
  }

  // オブジェクトの画面上の座標を移動する
  moveObjectPosition(id: number, position: Offset) {}

  // オブジェクトの開始位置を変更する
  async addObjectStartTimeDelta(
    data: EditData,
    id: string,
    startTimeDelta: number,
  ): Promise<EditData | null> {
    const targetObj = this.searchTimelineObject(data, id);
    if (targetObj == null) {
      // TODO: エラー処理
      return null;
    }
    // TODO: レイヤーの概念作ったら、他のオブジェクトと被ってないかチェックが必要
    if (
      targetObj.duration <= editDataConstants.minimumDuration &&
      startTimeDelta > 0
    ) {
      return null;
    }
    targetObj.startTime += startTimeDelta;
    if (targetObj.startTime < 0) {
      const overNegativeDelta = targetObj.startTime;
      targetObj.startTime = 0;
      targetObj.duration += overNegativeDelta;
    }
    targetObj.duration -= startTimeDelta;
    if (targetObj.duration <= editDataConstants.minimumDuration) {
      targetObj.duration = editDataConstants.minimumDuration;
    }
    await this.save(data);
    return data;
  }

  // オブジェクトの終了位置を変更する
  async changeObjectEndTimeDelta(
    data: EditData,
    id: string,
    endTimeDelta: number,
  ): Promise<EditData | null> {
    const targetObj = this.searchTimelineObject(data, id);
    if (targetObj == null) {
      // TODO: エラー処理
      return null;
    }
    // TODO: レイヤーの概念作ったら、他のオブジェクトと被ってないかチェックが必要
    // min(newDuration, originalDuration); みたいな
    targetObj.duration += endTimeDelta;
    // TODO: ここで、動画や音声の場合は素材のdurationを超過してないかチェック
    if (targetObj.duration <= editDataConstants.minimumDuration) {
      targetObj.duration = editDataConstants.minimumDuration;
    }
    await this.save(data);
    return data;
  }

  // プレビューできるオブジェクトの表示位置を変更する
  async changeViewableObjectPosition(
    data: EditData,
    id: string,
    positionDelta: Offset,
  ): Promise<EditData | null> {
    const targetObj = this.searchViewableObject(data, id);
    if (targetObj == null) {
      // TODO: エラー処理
      return null;
    }
    targetObj.position = {
      x: targetObj.position.x + positionDelta.x,
      y: targetObj.position.y + positionDelta.y,
    };
    await this.save(data);
    return data;
  }

  // プレビューできるオブジェクトの回転角を変更する
  async changeViewableObjectAngle(
    data: EditData,
    id: string,
    angleDelta: number,
  ): Promise<EditData | null> {
    const targetObj = this.searchViewableObject(data, id);
    if (targetObj == null) {
      // TODO: エラー処理
      return null;
    }
    targetObj.angle += angleDelta;
    await this.save(data);
    return data;
  }

  // プレビューできるオブジェクトの拡大率を変更する
  async changeViewableObjectScale(
    data: EditData,
    id: string,
    scaleDelta: number,
  ): Promise<EditData | null> {
    const targetObj = this.searchViewableObject(data, id);
    if (targetObj == null) {
      // TODO: エラー処理
      return null;
    }
    targetObj.scale += scaleDelta;
    await this.save(data);
    return data;
  }

  // オブジェクトのパラメータ(エフェクト)を変更する
  changeObjectParameter(id: number, parameter: number): void {
    // これがエフェクトの数だけ生える気がする。実装大量に必要そう。
  }

  async updateTitle(data: EditData, title: string): Promise<EditData | null> {
    data.title = title;
    await this.save(data);
    return data;
  }

  async insertObjectWithIndex(
    data: EditData,
    sceneId: number,
    oldIndex: number,
    newIndex: number,
  ): Promise<EditData | null> {
    const objects = data.scenes[sceneId].objects;
    if (oldIndex < newIndex) {
      newIndex -= 1;
    }
    const object = objects.splice(oldIndex, 1)[0];
    objects.splice(newIndex, 0, object);
    data.scenes[sceneId].objects = objects;
    await this.save(data);
    return data;
  }

  // 動画を出力する
  async exportVideo(data: EditData): Promise<boolean> {
    return this.mediaService.convertVideo(data);
  }

  // 編集データを保存する
  async save(data: EditData): Promise<void> {
    await this.repository.saveEditData(data);
  }

  // 編集データを開く
  async restore(id: string): Promise<EditData> {
    return this.repository.restoreEditData(id);
  }
}
