import SoloTrain from "@/assets/images/SoloTrain.png";
import ThemeText from "@/components/themetext";
import { useLogin, useRegister } from "@/hooks/useAuth";
import { registerSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { z } from "zod";

type RegisterType = z.infer<typeof registerSchema>;

const Register = () => {
  // Local State
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Register Form State
  const registerForm = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Hooks
  const { mutateAsync: register } = useRegister();
  const { mutateAsync: login } = useLogin();

  // Handle Register
  const handleRegister = async () => {
    try {
      setApiError(null);
      setIsSubmitting(true);

      const registerData = {
        email: registerForm.getValues().email,
        password: registerForm.getValues().password,
      };

      await register(registerData);

      const loginData = {
        email: registerForm.getValues().email,
        password: registerForm.getValues().password,
      };

      await login(loginData);

      registerForm.reset();
      // router.push("/(onboarding)");
    } catch (error) {
      console.error("Error creating account:", error);
      setApiError(
        "There was an error creating your account. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <KeyboardAvoidingView
        className="flex-1 items-center justify-evenly gap-2 bg-background py-2"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* App Logo & Text */}
        <View className="flex items-center gap-0">
          <Image
            source={SoloTrain as ImageSourcePropType}
            style={{ width: 200, height: 200 }}
          />
          <ThemeText type="subtext" size="lg">
            "Awaken Your Power."
          </ThemeText>
        </View>

        {/* Register Form */}
        <View className="w-[90%] flex-col gap-2 rounded-md border border-formborder bg-formbg px-4 py-4">
          {/* Email */}
          <View className="flex-col gap-2">
            <Text className="text-primtext">Email</Text>
            <Controller
              control={registerForm.control}
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

            {/* Error Message */}
            {registerForm.formState.errors.email && (
              <Text className="text-red-500">
                {registerForm.formState.errors.email.message}
              </Text>
            )}
          </View>

          {/* Password */}
          <View className="flex-col gap-2">
            <Text className="text-primtext">Password</Text>
            <Controller
              control={registerForm.control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="rounded-xl bg-white px-2 py-2 text-black"
                  placeholder="Enter your password"
                  placeholderTextColor="gray"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!passwordVisible}
                />
              )}
            />

            {/* Error Message */}
            {registerForm.formState.errors.password && (
              <Text className="text-red-500">
                {registerForm.formState.errors.password.message}
              </Text>
            )}
          </View>

          {/* Confirm Password */}
          <View className="flex-col gap-2">
            <Text className="text-primtext">Confirm Password</Text>
            <Controller
              control={registerForm.control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="rounded-xl bg-white px-2 py-2 text-black"
                  placeholder="Confirm your password"
                  placeholderTextColor="gray"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!passwordVisible}
                />
              )}
            />

            {/* Error Message */}
            {registerForm.formState.errors.confirmPassword && (
              <Text className="text-red-500">
                {registerForm.formState.errors.confirmPassword.message}
              </Text>
            )}
          </View>

          {/* Register Button */}
          <View className="mt-2 flex items-center gap-2">
            <Pressable
              className="w-full rounded bg-primary px-2 py-2 disabled:cursor-not-allowed disabled:opacity-50"
              onPress={registerForm.handleSubmit(handleRegister)}
              disabled={isSubmitting}
            >
              <Text className="text-center text-white">Register</Text>
            </Pressable>
          </View>

          {/* Error Message */}
          {apiError && (
            <Text className="text-center text-red-500">{apiError}</Text>
          )}
        </View>

        {/* Login Link */}
        <View className="flex-row items-center gap-2">
          <Text className="text-primtext">Already a Hunter?</Text>
          <Link href="/login" className="text-accent">
            Login
          </Link>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Register;
