import client from "@/services/axios";
import { CreateAccount } from "@/types/account";

// API Call to create an account
export const createAccount = async (
  data: CreateAccount,
  signal?: AbortSignal,
) => {
  try {
    const response = await client.post("/account", data, { signal });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
