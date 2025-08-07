import SoloTrain from "@/assets/images/SoloTrain.png";
import ProgressAnimation from "@/components/progress-animation";
import ThemeText from "@/components/themetext";
import { playBGM, prepareBGM, stopBGM } from "@/hooks/useBGM";
import { router } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export default function IndexScreen() {
  const [isWelcomePressed, setIsWelcomePressed] = useState(false);
  const [isAnimating, setIsAnimating] = useState({
    isAnimatingWelcome: false,
    isAnimatingSoloTrain: false,
  });
  const buttonWidthAnim = useRef(new Animated.Value(1)).current;
  const buttonWidthAnim2 = useRef(new Animated.Value(1)).current;

  // Function to open SoloTrain app
  const openSoloTrain = useCallback(async () => {
    if (isWelcomePressed || isAnimating.isAnimatingWelcome) return;

    setIsAnimating((prev) => ({
      ...prev,
      isAnimatingWelcome: true,
    }));
    Animated.timing(buttonWidthAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(async () => {
      await prepareBGM(require("@/assets/sounds/SymphonicSuite-Lv.8.mp3"));
      await playBGM();
      setIsWelcomePressed(true);
      setIsAnimating((prev) => ({
        ...prev,
        isAnimatingWelcome: false,
      }));
    });
  }, [setIsWelcomePressed, prepareBGM, playBGM, isWelcomePressed, isAnimating]);

  const navigateToRegister = async () => {
    if (isAnimating.isAnimatingSoloTrain) return; // Prevent multiple presses during animation

    setIsAnimating((prev) => ({
      ...prev,
      isAnimatingSoloTrain: true,
    }));

    // Animate button width from full to 0
    Animated.timing(buttonWidthAnim2, {
      toValue: 0,
      duration: 500, // Animation duration in milliseconds
      useNativeDriver: false, // Width animation requires native driver to be false
    }).start(async () => {
      // This callback runs after animation completes
      await stopBGM();
      router.push("/(auth)/register");
    });
  };

  const navigateToLogin = async () => {
    await stopBGM();
    router.push("/(auth)/login");
  };

  // Calculate button width based on animation value
  const animatedButtonWidth = buttonWidthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, screenWidth - 40], // 40px for padding (20px each side)
    extrapolate: "clamp",
  });

  const animatedButtonWidth2 = buttonWidthAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, screenWidth - 40], // 40px for padding (20px each side)
    extrapolate: "clamp",
  });

  if (!isWelcomePressed) {
    return (
      <View className="flex-1 items-center justify-between gap-2 bg-background p-[20px]">
        <View className="flex items-center gap-3">
          <Image
            source={SoloTrain as ImageSourcePropType}
            style={{ width: 200, height: 200 }}
          />
          <ThemeText type="subtext" size="lg">
            Welcome to your awakening
          </ThemeText>
        </View>

        {/* 🧊 NEW CATCHY TEXT */}
        <ThemeText type="primtext" size="xl">
          "Only those who step forward can level up."
        </ThemeText>

        <Animated.View
          style={{ width: animatedButtonWidth, overflow: "hidden" }}
        >
          <Pressable
            className="rounded bg-primary px-4 py-3"
            onPress={openSoloTrain}
            disabled={isAnimating.isAnimatingWelcome}
          >
            <ThemeText type="primtext">
              {isAnimating.isAnimatingWelcome
                ? " "
                : "Tap to Begin Your Solo Training"}
            </ThemeText>
          </Pressable>
        </Animated.View>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-between gap-2 bg-background p-[20px]">
      <View className="flex items-center gap-3">
        <Image
          source={SoloTrain as ImageSourcePropType}
          style={{ width: 200, height: 200 }}
        />
        <ThemeText type="subtext" size="lg">
          "Train like a hunter"
        </ThemeText>
      </View>

      <View className="flex items-center gap-2">
        <ProgressAnimation />
        <Text className="mt-2 font-semibold text-primtext">
          "Your <Text className="font-bold text-primary">Path</Text> Begins!"
        </Text>
      </View>

      <Animated.View
        style={{
          width: animatedButtonWidth2,
          overflow: "hidden",
        }}
      >
        <Pressable
          className={`rounded bg-primary px-4 py-3 transition-all duration-75 ease-in-out hover:bg-primary/90 ${
            isAnimating.isAnimatingSoloTrain ? "opacity-80" : ""
          }`}
          onPress={navigateToRegister}
          disabled={isAnimating.isAnimatingSoloTrain}
        >
          <View className="items-center">
            <ThemeText type="primtext">
              {isAnimating.isAnimatingSoloTrain ? " " : "Start Training"}
            </ThemeText>
          </View>
        </Pressable>
      </Animated.View>

      <View className="flex-row items-center gap-2 text-sm">
        <ThemeText type="subtext">Already a hunter?</ThemeText>
        <Pressable onPress={navigateToLogin}>
          <ThemeText type="accent">Login</ThemeText>
        </Pressable>
      </View>
    </View>
  );
}
