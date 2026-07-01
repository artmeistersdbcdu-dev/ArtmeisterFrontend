"use client";
import { ArtDetailSkeleton } from "@/components/skeletons";
import React, { useEffect, useState } from "react";
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
import Link from "next/link";
import { MoveLeft, ArrowRight, Check, Pencil, Ban, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { deleteArt, getArtProfileById } from "@/service/art";
import { useArtStore } from "@/store/art";
import { useAuthStore } from "@/store/user";
import { changeArtStatus } from "@/service/admin";
import { toast } from "sonner";
import { canModerate } from "@/lib/roles";
export default function ArtPage() {
  const params = useParams();
  const router = useRouter();
  const artId = params.artid;
  const userId = params.userId;
  const user = useAuthStore((state) => state.user);
  const [artist, setartist] = useState(user);
  const role = user?.ID === userId ? "artist" : user?.Role;
  const [art, setArt] = useState(null);
  const artWork = useArtStore((state) => state.arts[artId]);
  const addArt = useArtStore((state) => state.addArt);
  const {
    data: res,
    fn: fetchArtFunc,
    loading: fetchingArt,
  } = useFetch(getArtProfileById);
  useEffect(() => {
    if (artWork) {
      setArt(artWork);
      return;
    }
    if (artId && userId) {
      let payload = {
        id: artId,
        usrId: userId,
      };
      fetchArtFunc(payload);
    }
  }, [artId, artWork, userId]);
  useEffect(() => {
    if (res?.Success) {
      if (res.Data.Status === "rejected" && !canModerate(user)) {
        toast.error("Artwork is rejected");
        return;
      }
      addArt(res.Data);

      setArt(res.Data);
      setartist({
        id: res.Data.UserID,
        username: res.Data.Username?.String,
        image: res.Data.UserImage?.String,
      });
    }
  }, [res]);

  const {
    data: verdict,
    loading,
    error,
    fn: changeArtStatusFn,
  } = useFetch(changeArtStatus);
  const handleArtChange = (id, status) => {
    if (!canModerate(user)) {
      toast.error("You are not authorized to perform this action");
      return;
    }
    changeArtStatusFn(id, status);
  };
  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update artwork status");
    }
    if (verdict?.Success && !loading && !error) {
      toast.success(`Artwork successfully ${verdict.Data.Status}`);
    }
  }, [error, verdict]);
  const {
    data: deletedData,
    fn: deleteFn,
    loading: deleting,
  } = useFetch(deleteArt);
  const handleDelete = () => {
    if (role !== "artist") {
      toast.error("You are not authorized to perform this action");
      return;
    }
    deleteFn(artId);
  };
  useEffect(() => {
    if (deleting || !deletedData) return;
    if (!deletedData.Success) {
      toast.error(deletedData.message);
      return;
    }
    router.push(`/u/${userId}`);
  }, [deletedData, deleting]);


  if (fetchingArt) {
    return <ArtDetailSkeleton />;
  }

  if (!art) {
    return (
      <main className="min-h-screen bg-frosty text-content flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-3">Artwork Not Found</h1>
          <p className="text-gray-400 mb-6">
            This artwork may have been removed or doesn’t exist.
          </p>
          <Link
            href="/"
            className="inline-flex px-5 py-3 bg-red-900 rounded-xl  text-content font-semibold hover:opacity-90 transition"
          >
            Go Back Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-frosty text-content selection:bg-accent pb-20 pt-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <Link
          href={`/u/${art?.data?.UserID}`}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-accent transition-colors group mb-8"
        >
          <MoveLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Artist Profile
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT SIDE - Artwork */}
          <div className="md:col-span-2 glass rounded-3xl overflow-hidden relative border border-overlay/5 group min-h-[500px] flex items-center justify-center bg-frosty/40">
            {/* Action Buttons */}
    

            {/* Artwork Image */}
            <div className="md:col-span-2 glass rounded-3xl overflow-hidden relative border border-overlay/5 group min-h-[500px] bg-frosty/40">
              {/* Action Buttons */}
              <div className="absolute top-6 right-6 z-20 flex gap-3">
                {/* Artist Actions */}
                {role === "artist" && (
                  <>
                    {/* Edit */}
                    <Link
                      href={`/art/create?id=${artId}`}
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-frosty/50 backdrop-blur-md border border-overlay/10 hover:bg-overlay/10 transition-all"
                    >
                      <Pencil
                        size={18}
                        className="text-content group-hover:scale-110 transition-transform"
                      />
                    </Link>

                    {/* Delete */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500/20 backdrop-blur-md border border-red-500/30 hover:bg-red-500/30 transition-all">
                          <Trash2
                            size={18}
                            className="text-red-400 group-hover:scale-110 transition-transform"
                          />
                        </button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your artwork.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-500 text-content hover:bg-red-600"
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}

                {/* Admin Actions */}
                {canModerate(user) && (
                  <>
                    {/* Approve */}
                    {(art?.data?.Status === "pending" ||
                      art?.data?.Status === "banned") && (
                      <button
                        onClick={() =>
                          handleArtChange(art?.data?.ID, "approved")
                        }
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500/20 backdrop-blur-md border border-green-500/30 hover:bg-green-500/30 transition-all"
                      >
                        <Check
                          size={18}
                          className="text-green-400 group-hover:scale-110 transition-transform"
                        />
                      </button>
                    )}

                    {/* Reject */}
                    {(art?.data?.Status === "pending" ||
                      art?.data?.Status === "approved") && (
                      <button
                        onClick={() =>
                          handleArtChange(art?.data?.ID, "rejected")
                        }
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500/20 backdrop-blur-md border border-red-500/30 hover:bg-red-500/30 transition-all"
                      >
                        <Ban
                          size={18}
                          className="text-red-400 group-hover:scale-110 transition-transform"
                        />
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Image Wrapper */}
              <div className="w-full h-full rounded-3xl overflow-hidden flex items-center justify-center">
                <img
                  src={art?.data?.Image}
                  alt={art?.data?.Name}
                  className="w-full h-auto max-h-[90vh] object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-6">
            {/* About Artwork */}
            <div className="glass rounded-3xl p-8 border border-overlay/5 shadow-sm">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
                {art?.data?.Name}
              </h1>

              <h3 className="text-lg font-semibold text-content/80 mb-3 uppercase tracking-wide">
                About the Artwork
              </h3>

              <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                {art?.data?.Description?.String ||
                  "No description provided for this artwork."}
              </p>
            </div>

            {/* Artist Profile */}
            <div className="glass rounded-3xl p-8 border border-overlay/5 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-content/80 mb-5 uppercase tracking-wide">
                  Artist Profile
                </h3>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-[72px] h-[72px] rounded-full overflow-hidden border-2 border-overlay/10 shrink-0">
                    <img
                      src={artist?.image || "/placeholder.png"}
                      alt={artist?.username || "Artist"}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold line-clamp-1">
                      {artist?.username}
                    </h4>
                  </div>
                </div>
              </div>

              <Link
                href={`/u/${art?.data?.UserID}`}
                className="inline-flex items-center justify-between w-full py-3 px-4 bg-overlay/5 hover:bg-overlay/10 rounded-xl border border-overlay/10 transition-colors group"
              >
                <span className="text-sm font-semibold">View Profile</span>
                <ArrowRight
                  size={16}
                  className="text-accent transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
