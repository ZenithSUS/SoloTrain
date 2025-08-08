import SoloTrain from "@/assets/images/SoloTrain.png";
import ThemeText from "@/components/themetext";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const Onboarding = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonWidthAnim = useRef(new Animated.Value(1)).current;

  const animatedButtonWidth = buttonWidthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, screenWidth - 40],
    extrapolate: "clamp",
  });

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    Animated.timing(buttonWidthAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setIsAnimating(false);
      router.push("/(onboarding)/name");
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center justify-evenly bg-background p-[20px]"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {/* App Logo */}
      <Image
        source={SoloTrain as ImageSourcePropType}
        style={{ width: 200, height: 200 }}
      />

      {/*Welcome Text */}
      <Text
        className="text-2xl font-bold text-primtext"
        style={{
          textShadowColor: "#3AA6F5",
          textShadowOffset: { width: 0, height: 4 },
          textShadowRadius: 12,
        }}
      >
        "Welcome to SoloTrain!"
      </Text>

      {/*Description Text */}
      <ThemeText type="subtext" size="sm">
        "Unlock Your Potential, One Exercise at a Time."
      </ThemeText>

      {/*Continue Button */}
      <Animated.View style={{ width: animatedButtonWidth, overflow: "hidden" }}>
        <Pressable
          className="mt-4 w-full rounded-md bg-primary px-2 py-2"
          onPress={next}
          disabled={isAnimating}
        >
          <Text className="text-center text-primtext">
            {isAnimating ? " " : "Continue"}
          </Text>
        </Pressable>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default Onboarding;
