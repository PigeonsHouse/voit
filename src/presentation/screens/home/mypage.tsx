import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const MyPage: React.FC = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333",
      }}
    >
      <Text style={{ color: "white" }}>未実装</Text>
    </SafeAreaView>
  );
};
