import client from "@/services/axios";
import { CreateAccount, LoginAccount } from "@/types/account";

// API Call to login
export const login = async (data: LoginAccount, signal?: AbortSignal) => {
  try {
    const response = await client.post("/auth/login", data, { signal });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// API Call to create an account
export const register = async (data: CreateAccount, signal?: AbortSignal) => {
  try {
    const response = await client.post("/auth/register", data, { signal });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
