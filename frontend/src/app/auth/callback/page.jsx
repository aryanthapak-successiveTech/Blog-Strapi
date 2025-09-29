"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { setToken, setUser } = useAuth();
  useEffect(() => {
    const token = params.get("access_token");

    if (token) {
      fetch("/api/auth/set-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          setToken(data.token);
          setUser(data.user);
          router.replace("/");
        });
    } else {
      router.replace("/login?error=missing_token");
    }
  }, [router]);

  return <p className="text-center">Finishing login…</p>;
}
