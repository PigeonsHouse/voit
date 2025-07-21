import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome6";
import { EditData } from "../../../domain/entities";
import { DbEditData } from "../../../domain/repositories";
import { useUseCases } from "../../context";

type StartProps = {
  navigation: {
    navigate: (screen: string, params: { editData: EditData }) => void;
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
        navigation.navigate("Edit", { editData });
      });
  }, [editDataUseCase, navigation]);

  const handleExistVideo = useCallback(
    (id: string) => {
      editDataUseCase?.restore(id).then((editData) => {
        navigation.navigate("Edit", { editData });
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
        backgroundColor: "black",
      }}
      edges={["top", "left", "right"]}
    >
      <LinearGradient
        start={{ x: 0.8, y: 2 }}
        end={{ x: 0, y: 0 }}
        colors={["#0095c2ff", "#2cff37ff"]}
        style={{
          width: "100%",
          borderRadius: 12,
        }}
      >
        <TouchableOpacity
          onPress={handleNewVideo}
          style={{
            padding: 16,
            height: 96,
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
            新しいプロジェクト
          </Text>
          <Icon name="square-plus" color="black" size={24} solid />
        </TouchableOpacity>
      </LinearGradient>
      <Text style={{ marginTop: 8, color: "white" }}>最近のプロジェクト</Text>
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
                backgroundColor: "#444",
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
                <Text style={{ color: "white" }}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              key="dummy"
              style={{ padding: 12, flex: 1, margin: 4, aspectRatio: 1 }}
            />
          )
        }
      />
    </SafeAreaView>
  );
};
