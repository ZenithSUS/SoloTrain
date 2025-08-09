import { LoadingScreen } from "@/components/loading-screen";
import { useUserId } from "@/hooks/useUserId";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, router } from "expo-router";
import { useEffect } from "react";
import { Platform, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 1000 * 60 * 5,
      networkMode: "offlineFirst",
    },
    mutations: { retry: 2 },
  },
});

export default function RootLayout() {
  const { userId, loading } = useUserId();

  useEffect(() => {
    if (!loading) {
      if (userId) {
        router.replace("/(onboarding)");
      } else {
        router.replace("/");
      }
    }
  }, [loading, userId]);

  useEffect(() => {
    if (Platform.OS === "web") {
      document.title = "SoloTrain";
    }
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(home)" options={{ animation: "fade" }} />
          <Stack.Screen name="(auth)" options={{ animation: "fade" }} />
          <Stack.Screen name="(onboarding)" options={{ animation: "fade" }} />
        </Stack>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
