import { View } from "react-native";
import { EditData } from "../../../domain/entities";

const getAspectRatio = (resolution: { width: number; height: number }) => {
  return resolution.width / resolution.height;
};

type VideoPreviewProps = {
  editData: EditData;
};

export const VideoPreview: React.FC<VideoPreviewProps> = ({ editData }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#222",
        alignItems: "center",
      }}
    >
      <View
        style={{
          aspectRatio: getAspectRatio(editData.resolution),
          backgroundColor: "black",
          ...(getAspectRatio(editData.resolution) > 1
            ? { width: "100%" }
            : { height: "100%" }),
        }}
      ></View>
    </View>
  );
};
