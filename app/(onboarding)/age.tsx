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

const Age = () => {
  // Onboarding Context
  const { data, setData } = useOnboardingContext();

  // Local State
  const [localAge, setLocalAge] = useState(
    data.age !== undefined ? data.age.toString() : "",
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
    outputRange: ["0%", "48%"], // Use percentage for responsive width
    extrapolate: "clamp",
  });

  const animatedNextButtonWidth = nextbuttonWidthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "48%"], // Use percentage for responsive width
    extrapolate: "clamp",
  });

  // Function to navigate to the next screen
  const next = () => {
    if (isAnimating.nextAnimating) return;

    // Update context with local value before navigation
    const numericAge = localAge === "" ? undefined : Number(localAge);
    setData({
      ...data,
      age: numericAge,
    });

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
      // Reset animation value for next time
      nextbuttonWidthAnim.setValue(1);
      router.push("/(onboarding)/height");
    });
  };

  const back = () => {
    if (isAnimating.backAnimating) return;

    // Update context with local value before navigation
    const numericAge = localAge === "" ? undefined : Number(localAge);
    setData({
      ...data,
      age: numericAge,
    });

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
      // Reset animation value for next time
      backbuttonWidthAnim.setValue(1);
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
      <View className="mt-2 w-full flex-row justify-between">
        <Animated.View
          style={{
            width: animatedBackButtonWidth,
            overflow: "hidden", // Prevents content from spilling out during animation
          }}
        >
          <Pressable
            onPress={back}
            className="rounded-xl bg-primary px-2 py-2 shadow-lg"
            disabled={isAnimating.backAnimating}
            style={{ minHeight: 40 }} // Maintain button height during animation
          >
            <ThemeText type="title">
              {isAnimating.backAnimating ? " " : "Back"}
            </ThemeText>
          </Pressable>
        </Animated.View>

        <Animated.View
          style={{
            width: animatedNextButtonWidth,
            overflow: "hidden", // Prevents content from spilling out during animation
          }}
        >
          <Pressable
            onPress={next}
            className="rounded-xl bg-primary px-2 py-2 shadow-lg"
            disabled={isAnimating.nextAnimating}
            style={{ minHeight: 40 }} // Maintain button height during animation
          >
            <ThemeText type="title">
              {isAnimating.nextAnimating ? " " : "Next"}
            </ThemeText>
          </Pressable>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Age;
