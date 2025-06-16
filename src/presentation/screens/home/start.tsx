import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type StartProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

export const Start: React.FC<StartProps> = ({ navigation }) => {
  const handleStart = () => {
    navigation.navigate("Edit");
  };
  // データが奇数の場合はダミー(null)を追加して2列を維持
  const rawData = [10, 20, 30, 40, 50, 60, 70, 80, 90, 12, 13];
  const data = rawData.length % 2 !== 0 ? [...rawData, null] : rawData;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 16,
      }}
    >
      <Text style={{ fontSize: 32, margin: 12, fontWeight: "bold" }}>
        ぼいっと
      </Text>
      <TouchableOpacity
        onPress={handleStart}
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
        data={data}
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
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Edit")}
                style={{
                  flex: 1,
                  width: "100%",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Text>プロジェクト {item}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ padding: 12, flex: 1, margin: 4, aspectRatio: 1 }} />
          )
        }
        keyExtractor={(item) => item?.toString() || Math.random().toString()}
      />
    </SafeAreaView>
  );
};
