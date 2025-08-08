import * as SecureStore from "expo-secure-store";

// Function to store data
export function storeSecure(key: string, value: string): void {
  SecureStore.setItemAsync(key, value).catch((error) =>
    console.log("Error storing data", error),
  );
}

// Function to get data
export function getSecure(key: string): void {
  SecureStore.getItemAsync(key).catch((error) =>
    console.log("Error getting data", error),
  );
}

// Function to remove data
export function removeSecure(key: string): void {
  SecureStore.deleteItemAsync(key).catch((error) =>
    console.log("Error removing data", error),
  );
}
