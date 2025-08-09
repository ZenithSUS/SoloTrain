import { playBGM, prepareBGM, stopBGM } from "@/hooks/useBGM";
import { Stack, usePathname } from "expo-router";
import React, { useEffect } from "react";

const Layout = () => {
  const pathname = usePathname();

  useEffect(() => {
    const playMusic = async () => {
      await prepareBGM(require("@/assets/sounds/Solo-Train-Theme.mp3"));
      await playBGM();
    };
    const musicScreens = ["/login", "/register", "/forgot"];
    if (musicScreens.includes(pathname)) {
      playMusic();
    } else {
      stopBGM();
    }
  }, [pathname]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" options={{ animation: "fade" }} />
      <Stack.Screen name="register" options={{ animation: "fade" }} />
      <Stack.Screen name="forgot" options={{ animation: "fade" }} />
    </Stack>
  );
};

export default Layout;
