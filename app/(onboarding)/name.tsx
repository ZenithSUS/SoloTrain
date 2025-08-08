import ThemeText from "@/components/themetext";
import { useOnboardingContext } from "@/context/onboarding";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const Name = () => {
  const { data, setData } = useOnboardingContext();

  // Local State
  const [localName, setLocalName] = useState(data.name || "");
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonWidthAnim = useRef(new Animated.Value(1)).current;

  const next = async () => {
    if (isAnimating) return;

    // Update context with local value before navigation
    setData({ ...data, name: localName });

    setIsAnimating(true);
    Animated.timing(buttonWidthAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start(async () => {
      setIsAnimating(false);

      buttonWidthAnim.setValue(1);
      router.push("/(onboarding)/age");
    });
  };

  const animatedButtonWidth = buttonWidthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, screenWidth - 40],
    extrapolate: "clamp",
  });

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
      <Animated.View
        style={{
          width: animatedButtonWidth,
          marginTop: 20,
          overflow: "hidden", // Prevents content from spilling out during animation
        }}
      >
        <Pressable
          onPress={next}
          className="w-full rounded-xl bg-primary px-2 py-2 shadow-lg"
          disabled={isAnimating}
          style={{ minHeight: 40 }} // Maintain button height during animation
        >
          <ThemeText type="title">{isAnimating ? " " : "Next"}</ThemeText>
        </Pressable>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default Name;
