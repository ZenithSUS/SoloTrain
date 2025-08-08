import axios from "axios";

const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

// Add a request interceptor
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["x-api-key"] = process.env.EXPO_PUBLIC_API_KEY;

  return config;
});

// Add a response interceptor
client.interceptors.response.use(
  (response) => {
    // Display a success message
    console.log(response.data);
    console.log(response.status);
    return response;
  },
  (error) => Promise.reject(error),
);

export default client;
