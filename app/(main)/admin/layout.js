"use client";
import { useAuthStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { canModerate } from "@/lib/roles";

export default function layout({ children }) {
  const user = useAuthStore((state) => state.user);
  const hasHydrated = useAuthStore((state) => state._hasHydrated);
  const router = useRouter();

  useEffect(() => {
    if (!hasHydrated) return;
    if (!user) {
      router.push("/sign-in");
      return;
    }
    if (!canModerate(user)) router.push("/");
  }, [user, hasHydrated]);

  return <>{children}</>;
}