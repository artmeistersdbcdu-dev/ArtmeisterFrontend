"use client";
import { useAuthStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { canModerate } from "@/lib/roles";

export default function layout({ children }) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user && !canModerate(user)) router.push("/");
  }, [user]);

  return <>{children}</>;
}