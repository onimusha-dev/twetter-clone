import { useState, useEffect } from "react";
import { fetchApi } from "@/lib/api";

export function useUser() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    fetchApi("/api/users/me")
      .then((res) => {
        if (!res.ok) throw new Error("Auth failed");
        return res.json();
      })
      .then((data) => {
        if (data.success) setUser(data.data);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  return { user, isLoading, error };
}
