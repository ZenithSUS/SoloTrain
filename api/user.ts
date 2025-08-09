import client from "@/services/axios";
import { User as CreateUser } from "@/types/user";

// API Call to get user info base on user ID
export const getUser = async (id: string, signal?: AbortSignal) => {
  try {
    const response = await client.get(`/user/${id}`, { signal });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// API Call to create a user info
export const createUser = async (data: CreateUser, signal?: AbortSignal) => {
  try {
    const response = await client.post("/user", data, { signal });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
