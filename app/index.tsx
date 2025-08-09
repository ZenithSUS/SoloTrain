import SoloTrain from "@/assets/images/SoloTrain.png";
import ProgressAnimation from "@/components/progress-animation";
import ThemeText from "@/components/themetext";
import { playBGM, prepareBGM, stopBGM } from "@/hooks/useBGM";
import { getButtonClasses } from "@/utils/get-button-classes";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";

export default function IndexScreen() {
  // Local states
  const [isWelcomePressed, setIsWelcomePressed] = useState(false);
  const [isAnimating, setIsAnimating] = useState({
    isAnimatingWelcome: false,
    isAnimatingSoloTrain: false,
  });
  const [buttonStates, setButtonStates] = useState({
    welcomeButton: "visible",
    trainingButton: "visible",
  });
  const [bgmError, setBgmError] = useState<string | null>(null);

  // Enhanced BGM loading with comprehensive error handling
  const loadBGMWithErrorHandling = async (): Promise<boolean> => {
    const maxRetries = 3;
    let retryCount = 0;

    while (retryCount < maxRetries) {
      try {
        setBgmError(null);

        // Add timeout to prevent hanging
        const prepareBGMWithTimeout = () => {
          return new Promise<void>((resolve, reject) => {
            const timeout = setTimeout(() => {
              reject(new Error("BGM preparation timeout after 10 seconds"));
            }, 10000);

            prepareBGM(require("@/assets/sounds/SymphonicSuite-Lv.8.mp3"))
              .then(() => {
                clearTimeout(timeout);
                resolve();
              })
              .catch((error) => {
                clearTimeout(timeout);
                reject(error);
              });
          });
        };

        await prepareBGMWithTimeout();
        await playBGM();

        console.log("BGM loaded and playing successfully");
        return true;
      } catch (error) {
        retryCount++;
        const errorMessage =
          error instanceof Error ? error.message : "Unknown BGM error";

        console.warn(`BGM loading attempt ${retryCount} failed:`, errorMessage);

        if (retryCount >= maxRetries) {
          setBgmError(
            `Failed to load background music after ${maxRetries} attempts: ${errorMessage}`,
          );

          // Show user-friendly error message
          Alert.alert(
            "Audio Loading Issue",
            "Background music couldn't be loaded, but you can continue without it.",
            [{ text: "Continue", style: "default" }],
          );

          console.error("All BGM loading attempts failed:", errorMessage);
          return false;
        }

        // Wait before retry (exponential backoff)
        await new Promise((resolve) => setTimeout(resolve, 1000 * retryCount));
      }
    }

    return false;
  };

  // Function to open SoloTrain app - Enhanced with better error handling
  const openSoloTrain = async () => {
    if (isWelcomePressed || isAnimating.isAnimatingWelcome) return;

    try {
      setIsAnimating((prev) => ({
        ...prev,
        isAnimatingWelcome: true,
      }));

      setButtonStates((prev) => ({ ...prev, welcomeButton: "hiding" }));

      setTimeout(async () => {
        try {
          // Use enhanced BGM loading function
          const bgmLoaded = await loadBGMWithErrorHandling();

          if (!bgmLoaded) {
            console.log("Continuing without BGM due to loading failure");
          }

          // Continue with app flow regardless of BGM success/failure
          setIsWelcomePressed(true);
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Unknown error in openSoloTrain";
          console.error("Unexpected error in openSoloTrain:", errorMessage);

          setBgmError(`Unexpected error: ${errorMessage}`);

          // Still allow user to continue
          setIsWelcomePressed(true);
        } finally {
          // Always reset animation state
          setIsAnimating((prev) => ({
            ...prev,
            isAnimatingWelcome: false,
          }));
          setButtonStates((prev) => ({ ...prev, welcomeButton: "visible" }));
        }
      }, 300);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unknown error in openSoloTrain outer catch";
      console.error("Error in openSoloTrain outer catch:", errorMessage);

      // Reset animation state on any error
      setIsAnimating((prev) => ({
        ...prev,
        isAnimatingWelcome: false,
      }));
      setButtonStates((prev) => ({ ...prev, welcomeButton: "visible" }));

      setBgmError(`Setup error: ${errorMessage}`);
    }
  };

  // Enhanced navigation with safer BGM cleanup
  const navigateToRegister = async () => {
    if (isAnimating.isAnimatingSoloTrain) return;

    setIsAnimating((prev) => ({
      ...prev,
      isAnimatingSoloTrain: true,
    }));

    try {
      setButtonStates((prev) => ({ ...prev, trainingButton: "hiding" }));

      setTimeout(async () => {
        try {
          // Safe BGM cleanup with error handling
          try {
            await stopBGM();
          } catch (bgmStopError) {
            console.warn(
              "Error stopping BGM (continuing anyway):",
              bgmStopError,
            );
            // Don't prevent navigation due to BGM stop error
          }

          router.push("/(onboarding)");
        } catch (navigationError) {
          const errorMessage =
            navigationError instanceof Error
              ? navigationError.message
              : "Navigation failed";
          console.error("Error in navigation:", errorMessage);

          Alert.alert(
            "Navigation Error",
            "There was an issue navigating to the next screen. Please try again.",
            [{ text: "OK", style: "default" }],
          );

          // Reset states on navigation error
          setIsAnimating((prev) => ({
            ...prev,
            isAnimatingSoloTrain: false,
          }));
          setButtonStates((prev) => ({ ...prev, trainingButton: "visible" }));
        }
      }, 200);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unknown error in navigateToRegister";
      console.error("Error in navigateToRegister:", errorMessage);

      setIsAnimating((prev) => ({
        ...prev,
        isAnimatingSoloTrain: false,
      }));
      setButtonStates((prev) => ({ ...prev, trainingButton: "visible" }));
    }
  };

  // Enhanced login navigation with safer BGM cleanup
  const navigateToLogin = async () => {
    try {
      // Safe BGM cleanup
      try {
        await stopBGM();
      } catch (bgmStopError) {
        console.warn(
          "Error stopping BGM during login navigation (continuing anyway):",
          bgmStopError,
        );
      }

      router.push("/(auth)/login");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login navigation failed";
      console.error("Error in navigateToLogin:", errorMessage);

      Alert.alert(
        "Navigation Error",
        "There was an issue navigating to login. Please try again.",
        [{ text: "OK", style: "default" }],
      );
    }
  };

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

        <ThemeText type="primtext" size="xl">
          "Only those who step forward can level up."
        </ThemeText>

        {/* Show BGM error if present */}
        {bgmError && (
          <View className="w-full max-w-sm rounded bg-red-100 p-2">
            <ThemeText type="subtext" size="sm">
              {`Audio Notice: ${bgmError}`}
            </ThemeText>
          </View>
        )}

        <View className="w-full max-w-sm">
          <Pressable
            className={getButtonClasses(
              buttonStates.welcomeButton,
              isAnimating.isAnimatingWelcome,
            )}
            onPress={openSoloTrain}
            disabled={isAnimating.isAnimatingWelcome}
          >
            <View className="items-center">
              <ThemeText type="primtext">
                {isAnimating.isAnimatingWelcome
                  ? "Opening SoloTrain..."
                  : "Tap to Begin Your Solo Training"}
              </ThemeText>
            </View>
          </Pressable>
        </View>
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

      {/* Show BGM error if present */}
      {bgmError && (
        <View className="mb-2 w-full max-w-sm rounded bg-yellow-100 p-2">
          <ThemeText type="subtext" size="sm">
            Audio Notice: Background music is unavailable, but training
            continues!
          </ThemeText>
        </View>
      )}

      <View className="w-full max-w-sm">
        <Pressable
          className={getButtonClasses(
            buttonStates.trainingButton,
            isAnimating.isAnimatingSoloTrain,
          )}
          onPress={navigateToRegister}
          disabled={isAnimating.isAnimatingSoloTrain}
        >
          <View className="items-center">
            <ThemeText type="primtext">
              {isAnimating.isAnimatingSoloTrain
                ? "Loading..."
                : "Start Training"}
            </ThemeText>
          </View>
        </Pressable>
      </View>

      <View className="flex-row items-center gap-2 text-sm">
        <ThemeText type="subtext">Already a hunter?</ThemeText>
        <Pressable
          onPress={navigateToLogin}
          className="transition-opacity duration-150 active:opacity-70"
        >
          <ThemeText type="accent">Login</ThemeText>
        </Pressable>
      </View>
    </View>
  );
}
