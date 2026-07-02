"use client";

import React, { useEffect, useState } from "react";
import data from "@/data.json";
import Image from "next/image";
import Link from "next/link";
import { Menu, Plus, X } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { getCurrUser } from "@/service/auth";
import { useAuthStore } from "@/store/user";
import UserMenu from "@/components/UserMenu";
import AdminMenu from "@/components/AdminMenu";
import { canModerate } from "@/lib/roles";
import { ThemeToggle } from "@/components/ThemeToggle";
export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const [mobileOpen, setMobileOpen] = useState(false);
  const {
    data: res,
    fn: refetchUser,
    loading: userLoading,
  } = useFetch(getCurrUser);

useEffect(() => {
  if (user) return;
  refetchUser();
}, []); 

useEffect(() => {
  if (!res) return;

  if (res.Success && res.Data) {
    setUser(res.Data);
  } else {
    clearUser();
  }
}, [res?.Success]);

  return (
    <nav
      className={`fixed top-4 left-1/2 z-50 w-[95%] mx-auto -translate-x-1/2 transition-all duration-300 ${
        scrolled
          ? "rounded-2xl bg-frosty/20 backdrop-blur-xl text-content shadow-lg"
          : "text-content"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-background">
              <Image
                src="/Logo.jpeg"
                alt="Logo"
                width={56}
                height={56}
                className="object-cover"
              />
            </div>

            <span className="font-heading text-lg font-bold tracking-wider md:text-xl">
              {data.siteName}
            </span>
          </div>
        </Link>

        {/* Right Side */}
<div className="flex items-center gap-4">
  <ThemeToggle />
  {user ? (
    <>
      <Link href={"/art/create"}>
        <button className="border px-3 py-2 bg-frosty/20 rounded-full text-content flex items-center gap-2 hover:bg-frosty/10">
          <Plus size={20} />
          <span className="text-sm font-semibold">create</span>
        </button>
      </Link>

      {canModerate(user) && (
       <AdminMenu/>
      )}

      <div className="relative h-12 w-12 overflow-hidden flex items-center justify-center rounded-full border border-overlay/20">
        <UserMenu user={user} />
      </div>
    </>
  ) : (
    <>
      <Link href={"/sign-in"}>
        <button className="border px-3 py-2 rounded-md bg-red-900">
          Login
        </button>
      </Link>
    </>
  )}
</div>
      </div>

    </nav>
  );
};
