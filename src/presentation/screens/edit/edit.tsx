import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Edit: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 6,
            justifyContent: "center",
            backgroundColor: "lightgray",
            alignItems: "center",
          }}
        >
          <Text>preview</Text>
        </View>
        <View
          style={{
            flex: 4,
            justifyContent: "center",
            backgroundColor: "gray",
            alignItems: "center",
          }}
        >
          <Text>timeline</Text>
        </View>
        <View
          style={{
            height: 64,
            justifyContent: "center",
            backgroundColor: "white",
            alignItems: "center",
          }}
        >
          <Text>bottom menu</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};
