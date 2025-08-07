import { Audio, AVPlaybackSource } from "expo-av";
import { Platform } from "react-native";

let sound: Audio.Sound | null = null;

export const loadAndPlayBGM = async (musicFile: AVPlaybackSource) => {
  if (sound !== null) return;

  sound = new Audio.Sound();
  await sound.loadAsync(musicFile);
  await sound.setIsLoopingAsync(true);
  await sound.setVolumeAsync(0.2);
  await sound.playAsync();
};

export const prepareBGM = async (musicFile: AVPlaybackSource) => {
  if (sound === null) {
    sound = new Audio.Sound();
    await sound.loadAsync(musicFile);
    await sound.setIsLoopingAsync(true);
    await sound.setVolumeAsync(0.2);

    // 👇 Add click event listener for web to allow playback
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

export const playBGM = async () => {
  if (sound) {
    try {
      await sound.playAsync();
    } catch (e) {
      console.warn("Autoplay blocked. Waiting for user interaction.");
    }
  }
};

export const stopBGM = async () => {
  if (sound) {
    await sound.stopAsync();
    await sound.unloadAsync();
    sound = null;
  }
};
