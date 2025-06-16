import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Edit: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 10,
          justifyContent: "center",
          backgroundColor: "lightgray",
          alignItems: "center",
        }}
      >
        <Text>preview</Text>
      </View>
      <View
        style={{
          flex: 8,
          justifyContent: "center",
          backgroundColor: "gray",
          alignItems: "center",
        }}
      >
        <Text>timeline</Text>
      </View>
    </SafeAreaView>
  );
};
