import { OnboardingProvider } from "@/context/onboarding";
import { playBGM, prepareBGM, stopBGM } from "@/hooks/useBGM";
import { Stack, usePathname } from "expo-router";
import React, { useEffect } from "react";

const Layout = () => {
  const pathname = usePathname();

  useEffect(() => {
    const musicScreens = ["/", "/name", "/age", "/height", "/weight", "/goal"];

    const playMusic = async () => {
      await prepareBGM(require("@/assets/sounds/Dark-Aria-LV2.mp3"));
      await playBGM();
    };

    if (musicScreens.includes(pathname)) {
      playMusic();
    } else {
      stopBGM();
    }
  }, [pathname]);

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
