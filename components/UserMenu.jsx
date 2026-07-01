"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useFetch from "@/hooks/useFetch";
import { logOutUser } from "@/service/auth";
import { useAuthStore } from "@/store/user";
import { LogOut, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UserMenu = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const { data: res, fn: logginOut, loading } = useFetch(logOutUser);

  const handleLogOut = () => logginOut();

  useEffect(() => {
    if (!loading && res?.Success) {
      setUser(null);
      router.push("/sign-in");
    }
  }, [res]);

  const avatarSrc =
    user?.Image?.Valid && user?.Image?.String
      ? user.Image.String
      : "/default.jpeg";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-accent/60 hover:ring-accent transition-all focus:outline-none">
          <Image src={avatarSrc} alt="profile" fill className="object-cover" />
        </button>
      </DropdownMenuTrigger>

<DropdownMenuContent align="end" className="w-56 mt-2">
        {user?.Name && (
          <>
            <div className="px-3 py-2">
              <p className="text-sm font-medium truncate">{user.Name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.Email?.String}</p>
            </div>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/u/${user?.ID}`} className="flex items-center gap-2">
              <User size={14} />
              My Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/my-events" className="flex items-center gap-2">
              <Calendar size={14} />
              My Events
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogOut}
          disabled={loading}
          className="flex items-center gap-2 text-red-500 focus:text-red-500 focus:bg-red-500/10 cursor-pointer"
        >
          <LogOut size={14} />
          {loading ? "Logging out..." : "Log Out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;