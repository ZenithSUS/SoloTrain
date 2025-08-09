import axios from "axios";
import { Platform } from "react-native";
import { getSecure } from "./secure-store";

// Create an axios instance
const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

// Add a request interceptor
client.interceptors.request.use((config) => {
  // Get the token
  const token =
    Platform.OS === "web" ? localStorage.getItem("token") : getSecure("token");

  // Add the token to the request headers if it exists
  if (token && token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Add the API key to the request headers
  config.headers["x-api-key"] = process.env.EXPO_PUBLIC_API_KEY;

  return config;
});

// Add a response interceptor
client.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default client;
