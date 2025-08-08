import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Platform, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  // Query Client
  const queryClient = new QueryClient({
    defaultOptions: {
      // Set the default options for queries
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
      },
      // Set the default options for mutations
      mutations: {
        retry: 2,
      },
    },
  });

  // Set the title to "SoloTrain" on web
  useEffect(() => {
    if (Platform.OS === "web") {
      document.title = "SoloTrain";
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        {/* Status Bar */}
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        {/* Router */}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
          <Stack.Screen name="(home)" options={{ animation: "fade" }} />
          <Stack.Screen name="(auth)" options={{ animation: "fade" }} />
          <Stack.Screen name="(onboarding)" options={{ animation: "fade" }} />
        </Stack>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
