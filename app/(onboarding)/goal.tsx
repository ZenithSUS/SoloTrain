import { CustomCheckbox } from "@/components/custom-checkbox";
import ThemeText from "@/components/themetext";
import { useOnboardingContext } from "@/context/onboarding";
import { useSimpleAnimation } from "@/hooks/useSimpleAnimation";
import { useCreateUser } from "@/hooks/useUser";
import { getSecure } from "@/services/secure-store";
import { User } from "@/types/user";
import { getButtonClasses } from "@/utils/get-button-classes";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";

const Goal = () => {
  // Onboarding Context
  const { data, setData } = useOnboardingContext();

  // Animation hooks for both buttons
  const { isAnimating: isSubmitAnimating, animate: animateSubmit } =
    useSimpleAnimation(250);
  const { isAnimating: isBackAnimating, animate: animateBack } =
    useSimpleAnimation(250);

  // Hooks
  const { mutateAsync: createUserInfo, isPending } = useCreateUser();

  // Local State
  const [apiError, setApiError] = useState<string | null>(null);
  const [localGoal, setLocalGoal] = useState(data.goal || "");
  const [buttonStates, setButtonStates] = useState({
    backButton: "visible",
    submitButton: "visible",
  });

  // Function to navigate to the next screen
  const submit = async () => {
    try {
      if (isSubmitAnimating || !localGoal || !data) return;
      setApiError("");
      setData({ ...data, goal: localGoal });

      setButtonStates((prev) => ({ ...prev, submitButton: "hiding" }));

      const finalData: User = {
        accountId: (await getSecure("id")) || "",
        fullName: data.name || "",
        age: data.age || 0,
        height_cm: data.height || 0,
        weight_kg: data.weight || 0,
        goal: localGoal,
      };

      await createUserInfo(finalData);
    } catch (error) {
      console.error("Unexpected error in submit:", error);
      setApiError("Unexpected error. Please try again.");
    } finally {
      animateSubmit(() => {
        setButtonStates((prev) => ({ ...prev, submitButton: "visible" }));
      });
    }
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
        {`"Define your quest and transform your fate."`}
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

      {/* Error Text */}
      {apiError && (
        <View className="w-full">
          <Text className="text-center text-error">{apiError}</Text>
        </View>
      )}

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
            disabled={isSubmitAnimating || !localGoal || isPending}
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
