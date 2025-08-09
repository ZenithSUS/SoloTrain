import { createUser, getUser } from "@/api/user";
import { User } from "@/types/user";
import {
  QueryObserverBaseResult,
  UseBaseMutationResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

// Hook to get user info
export const useGetUserById = (
  id: string,
): QueryObserverBaseResult<User, Error> => {
  return useQuery<User, Error>({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await getUser(id);
      return response.data;
    },
    enabled: !!id && id !== "",
  });
};

// Hook to create user info
export const useCreateUser = (): UseBaseMutationResult<
  User,
  Error,
  User,
  unknown
> => {
  return useMutation({
    mutationKey: ["user"],
    mutationFn: async (data: User) => {
      const response = await createUser(data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("User created:", data);
    },
    onError: (error) => console.error("Error creating user:", error),
  });
};
