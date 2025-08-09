import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

// Custom Checkbox Component
export const CustomCheckbox = ({
  isChecked = false,
  size = 24,
  color = "#3AA6F5",
}) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderWidth: 2,
        borderColor: color,
        borderRadius: size / 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isChecked ? color : "transparent",
      }}
    >
      {isChecked && (
        <Ionicons name="checkmark" size={size * 0.7} color="white" />
      )}
    </View>
  );
};
