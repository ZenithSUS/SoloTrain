import { LoadingScreen } from "@/components/loading-screen";
import { OnboardingProvider } from "@/context/onboarding";
import { playBGM, prepareBGM, stopBGM } from "@/hooks/useBGM";
import { useGetUserById } from "@/hooks/useUser";
import { useUserId } from "@/hooks/useUserId";
import { router, Stack, usePathname } from "expo-router";
import React, { useEffect, useRef } from "react";

const Layout = () => {
  // State Variables
  const isPlayingRef = useRef(false);

  // Hooks
  const pathname = usePathname();
  const { userId, loading: loadingUserId } = useUserId();
  const { data: account, isLoading: loadingAccount } = useGetUserById(
    userId || "",
  );

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!loadingUserId) {
      if (!userId) {
        router.replace("/(auth)/login");
      }
    }
  }, [loadingUserId, userId]);

  // Redirect to home if user account is already created
  useEffect(() => {
    // Check if onboarding is complete
    if (!loadingAccount && account) {
      const isOnboardingComplete =
        account.fullName !== "" &&
        account.age > 0 &&
        account.height_cm > 0 &&
        account.weight_kg > 0 &&
        account.goal !== "";

      if (isOnboardingComplete) {
        console.log("Redirecting to home");
        // router.replace("/(home)/landing");
      }
    }
  }, [loadingAccount, account]);

  useEffect(() => {
    const musicScreens = ["/", "/name", "/age", "/height", "/weight", "/goal"];

    const startMusic = async () => {
      await prepareBGM(require("@/assets/sounds/Dark-Aria-LV2.mp3"));
      await playBGM();
      isPlayingRef.current = true;
    };

    if (musicScreens.includes(pathname)) {
      if (!isPlayingRef.current) {
        startMusic();
      }
    } else {
      if (isPlayingRef.current) {
        stopBGM();
        isPlayingRef.current = false;
      }
    }
  }, [pathname]);

  if (loadingUserId || loadingAccount) {
    return <LoadingScreen />;
  }

  return (
    <OnboardingProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ animation: "fade" }} />
        <Stack.Screen name="name" options={{ animation: "fade" }} />
        <Stack.Screen name="age" options={{ animation: "fade" }} />
        <Stack.Screen name="height" options={{ animation: "fade" }} />
        <Stack.Screen name="weight" options={{ animation: "fade" }} />
        <Stack.Screen name="goal" options={{ animation: "fade" }} />
      </Stack>
    </OnboardingProvider>
  );
};

export default Layout;
