import ThemeText from "@/components/themetext";
import { useOnboardingContext } from "@/context/onboarding";
import { router } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import BouncyCheckBox from "react-native-bouncy-checkbox";

const Goal = () => {
  // Onboarding Context
  const { data, setData } = useOnboardingContext();

  // Local State
  const [isAnimating, setIsAnimating] = useState({
    submitAnimating: false,
    backAnimating: false,
  });

  // Button animated width
  const submitbuttonWidthAnim = useRef(new Animated.Value(1)).current;
  const backbuttonWidthAnim = useRef(new Animated.Value(1)).current;

  const animatedSubmitButtonWidth = submitbuttonWidthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "48%"],
    extrapolate: "clamp",
  });

  const animatedBackButtonWidth = backbuttonWidthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "48%"],
    extrapolate: "clamp",
  });

  // Function to navigate to the next screen
  const submit = () => {
    if (isAnimating.submitAnimating || !data.goal) return;

    setIsAnimating((prev) => ({
      ...prev,
      submitAnimating: true,
    }));

    Animated.timing(submitbuttonWidthAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start(async () => {
      setIsAnimating((prev) => ({
        ...prev,
        submitAnimating: false,
      }));
      submitbuttonWidthAnim.setValue(1);
      console.log(data.goal);
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
      router.push("/(onboarding)/weight");
    });
  };

  // Function to handle goal selection
  const setGoal = useCallback(
    (goal: string, isChecked: boolean) => {
      setData({ ...data, goal: isChecked ? goal : undefined });
    },
    [data, setData],
  );

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
          What's your main goal?
        </Text>

        {/*Description Text */}
        <ThemeText type="subtext" size="sm">
          "Define your quest and trasnform your fate."
        </ThemeText>

        {/*Selection Field */}
        <View
          className={`flex w-full flex-row items-center gap-2 rounded-xl ${data.goal === "Gain Muscle" ? "scale-105 bg-primary shadow-lg shadow-blue-400/40" : "bg-formbg"} p-2 transition-all duration-300 ease-in-out`}
        >
          <BouncyCheckBox
            onPress={(isChecked) => setGoal("Gain Muscle", isChecked)}
            isChecked={data.goal === "Gain Muscle"}
            iconStyle={{ borderColor: "#3AA6F5" }}
            fillColor="#3AA6F5"
          />
          <ThemeText type="title">Gain Muscle</ThemeText>
        </View>

        <View
          className={`flex w-full flex-row items-center gap-2 rounded-xl ${data.goal === "Build Strength" ? "scale-105 bg-primary shadow-lg shadow-blue-400/40" : "bg-formbg"} p-2 transition-all duration-300 ease-in-out`}
        >
          <BouncyCheckBox
            onPress={(isChecked) => setGoal("Build Strength", isChecked)}
            isChecked={data.goal === "Build Strength"}
            iconStyle={{ borderColor: "#3AA6F5" }}
            fillColor="#3AA6F5"
          />
          <ThemeText type="title">Build Strength</ThemeText>
        </View>

        <View
          className={`flex w-full flex-row items-center gap-2 rounded-xl ${data.goal === "Lose Fat" ? "scale-105 bg-primary shadow-lg shadow-blue-400/40" : "bg-formbg"} p-2 transition-all duration-300 ease-in-out`}
        >
          <BouncyCheckBox
            onPress={(isChecked) => setGoal("Lose Fat", isChecked)}
            isChecked={data.goal === "Lose Fat"}
            iconStyle={{ borderColor: "#3AA6F5" }}
            fillColor="#3AA6F5"
          />
          <ThemeText type="title">Lose Fat</ThemeText>
        </View>

        <View
          className={`flex w-full flex-row items-center gap-2 rounded-xl ${data.goal === "Maintain" ? "scale-105 bg-primary shadow-lg shadow-blue-400/40" : "bg-formbg"} p-2 transition-all duration-300 ease-in-out`}
        >
          <BouncyCheckBox
            onPress={(isChecked) => setGoal("Maintain", isChecked)}
            isChecked={data.goal === "Maintain"}
            iconStyle={{ borderColor: "#3AA6F5" }}
            fillColor="#3AA6F5"
          />
          <ThemeText type="title">Maintain</ThemeText>
        </View>

        <View
          className={`flex w-full flex-row items-center gap-2 rounded-xl ${data.goal === "Other" ? "scale-105 bg-primary shadow-lg shadow-blue-400/40" : "bg-formbg"} p-2 transition-all duration-300 ease-in-out`}
        >
          <BouncyCheckBox
            onPress={(isChecked) => setGoal("Other", isChecked)}
            isChecked={data.goal === "Other"}
            iconStyle={{ borderColor: "#3AA6F5" }}
            fillColor="#3AA6F5"
          />
          <ThemeText type="title">Other</ThemeText>
        </View>

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
              width: animatedSubmitButtonWidth,
              overflow: "hidden",
            }}
          >
            <Pressable
              onPress={submit}
              className="rounded-xl bg-primary px-2 py-2 shadow-lg"
              disabled={isAnimating.submitAnimating}
              style={{ minHeight: 40 }}
            >
              <ThemeText type="title">
                {isAnimating.submitAnimating ? " " : "Begin Your Journey"}
              </ThemeText>
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Goal;
