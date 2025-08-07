import SoloTrain from "@/assets/images/SoloTrain.png";
import ThemeText from "@/components/themetext";
import { loginSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { z } from "zod";

type LoginType = z.infer<typeof loginSchema>;

const Login = () => {
  const loginForm = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = () => {
    console.log(loginForm.getValues());
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 items-center justify-evenly gap-2 bg-background"
      contentContainerStyle={{ flexGrow: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* App Logo & Text */}
      <View className="flex items-center gap-0">
        <Image
          source={SoloTrain as ImageSourcePropType}
          style={{ width: 200, height: 200 }}
        />
        <ThemeText type="subtext" size="lg">
          "Enter the Gate, Hunter"
        </ThemeText>
      </View>

      {/*Login Form */}
      <View className="w-[90%] flex-col gap-2 rounded-md border border-formborder bg-formbg px-4 py-4">
        {/*Email */}
        <View className="flex-col gap-2">
          <Text className="text-primtext">Email</Text>
          <Controller
            control={loginForm.control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="rounded-xl bg-white px-2 py-2 text-black"
                placeholder="Enter your email"
                placeholderTextColor="gray"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          {/*Email Error */}
          {loginForm.formState.errors.email && (
            <Text className="text-error">
              {loginForm.formState.errors.email.message}
            </Text>
          )}
        </View>

        {/*Password */}
        <View className="flex-col gap-2">
          <Text className="text-primtext">Password</Text>
          <Controller
            control={loginForm.control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="rounded-xl bg-white px-2 py-2 text-black"
                placeholder="Enter your password"
                placeholderTextColor="gray"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
          />

          {/*Password Error */}
          {loginForm.formState.errors.password && (
            <Text className="text-error">
              {loginForm.formState.errors.password.message}
            </Text>
          )}
        </View>

        {/*Login Button */}
        <View className="flex items-center">
          <Pressable
            className="mt-2 w-full rounded bg-primary px-2 py-2 text-center"
            onPress={loginForm.handleSubmit(handleLogin)}
          >
            <Text className="text-center text-primtext">Login</Text>
          </Pressable>
        </View>
      </View>

      {/* Register Button */}
      <View className="flex-row items-center gap-2">
        <Text className="text-primtext">Not yet a Hunter?</Text>
        <Link href="/(auth)/register" className="text-accent">
          Register
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
