import { getSecure, removeSecure } from "@/services/secure-store";
import { useEffect, useState } from "react";

export const useUserId = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        setLoading(true);
        const userId = await getSecure("id");
        setUserId(userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
        setUserId(null);
        removeSecure("id");
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
  }, []);

  return { userId, loading };
};
