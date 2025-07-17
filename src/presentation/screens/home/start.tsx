import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EditData } from "../../../domain/entities";
import { DbEditData } from "../../../domain/repositories";
import { useUseCases } from "../../context/use_case_provider";

type StartProps = {
  navigation: {
    navigate: (screen: string, params: EditData) => void;
  };
};

export const Start: React.FC<StartProps> = ({ navigation }) => {
  const { editDataUseCase } = useUseCases();
  const [editDataList, setEditDataList] = useState<DbEditData[]>([]);

  const handleNewVideo = useCallback(() => {
    editDataUseCase
      ?.createEditData("新しいプロジェクト", { width: 1280, height: 720 })
      .then((editData) => {
        loadEditDataList();
        navigation.navigate("Edit", editData);
      });
  }, [editDataUseCase, navigation]);

  const handleExistVideo = useCallback(
    (id: string) => {
      editDataUseCase?.restore(id).then((editData) => {
        navigation.navigate("Edit", editData);
      });
    },
    [editDataUseCase, navigation],
  );

  const loadEditDataList = useCallback(async () => {
    if (editDataUseCase) {
      const data = await editDataUseCase.getEditDataList();
      setEditDataList(data);
    }
  }, [editDataUseCase]);

  useEffect(() => {
    loadEditDataList();
  }, [loadEditDataList]);

  // データが奇数の場合はダミー(null)を追加して2列を維持
  const dataForView =
    editDataList.length % 2 !== 0 ? [...editDataList, null] : editDataList;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 16,
      }}
      edges={["top", "left", "right"]}
    >
      <Text style={{ fontSize: 32, margin: 12, fontWeight: "bold" }}>
        ぼいっと
      </Text>
      <TouchableOpacity
        onPress={handleNewVideo}
        style={{
          padding: 16,
          backgroundColor: "#35A8E0",
          borderRadius: 12,
          width: "100%",
          height: 72,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>動画を作る</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 8 }}>最近のプロジェクト</Text>
      <FlatList
        style={{ marginTop: 8, width: "100%" }}
        data={dataForView}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) =>
          item !== null ? (
            <View
              style={{
                padding: 12,
                flex: 1,
                margin: 4,
                aspectRatio: 1,
                borderRadius: 4,
                backgroundColor: "#F1F0F0",
                boxShadow: "0px 2px 4px #00000030",
              }}
              key={item.id}
            >
              <TouchableOpacity
                onPress={() => handleExistVideo(item.id)}
                style={{
                  flex: 1,
                  width: "100%",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Text>{item.title}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              key="dummy"
              style={{ padding: 12, flex: 1, margin: 4, aspectRatio: 1 }}
            />
          )
        }
        keyExtractor={(item) => item?.toString() || Math.random().toString()}
      />
    </SafeAreaView>
  );
};
