import { Audio, AVPlaybackSource } from "expo-av";
import { Platform } from "react-native";

let sound: Audio.Sound | null = null;

// Prepare BGM
export const prepareBGM = async (musicFile: AVPlaybackSource) => {
  if (sound === null) {
    sound = new Audio.Sound();
    await sound.loadAsync(musicFile);
    await sound.setIsLoopingAsync(true);
    await sound.setVolumeAsync(0.2);

    if (Platform.OS === "web") {
      document.body.addEventListener(
        "click",
        () => {
          sound?.playAsync().catch(() => {
            console.warn("Autoplay blocked. Waiting for user interaction.");
          });
        },
        { once: true },
      );
    }
  }
};

// Play BGM
export const playBGM = async () => {
  if (sound) {
    try {
      await sound.playAsync();
    } catch (e) {
      console.warn("Autoplay blocked. Waiting for user interaction.");
    }
  }
};

// Stop BGM
export const stopBGM = async () => {
  if (sound) {
    await sound.stopAsync();
    await sound.unloadAsync();
    sound = null;
  }
};

// Check if BGM is playing
export const isBGMPlaying = async (): Promise<boolean> => {
  if (sound) {
    try {
      return await sound
        .getStatusAsync()
        .then((status) => status.isLoaded ?? false);
    } catch (e) {
      console.warn("Error checking BGM status:", e);
      return false;
    }
  }
  return false;
};

// Pause BGM
export const pauseBGM = async () => {
  if (sound) {
    await sound.pauseAsync();
  }
};
