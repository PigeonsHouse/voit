import { Text, View } from "react-native";

export const TimelineEditor = () => {
  return (
    <>
      <View
        style={{
          height: 36,
          justifyContent: "center",
          backgroundColor: "#333",
          paddingHorizontal: 8,
        }}
      >
        <Text style={{ color: "white" }}>0:00/0:31</Text>
      </View>
      <View
        style={{
          height: 280,
          justifyContent: "center",
          backgroundColor: "#333",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>timeline</Text>
      </View>
    </>
  );
};
