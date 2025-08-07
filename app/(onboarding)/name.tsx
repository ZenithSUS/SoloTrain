import React from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";

const Name = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center justify-evenly bg-background p-[20px]"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex items-center gap-0">
        <Text className="text-primtext">Name</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Name;
