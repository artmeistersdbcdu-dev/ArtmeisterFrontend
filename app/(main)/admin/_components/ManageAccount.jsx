"use client";

import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MoreVertical,
  ShieldAlert,
  Ban,
  Search,
  Users,
  AlertCircle,
  UserCheck,
  UserX,
  RotateCcw,
} from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { changeUserRoleStatus } from "@/service/admin";
import { useAuthStore } from "@/store/user";
import { toast } from "sonner";
import {
  ROLES,
  ROLE_DISPLAY,
  ROLE_ORDER,
  ROLE_WEIGHTS,
  canAssignRoles,
  getRoleWeight,
} from "@/lib/roles";
import { RoleBadge, ROLE_ICONS } from "@/components/RoleBadge";
import { UserRound } from "lucide-react";
import Link from "next/link";

const ManageAccount = ({ users }) => {
  const currUser = useAuthStore((state) => state.user);
  const [userList, setUserList] = useState(() =>
    (users || []).filter((u) => u.ID !== currUser?.ID),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleDialogUser, setRoleDialogUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const {
    data,
    fn: changeFn,
    loading: updating,
  } = useFetch(changeUserRoleStatus);

  const [pendingUpdate, setPendingUpdate] = useState(null);

  const updateUser = (id, updates) => {
    setUserList((prev) =>
      prev.map((user) => (user.ID === id ? { ...user, ...updates } : user)),
    );
  };

  const handleApprove = (id) => {
    setPendingUpdate({
      id,
      updates: { Status: "approved" },
    });

    changeFn(id, { status: "approved" });
  };

  const handleReject = (id) => {
    setPendingUpdate({
      id,
      updates: { Status: "rejected" },
    });

    changeFn(id, { status: "rejected" });
  };

  const handleRoleChange = (id, newRole) => {
    setPendingUpdate({
      id,
      updates: { Role: newRole },
    });
    changeFn(id, { role: newRole });
    setRoleDialogUser(null);
    setSelectedRole("");
  };

  const handleBanToggle = (id, currentStatus) => {
    const newStatus = currentStatus === "banned" ? "approved" : "banned";

    setPendingUpdate({
      id,
      updates: { Status: newStatus },
    });

    changeFn(id, { status: newStatus });
  };

  useEffect(() => {
    if (!updating && data?.Success && pendingUpdate) {
      updateUser(pendingUpdate.id, pendingUpdate.updates);
      setPendingUpdate(null);
    }
  }, [data, updating, pendingUpdate]);

  const getAssignableRoles = (targetUser) => {
    const actorWeight = getRoleWeight(currUser?.Role);
    const targetWeight = getRoleWeight(targetUser?.Role);
    return ROLE_ORDER.filter(
      (role) => getRoleWeight(role) < actorWeight && role !== targetUser?.Role,
    );
  };

  let totalUsers = userList.length;
  let pendingUsers = userList.filter((u) => u.Status === "pending").length;
  let bannedUsers = userList.filter((u) => u.Status === "banned").length;
  useEffect(() => {
    totalUsers = userList.length;
    pendingUsers = userList.filter((u) => u.Status === "pending").length;
    bannedUsers = userList.filter((u) => u.Status === "banned").length;
  }, [users]);

  const filteredUsers = userList.filter((user) => {
    const matchesSearch =
      (user.Name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.Email || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" ? true : user.Role === roleFilter;
    const matchesStatus =
      statusFilter === "all" ? true : user.Status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-serif text-content mb-2 tracking-wide">
          Manage Users
        </h2>
        <p className="text-gray-400 text-sm">
          Approve, reject, promote, demote, or ban user accounts from a
          centralized control panel.
        </p>
      </div>

      {/* Metrics Section */}
      <div className="flex  flex-wrap gap-2.5 pt-1">
        <Badge
          variant="outline"
          className="px-3 py-1 bg-overlay/5 border-overlay/10 text-gray-300 text-xs font-normal gap-1.5 rounded-xl"
        >
          <Users className="w-3.5 h-3.5 text-red-500" />
          <span>Total Users:</span>
          <span className="font-semibold text-content">{totalUsers}</span>
        </Badge>

        <Badge
          variant="outline"
          className="px-3 py-1 bg-overlay/5 border-overlay/10 text-gray-300 text-xs font-normal gap-1.5 rounded-xl"
        >
          <AlertCircle className="w-3.5 h-3.5 text-red-500" />
          <span>Pending:</span>
          <span className="font-semibold text-content">{pendingUsers}</span>
        </Badge>

        <Badge
          variant="outline"
          className="px-3 py-1 bg-overlay/5 border-overlay/10 text-gray-300 text-xs font-normal gap-1.5 rounded-xl"
        >
          <Ban className="w-3.5 h-3.5 text-red-500" />
          <span>Banned:</span>
          <span className="font-semibold text-content">{bannedUsers}</span>
        </Badge>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center p-4 rounded-2xl border border-overlay/10 bg-overlay/5 backdrop-blur-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-overlay/5 border border-overlay/10 rounded-xl pl-10 pr-4 py-2 text-sm text-content focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 hidden sm:inline">
              Role:
            </span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-frosty/40 border border-overlay/10 rounded-xl px-3 py-2 text-sm text-content focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              <option value="all">All Roles</option>
              {ROLE_ORDER.map((role) => (
                <option key={role} value={role}>
                  {ROLE_DISPLAY[role]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 hidden sm:inline">
              Status:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-frosty/40 border border-overlay/10 rounded-xl px-3 py-2 text-sm text-content focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="banned">Banned</option>
            </select>
          </div>
        </div>
      </div>

      {/* Role Change Dialog */}
      <AlertDialog
        open={!!roleDialogUser}
        onOpenChange={(open) => {
          if (!open) {
            setRoleDialogUser(null);
            setSelectedRole("");
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Role</AlertDialogTitle>
            <AlertDialogDescription>
              Select a new role for <strong>{roleDialogUser?.Name}</strong>.
              Current role:{" "}
              <strong>{ROLE_DISPLAY[roleDialogUser?.Role] || "Member"}</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex flex-col gap-2 py-4">
            {roleDialogUser &&
              getAssignableRoles(roleDialogUser).map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${
                    selectedRole === role
                      ? "border-red-500 bg-red-500/10 text-content"
                      : "border-overlay/10 bg-overlay/5 text-gray-300 hover:border-overlay/20 hover:bg-overlay/10"
                  }`}
                >
                  <span className="text-red-400">
                    {React.createElement(ROLE_ICONS[role] || UserRound, {
                      size: 18,
                    })}
                  </span>
                  <span className="font-medium">{ROLE_DISPLAY[role]}</span>
                </button>
              ))}
            {roleDialogUser &&
              getAssignableRoles(roleDialogUser).length === 0 && (
                <p className="text-gray-400 text-sm text-center py-4">
                  No roles available to assign
                </p>
              )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={!selectedRole}
              onClick={() => handleRoleChange(roleDialogUser.ID, selectedRole)}
            >
              {updating ? "Changing..." : "Change Role"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="space-y-4">
        {filteredUsers.map((user) => {
          const getStatusBadge = (status) => {
            switch (status) {
              case "approved":
                return (
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 capitalize font-medium">
                    {status}
                  </Badge>
                );
              case "pending":
                return (
                  <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 capitalize font-medium">
                    {status}
                  </Badge>
                );
              case "rejected":
                return (
                  <Badge className="bg-red-500/10 text-red-400 border-red-500/20 capitalize font-medium">
                    {status}
                  </Badge>
                );
              case "banned":
                return (
                  <Badge className="bg-rose-900/25 text-rose-400 border-rose-900/50 capitalize font-medium">
                    {status}
                  </Badge>
                );
              default:
                return (
                  <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/20 capitalize font-medium">
                    {status}
                  </Badge>
                );
            }
          };

          return (
            <div
              key={user.ID}
              className="p-5 rounded-2xl border shadow-md border-overlay/10 bg-overlay/5 backdrop-blur-lg hover:bg-overlay/10 hover:border-overlay/20 transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={user.Image?.String || "/default.jpeg"}
                    alt={user.Name}
                    className="w-14 h-14 rounded-full object-cover border border-overlay/10 shadow-inner"
                  />
                  {user.Status === "approved" && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-black rounded-full" />
                  )}
                  {user.Status === "banned" && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 border-2 border-black rounded-full" />
                  )}
                  {user.Status === "pending" && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-amber-500 border-2 border-black rounded-full animate-pulse" />
                  )}
                </div>

                <div className="space-y-1.5">
                  <Link href={`/u/${user.ID}`}>
                    <h3 className="text-lg font-semibold hover:underline text-content tracking-wide">
                      {user.Name}
                    </h3>
                  </Link>

                  <p className="text-sm text-gray-400">{user.Email}</p>

                  <div className="flex gap-2 flex-wrap items-center">
                    <RoleBadge role={user.Role} />
                    {getStatusBadge(user.Status)}
                  </div>
                </div>
              </div>

              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-content hover:bg-overlay/10 rounded-full h-9 w-9"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-[#181818] border border-overlay/10 text-content rounded-xl shadow-2xl p-1.5 min-w-44"
                  >
                    <DropdownMenuLabel className="text-gray-400 text-xs px-2.5 py-1.5">
                      Actions
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-overlay/10" />

                    {user.Status === "pending" && (
                      <>
                        <DropdownMenuItem
                          onClick={() => handleApprove(user.ID)}
                          className="flex items-center gap-2 px-2.5 py-2 hover:bg-emerald-500/10 hover:text-emerald-400 rounded-lg cursor-pointer"
                        >
                          <UserCheck className="w-4 h-4 text-emerald-400" />
                          <span>Approve User</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleReject(user.ID)}
                          className="flex items-center gap-2 px-2.5 py-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg cursor-pointer"
                        >
                          <UserX className="w-4 h-4 text-red-400" />
                          <span>Reject User</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-overlay/10" />
                      </>
                    )}

                    {user.Status !== "pending" && user.Status !== "banned" && canAssignRoles(currUser) && (
                      <DropdownMenuItem
                        onClick={() => {
                          setRoleDialogUser(user);
                          setSelectedRole("");
                        }}
                        className="flex items-center gap-2 px-2.5 py-2 hover:bg-indigo-500/10 hover:text-indigo-400 rounded-lg cursor-pointer"
                      >
                        <ShieldAlert className="w-4 h-4 text-indigo-400" />
                        <span>Change Role</span>
                      </DropdownMenuItem>
                    )}

                    {user.Role !== ROLES.PRESIDENT && (
                      <DropdownMenuItem
                        onClick={() => handleBanToggle(user.ID, user.Status)}
                        className={`flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-pointer ${
                          user.Status === "banned"
                            ? "hover:bg-emerald-500/10 hover:text-emerald-400"
                            : "hover:bg-rose-950/40 hover:text-rose-400"
                        }`}
                      >
                        {user.Status === "banned" ? (
                          <>
                            <RotateCcw className="w-4 h-4 text-emerald-400" />
                            <span>Unban User</span>
                          </>
                        ) : (
                          <>
                            <Ban className="w-4 h-4 text-rose-400" />
                            <span>Ban User</span>
                          </>
                        )}
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="text-center py-16 text-gray-500 border border-overlay/5 rounded-2xl bg-overlay/5 border-dashed">
            No users match the search/filter criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAccount;
