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

const Age = () => {
  // Onboarding Context
  const { data, setData } = useOnboardingContext();

  // Animation hooks for both buttons
  const { isAnimating: isNextAnimating, animate: animateNext } =
    useSimpleAnimation(250);
  const { isAnimating: isBackAnimating, animate: animateBack } =
    useSimpleAnimation(250);

  // Local State
  const [localAge, setLocalAge] = useState(
    data.age !== undefined ? data.age.toString() : "",
  );
  const [buttonStates, setButtonStates] = useState({
    backButton: "visible",
    nextButton: "visible",
  });

  // Function to navigate to the next screen
  const next = () => {
    if (isNextAnimating || !localAge) return;

    // Update context with local value before navigation
    const numericAge = localAge === "" ? undefined : Number(localAge);
    setData({
      ...data,
      age: numericAge,
    });

    setButtonStates((prev) => ({ ...prev, nextButton: "hiding" }));

    animateNext(() => {
      setButtonStates((prev) => ({ ...prev, nextButton: "visible" }));
      router.push("/(onboarding)/height");
    });
  };

  const back = () => {
    if (isBackAnimating) return;

    const numericAge = localAge === "" ? undefined : Number(localAge);
    setData({
      ...data,
      age: numericAge,
    });

    setButtonStates((prev) => ({ ...prev, backButton: "hiding" }));

    animateBack(() => {
      setButtonStates((prev) => ({ ...prev, backButton: "visible" }));
      router.push("/(onboarding)/name");
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
        className="text-2xl font-bold uppercase text-primtext shadow-lg"
        style={{
          textShadowColor: "#3AA6F5",
          textShadowOffset: { width: 0, height: 4 },
          textShadowRadius: 12,
        }}
      >
        How old are you?
      </Text>

      {/*Description Text */}
      <ThemeText type="subtext" size="sm">
        "Age isn't a barrier on the path to strength"
      </ThemeText>

      {/*Input Field */}
      <TextInput
        placeholder="Enter your age"
        placeholderTextColor="gray"
        keyboardType="numeric"
        maxLength={3}
        value={localAge}
        className="w-full rounded-xl bg-white p-4 text-black shadow-lg shadow-blue-400/40"
        onChangeText={(text) => {
          const numericText = text.replace(/[^0-9]/g, "");
          setLocalAge(numericText);
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
            disabled={isNextAnimating || !localAge}
            style={{ opacity: localAge && !isNextAnimating ? 1 : 0.5 }}
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

export default Age;
