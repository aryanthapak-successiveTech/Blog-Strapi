"use client";

import { BASE_URL } from "@/utils/Constants";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router=useRouter();
  useEffect(() => {
    const fetchTokenAndUser = async () => {
      try {
        const res = await fetch("/api/auth/token");
        if (!res.ok) {
          setToken(null);
          setUser(null);
          return;
        }
        const data = await res.json();
        const jwt = data.token;
        setToken(jwt);

        if (jwt) {
          const userRes = await fetch(
            `${BASE_URL}/api/users/me?populate=role`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          
          if (userRes.ok) {
            const userData = await userRes.json();
            const {username,role}=userData
            setUser({username,role:role?.type});
          }
        }
      } catch (err) {
        console.error("Auth error:", err);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenAndUser();
  }, []);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setToken(null);
      setUser(null);
      router.push("/");
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, setToken, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
