"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Palette } from "lucide-react";

import ApproveArt from "./_components/ApproveArt";
import useFetch from "@/hooks/useFetch";
import { getPendingArt } from "@/service/admin";

import ManageAccount from "./_components/ManageAccount";
import { getAllUser } from "@/service/user";
import { AdminSkeleton } from "@/components/skeletons";
import { useAuthStore } from "@/store/user";
import { canModerate, canAssignRoles } from "@/lib/roles";

export default function Page() {
  const user = useAuthStore((state) => state.user);
  const [artWorks, setartWorks] = useState(null);
  const [users, setUsers] = useState(null);
  const {
    data: res2,
    loading: accountLoading,
    fn: getAllAccountFn,
  } = useFetch(getAllUser);
  const {
    data: arts,
    loading: artLoading,
    fn: getPenArtFn,
  } = useFetch(getPendingArt);

  useEffect(() => {
    if (canAssignRoles(user)) getAllAccountFn();
    if (canModerate(user)) getPenArtFn();
  }, [user?.Role]);

  useEffect(() => {
    if (!artLoading && arts?.Success) {
      setartWorks(arts.Data);
    }
  }, [arts, artLoading]);
  const handleUserChange = (data) => {
    setUsers(data);
  };
  useEffect(() => {
    if (!accountLoading && res2?.Success) {
      handleUserChange(res2.Data);
    }
  }, [res2, accountLoading]);

  if (accountLoading||artLoading) {
    return (
     <AdminSkeleton/>
    );
  }

  return (
    <section
      id="adminPage"
      className="min-h-screen py-16 px-4 md:px-8 bg-frosty"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-5xl md:text-6xl font-serif">
            Admin <span className="text-red-500">Dashboard</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Manage User accounts, and Artwork approvals from your centralized
            control panel.
          </p>
        </div>

        {/* Dashboard Frame using Radix Tabs */}
        <Tabs
          defaultValue={canAssignRoles(user) ? "manage-account" : "approve-art"}
          orientation="vertical"
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {/* Tab Navigation Sidebar */}
          <div className="md:col-span-1">
            <TabsList className="bg-overlay/5 border border-overlay/10 p-2 rounded-2xl flex md:flex-col gap-2 w-full md:sticky md:top-24 h-auto">
              {canAssignRoles(user) && (
                <TabsTrigger
                  value="manage-account"
                  className="rounded-xl w-full text-content text-sm py-3 px-4 flex items-center justify-center md:justify-start gap-2.5 transition-all data-[state=active]:bg-red-600 data-[state=active]:text-white hover:bg-overlay/5 cursor-pointer font-medium"
                >
                  <Users className="w-4 h-4" />
                  <span>Accounts</span>
                </TabsTrigger>
              )}
              {canModerate(user) && (
                <TabsTrigger
                  value="approve-art"
                  className="rounded-xl w-full text-content text-sm py-3 px-4 flex items-center justify-center md:justify-start gap-2.5 transition-all data-[state=active]:bg-red-600 data-[state=active]:text-white hover:bg-overlay/5 cursor-pointer font-medium"
                >
                  <Palette className="w-4 h-4" />
                  <span>Artworks</span>
                </TabsTrigger>
              )}
            </TabsList>
          </div>

          {/* Tab Content Display Area */}
          <div className="md:col-span-3">
            {canAssignRoles(user) && (
              <TabsContent value="manage-account" className="mt-0 outline-none">
                {users&&<ManageAccount users={users} />}
              </TabsContent>
            )}
            {canModerate(user) && (
              <TabsContent value="approve-art" className="mt-0 outline-none">
                {artWorks&&<ApproveArt art={artWorks} />}
              </TabsContent>
            )}
          </div>
        </Tabs>
      </div>
    </section>
  );
}
