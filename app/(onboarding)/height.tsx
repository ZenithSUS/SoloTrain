import ThemeText from "@/components/themetext";
import { useOnboardingContext } from "@/context/onboarding";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
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

  // Local State
  const [localHeight, setLocalHeight] = useState(
    data.height !== undefined ? String(data.height) : "",
  );
  const [isAnimating, setIsAnimating] = useState({
    nextAnimating: false,
    backAnimating: false,
  });

  // Button animated width
  const backbuttonWidthAnim = useRef(new Animated.Value(1)).current;
  const nextbuttonWidthAnim = useRef(new Animated.Value(1)).current;

  const animatedBackButtonWidth = backbuttonWidthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "48%"],
    extrapolate: "clamp",
  });

  const animatedNextButtonWidth = nextbuttonWidthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "48%"],
    extrapolate: "clamp",
  });

  // Function to navigate to the next screen
  const next = () => {
    if (isAnimating.nextAnimating) return;

    // Update context with local value before navigation
    const numericHeight = localHeight === "" ? undefined : Number(localHeight);
    setData({ ...data, height: numericHeight });

    setIsAnimating((prev) => ({
      ...prev,
      nextAnimating: true,
    }));

    Animated.timing(nextbuttonWidthAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start(async () => {
      setIsAnimating((prev) => ({
        ...prev,
        nextAnimating: false,
      }));
      nextbuttonWidthAnim.setValue(1);
      router.push("/(onboarding)/weight");
    });
  };

  const back = () => {
    if (isAnimating.backAnimating) return;

    setIsAnimating((prev) => ({
      ...prev,
      backAnimating: true,
    }));

    Animated.timing(backbuttonWidthAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start(async () => {
      setIsAnimating((prev) => ({
        ...prev,
        backAnimating: false,
      }));

      backbuttonWidthAnim.setValue(1);
      router.push("/(onboarding)/age");
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center justify-evenly bg-background p-[20px]"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex items-center gap-4">
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
        <View className="mt-2 w-full flex-row justify-between">
          <Animated.View
            style={{
              width: animatedBackButtonWidth,
              overflow: "hidden",
            }}
          >
            <Pressable
              onPress={back}
              className="rounded-xl bg-primary px-2 py-2 shadow-lg"
              disabled={isAnimating.backAnimating}
              style={{ minHeight: 40 }}
            >
              <ThemeText type="title">
                {isAnimating.backAnimating ? " " : "Back"}
              </ThemeText>
            </Pressable>
          </Animated.View>

          <Animated.View
            style={{
              width: animatedNextButtonWidth,
              overflow: "hidden",
            }}
          >
            <Pressable
              onPress={next}
              className="rounded-xl bg-primary px-2 py-2 shadow-lg"
              disabled={isAnimating.nextAnimating}
              style={{ minHeight: 40 }}
            >
              <ThemeText type="title">
                {isAnimating.nextAnimating ? " " : "Next"}
              </ThemeText>
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Height;
