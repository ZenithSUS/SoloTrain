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

const Weight = () => {
  // Onboarding Context
  const { data, setData } = useOnboardingContext();

  // Local State
  const [buttonStates, setButtonStates] = useState({
    backButton: "visible",
    nextButton: "visible",
  });
  const [localWeight, setLocalWeight] = useState(
    data.weight !== undefined ? String(data.weight) : "",
  );
  // Animation hooks for both buttons
  const { animate: animateNext, isAnimating: isNextAnimating } =
    useSimpleAnimation(250);
  const { animate: animateBack, isAnimating: isBackAnimating } =
    useSimpleAnimation(250);

  // Function to navigate to the next screen
  const next = () => {
    if (isNextAnimating || !localWeight) return;

    // Update context with local value before navigation
    const numericWeight = localWeight === "" ? undefined : Number(localWeight);
    setData({ ...data, weight: numericWeight });

    // Animate to next screen
    animateNext(() => {
      setButtonStates((prev) => ({ ...prev, nextButton: "visible" }));
      router.push("/(onboarding)/goal");
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
        How much do you weight? (in kg)
      </Text>

      {/*Description Text */}
      <ThemeText type="subtext" size="sm">
        "Every pound is the step in your journey to power"
      </ThemeText>

      {/*Input Field */}
      <TextInput
        placeholder="Enter your weight (in kg)"
        placeholderTextColor="gray"
        keyboardType="numeric"
        maxLength={3}
        value={localWeight}
        className="w-full rounded-xl bg-white p-4 text-black shadow-lg shadow-blue-400/40"
        onChangeText={(text) => {
          const numericText = text.replace(/[^0-9]/g, "");
          setLocalWeight(numericText);
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
            disabled={isNextAnimating || !localWeight}
            style={{ opacity: localWeight && !isNextAnimating ? 1 : 0.5 }}
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

export default Weight;
