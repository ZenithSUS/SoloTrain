import { createAccount } from "@/api/account";
import { Account, CreateAccount } from "@/types/account";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

// Hook to create an account
export const useCreateAccount = (): UseMutationResult<
  Account,
  Error,
  CreateAccount,
  unknown
> => {
  return useMutation({
    mutationKey: ["createAccount"],
    mutationFn: async (data: CreateAccount) =>
      await createAccount(data)
        .then((res) => res.data)
        .catch((err) => console.error(err)),
    onSuccess: () => {},
    onError: (error) => {
      console.error("Error creating account:", error);
      throw error;
    },
  });
};
