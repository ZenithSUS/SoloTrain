import SoloTrain from "@/assets/images/SoloTrain.png";
import ThemeText from "@/components/themetext";
import { useSimpleAnimation } from "@/hooks/useSimpleAnimation";
import { getButtonClasses } from "@/utils/get-button-classes";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
} from "react-native";

const Onboarding = () => {
  const [buttonState, setButtonState] = useState("visible");
  const { animate: animateNext, isAnimating } = useSimpleAnimation(250);
  const next = () => {
    if (isAnimating) return;

    // Animate to next screen
    animateNext(() => {
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

      <Pressable
        className={`${getButtonClasses(buttonState, isAnimating)}`}
        onPress={next}
        disabled={isAnimating}
        style={{ width: "100%" }}
      >
        <Text className="text-center text-primtext">
          {isAnimating ? "Loading..." : "Continue"}
        </Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default Onboarding;
