import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, CalendarPlus, ShieldCheck } from "lucide-react";
import Link from "next/link";

const AdminMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-red-900 px-3 py-1.5 rounded-lg text-white" asChild>
        <button className="flex items-center gap-1.5 text-sm bg font-semibold hover:text-red-400 transition-colors">
          <ShieldCheck size={16} />
          Admin
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 mt-2" align="end">
        <DropdownMenuLabel className="text-xs ">
          Admin Panel
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/admin" className="flex items-center gap-2">
              <LayoutDashboard size={14} />
              Dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/admin/events/create" className="flex items-center gap-2">
              <CalendarPlus size={14} />
              Create Event
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminMenu;