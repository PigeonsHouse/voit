import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

type IconButtonProps = {
  iconName: string;
  label: string;
  onPress: () => void;
};

const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  label,
  onPress,
}) => {
  return (
    <View
      style={{
        padding: 10,
        width: 80,
      }}
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={onPress}
      >
        <Icon name={iconName} size={24} color="white" />
        <Text style={{ color: "white", fontSize: 12 }}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const bottomMenuItem = [
  { iconName: "photo-library", label: "メディア" },
  { iconName: "abc", label: "字幕" },
  { iconName: "mic", label: "VOICEVOX" },
  { iconName: "copyright", label: "コモンズ" },
];

export const BottomMenu: React.FC = () => {
  return (
    <View
      style={{
        height: 60,
        flexDirection: "row",
        backgroundColor: "#333",
        alignItems: "center",
        justifyContent: "space-around",
        zIndex: 1,
      }}
    >
      {bottomMenuItem.map((item) => (
        <IconButton
          key={item.iconName}
          iconName={item.iconName}
          label={item.label}
          onPress={() => {}}
        />
      ))}
    </View>
  );
};
