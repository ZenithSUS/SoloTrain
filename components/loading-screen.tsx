import SoloTrain from "@/assets/images/SoloTrain.png";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import ThemeText from "./themetext";

export const LoadingScreen = () => {
  return (
    <View className="flex-1 items-center justify-evenly bg-background">
      {/* App Logo */}
      <Image
        source={SoloTrain as ImageSourcePropType}
        style={{ width: 200, height: 200 }}
      />

      {/*Loading Text */}
      <Text
        className="text-2xl font-bold uppercase text-primtext shadow-lg"
        style={{
          textShadowColor: "#3AA6F5",
          textShadowOffset: { width: 0, height: 4 },
          textShadowRadius: 12,
        }}
      >
        Please Wait...
      </Text>

      {/*Description Text */}
      <ThemeText type="subtext" size="sm">
        "Patience is the key to gain a strong body."
      </ThemeText>
    </View>
  );
};
