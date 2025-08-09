import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

// Store data
export async function storeSecure(key: string, value: string) {
  try {
    if (Platform.OS === "web") {
      // Fallback to localStorage on web
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  } catch (error) {
    console.error("Error storing data", error);
  }
}

// Get data
export async function getSecure(key: string): Promise<string | null> {
  try {
    if (Platform.OS === "web") {
      return localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  } catch (error) {
    console.error("Error getting data", error);
    return null;
  }
}

// Remove data
export async function removeSecure(key: string) {
  try {
    if (Platform.OS === "web") {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  } catch (error) {
    console.error("Error removing data", error);
  }
}
