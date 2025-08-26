import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useRoute } from "@react-navigation/native";
import { EditData } from "../../../domain/entities";
import { BottomMenu, TimelineEditor, VideoPreview } from "../../components";

export const Edit: React.FC = () => {
  const {
    params: { editData },
  } = useRoute<RouteProp<{ params: { editData: EditData } }>>();

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            height: 60,
            justifyContent: "center",
            backgroundColor: "#222",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>
            {editData.title}
          </Text>
        </View>
        <VideoPreview editData={editData} />
        <TimelineEditor />
        <BottomMenu />
      </SafeAreaView>
    </View>
  );
};
