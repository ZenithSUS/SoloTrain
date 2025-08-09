import ThemeText from "@/components/themetext";
import { useOnboardingContext } from "@/context/onboarding";
import { getButtonClasses } from "@/utils/get-button-classes";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";

// Your original animation hook (this is not causing the warning)
function useSimpleAnimation(duration = 300) {
  const [isAnimating, setIsAnimating] = useState(false);

  const animate = (callback: () => void) => {
    setIsAnimating(true);
    setTimeout(() => {
      callback();
      setIsAnimating(false);
    }, duration);
  };

  return { isAnimating, animate };
}

// Custom Checkbox Component
const CustomCheckbox = ({
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

const Goal = () => {
  // Onboarding Context
  const { data, setData } = useOnboardingContext();

  // Animation hooks for both buttons
  const { isAnimating: isSubmitAnimating, animate: animateSubmit } =
    useSimpleAnimation(250);
  const { isAnimating: isBackAnimating, animate: animateBack } =
    useSimpleAnimation(250);

  // Local State
  const [localGoal, setLocalGoal] = useState(data.goal || "");
  const [buttonStates, setButtonStates] = useState({
    backButton: "visible",
    submitButton: "visible",
  });

  // Function to navigate to the next screen
  const submit = () => {
    if (isSubmitAnimating || !localGoal) return;

    // Update context data with selected goal
    setData({ ...data, goal: localGoal });

    setButtonStates((prev) => ({ ...prev, submitButton: "hiding" }));

    animateSubmit(() => {
      setButtonStates((prev) => ({ ...prev, submitButton: "visible" }));
      console.log({ ...data, goal: localGoal });
      // Add your navigation logic here
      // router.push("/(onboarding)/next-screen");
    });
  };

  const back = () => {
    if (isBackAnimating) return;

    setButtonStates((prev) => ({ ...prev, backButton: "hiding" }));

    animateBack(() => {
      setButtonStates((prev) => ({ ...prev, backButton: "visible" }));
      router.push("/(onboarding)/weight");
    });
  };

  const setGoal = useCallback((goal: string) => {
    setLocalGoal(goal);
  }, []);

  const getContainerStyle = (goalType: string) => {
    const isSelected = localGoal === goalType;
    return {
      backgroundColor: isSelected ? "#5A31D4" : "#1A1A1A",
      transform: [{ scale: isSelected ? 1.05 : 1 }],
      shadowColor: isSelected ? "#3AA6F5" : "transparent",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isSelected ? 0.4 : 0,
      shadowRadius: isSelected ? 12 : 0,
      elevation: isSelected ? 8 : 0,
    };
  };

  const goalOptions = [
    "Gain Muscle",
    "Build Strength",
    "Lose Fat",
    "Maintain",
    "Other",
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center justify-center gap-4 bg-background p-[20px]"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {/* Title Text */}
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

      {/* Description Text */}
      <ThemeText type="subtext" size="sm">
        "Define your quest and transform your fate."
      </ThemeText>

      {/* Goal Selection Options */}
      {goalOptions.map((goal) => (
        <Pressable
          key={goal}
          className="flex w-full flex-row items-center gap-2 rounded-xl p-2"
          style={getContainerStyle(goal)}
          onPress={() => setGoal(goal)}
        >
          <CustomCheckbox isChecked={localGoal === goal} />
          <ThemeText type="title">{goal}</ThemeText>
        </Pressable>
      ))}

      {/* Navigation Buttons */}
      <View className="mt-2 w-full flex-row items-center justify-between gap-4">
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
              buttonStates.submitButton,
              isSubmitAnimating,
            )}
            onPress={submit}
            disabled={isSubmitAnimating || !localGoal}
            style={{ backgroundColor: localGoal ? "#5A31D4" : "#1A1A1A" }}
          >
            <View className="items-center">
              <ThemeText type="title">
                {isSubmitAnimating ? "Creating..." : "Begin Your Journey"}
              </ThemeText>
            </View>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Goal;
