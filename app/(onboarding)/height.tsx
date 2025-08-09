import ThemeText from "@/components/themetext";
import { useOnboardingContext } from "@/context/onboarding";
import { useSimpleAnimation } from "@/hooks/useSimpleAnimation";
import { getButtonClasses } from "@/utils/get-button-classes";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

const Height = () => {
  // Onboarding Context
  const { data, setData } = useOnboardingContext();

  // Hooks
  const { animate: animateNext, isAnimating: isNextAnimating } =
    useSimpleAnimation(250);
  const { animate: animateBack, isAnimating: isBackAnimating } =
    useSimpleAnimation(250);

  // Local State
  const [localHeight, setLocalHeight] = useState(
    data.height !== undefined ? String(data.height) : "",
  );
  const [buttonStates, setButtonStates] = useState({
    backButton: "visible",
    nextButton: "visible",
  });

  const next = () => {
    if (isNextAnimating || !localHeight) return;

    // Update context with local value before navigation
    const numericHeight = localHeight === "" ? undefined : Number(localHeight);
    setData({ ...data, height: numericHeight });

    setButtonStates((prev) => ({ ...prev, nextButton: "hiding" }));

    animateNext(() => {
      setButtonStates((prev) => ({ ...prev, nextButton: "visible" }));
      router.push("/(onboarding)/weight");
    });
  };

  const back = () => {
    if (isBackAnimating) return;

    setButtonStates((prev) => ({ ...prev, backButton: "hiding" }));

    animateBack(() => {
      setButtonStates((prev) => ({ ...prev, backButton: "visible" }));
      router.push("/(onboarding)/age");
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center justify-center gap-4 bg-background p-[20px]"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {/*Title Text */}
      <Text
        className="text-center text-2xl font-bold uppercase text-primtext shadow-lg"
        style={{
          textShadowColor: "#3AA6F5",
          textShadowOffset: { width: 0, height: 4 },
          textShadowRadius: 12,
        }}
      >
        How tall are you? (in cm)
      </Text>

      {/*Description Text */}
      <ThemeText type="subtext" size="sm">
        "Height is just a stat. You're the one in control."
      </ThemeText>

      {/*Input Field */}
      <TextInput
        placeholder="Enter your height (e.g., 180)"
        placeholderTextColor="gray"
        keyboardType="numeric"
        maxLength={3}
        value={localHeight}
        className="w-full rounded-xl bg-white p-4 text-black shadow-lg shadow-blue-400/40"
        onChangeText={(text) => {
          const numericText = text.replace(/[^0-9]/g, "");
          setLocalHeight(numericText);
        }}
      />

      {/*Navigation Buttons */}
      <View className="mt-2 w-full flex-row justify-between gap-4">
        <View className="flex-1">
          <Pressable
            className={getButtonClasses(
              buttonStates.backButton,
              isBackAnimating,
            )}
            onPress={back}
            disabled={isBackAnimating}
          >
            <View className="items-center">
              <ThemeText type="title">
                {isBackAnimating ? "Loading..." : "Back"}
              </ThemeText>
            </View>
          </Pressable>
        </View>

        <View className="flex-1">
          <Pressable
            className={getButtonClasses(
              buttonStates.nextButton,
              isNextAnimating,
            )}
            onPress={next}
            disabled={isNextAnimating || !localHeight}
            style={{ opacity: localHeight && !isNextAnimating ? 1 : 0.5 }}
          >
            <View className="items-center">
              <ThemeText type="title">
                {isNextAnimating ? "Saving..." : "Next"}
              </ThemeText>
            </View>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Height;
