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

const Name = () => {
  const { data, setData } = useOnboardingContext();
  const { isAnimating, animate } = useSimpleAnimation(250);

  // Local State
  const [localName, setLocalName] = useState(data.name || "");
  const [buttonState, setButtonState] = useState("visible");

  const next = async () => {
    if (isAnimating || !localName) return;

    // Update context with local value before navigation
    setData({ ...data, name: localName });

    setButtonState("hiding");

    animate(() => {
      setButtonState("visible");
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
        className="text-2xl font-bold uppercase text-primtext shadow-lg"
        style={{
          textShadowColor: "#3AA6F5",
          textShadowOffset: { width: 0, height: 4 },
          textShadowRadius: 12,
        }}
      >
        What's your name?
      </Text>

      {/*Description Text */}
      <ThemeText type="subtext" size="sm">
        "Even a strongest hunter started as a mere rank"
      </ThemeText>

      {/*Input Field */}
      <TextInput
        placeholder="Enter Your Full Name"
        placeholderTextColor="gray"
        className="w-full rounded-xl bg-white p-4 text-black shadow-lg shadow-blue-400/40"
        value={localName}
        onChangeText={setLocalName}
      />

      {/*Next Button */}
      <View className="mt-5 w-full max-w-sm">
        <Pressable
          className={getButtonClasses(buttonState, isAnimating)}
          onPress={next}
          disabled={isAnimating || !localName}
          style={{ opacity: isAnimating || !localName ? 0.5 : 1 }}
        >
          <View className="items-center">
            <ThemeText type="title">
              {isAnimating ? "Saving..." : "Next"}
            </ThemeText>
          </View>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Name;
