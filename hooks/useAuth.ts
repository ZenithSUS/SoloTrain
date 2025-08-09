import { login, register } from "@/api/auth";
import { storeSecure } from "@/services/secure-store";
import { Account, CreateAccount, LoginAccount } from "@/types/account";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { Platform } from "react-native";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginAccount) => {
      const response = await login(data);
      return response.data;
    },
    onSuccess(data) {
      if (Platform.OS === "web") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.user._id);
      } else {
        storeSecure("token", data.token);
        storeSecure("id", data.user._id);
      }
    },
    onError: (error) => console.error("Error logging in:", error),
  });
};

// Hook to register an account
export const useRegister = (): UseMutationResult<
  Account,
  Error,
  CreateAccount,
  unknown
> => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: CreateAccount) => {
      const response = await register(data);
      return response.data;
    },
    onError: (error) => console.error("Error creating account:", error),
  });
};
