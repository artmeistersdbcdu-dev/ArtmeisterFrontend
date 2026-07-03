"use client";
import { ProfileSkeleton } from "@/components/skeletons";
import Link from "next/link";
import {
  MoveLeft,
  MoreVertical,
  Palette,
  ExternalLink,
  Upload,
  Pencil,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import { deleteArt, getAllArtistArt, getArtistProfile } from "@/service/art";
import { toast } from "sonner";
import { useAuthStore } from "@/store/user";
import { changeUserRoleStatus } from "@/service/admin";
import { canAssignRoles, canModerate } from "@/lib/roles";
import { RoleBadge } from "@/components/RoleBadge";
import ReactMarkdown from "react-markdown";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
export default function ArtistProfile() {
  const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const params = useParams();
  const router = useRouter();
  const [artist, setArtist] = useState(null);
  const [artistArtworks, setArtistArtworks] = useState([]);
  const user = useAuthStore((state) => state.user);
  const usrId = params.userId;
  const role = user?.ID === usrId ? "artist" : user?.Role;
  const {
    data,
    fn: getData,
    loading: fetchingData,
  } = useFetch(getArtistProfile);
  const {
    data: roledata,
    fn: changeFn,
    loading: updating,
  } = useFetch(changeUserRoleStatus);
  const {
    data: arts,
    fn: getArt,
    loading: fetchingArtworks,
  } = useFetch(getAllArtistArt);
  const {
    data: deletedData,
    fn: deleteFn,
    loading: deleting,
  } = useFetch(deleteArt);
  const isUserProfile = user?.ID === usrId;
  const hasHydrated = useAuthStore((state) => state._hasHydrated);
  const hasFetchedArt = useRef(false);
  const hasFetchedProfile = useRef(false);

  const handleStatusOfUser = (status) => {
    if (!canAssignRoles(user)) {
      toast.error("You are not authorized to perform this action");
      return;
    }
    changeFn(artist?.ID, { status: status });
  };
  const handleDelete = (id) => {
    if (role !== "artist") {
      toast.error("You are not authorized to perform this action");
      return;
    }
    deleteFn(id);
    setArtistArtworks(artistArtworks.filter((art) => art.ID !== id));
  };
  useEffect(() => {
    if (updating || !roledata) return;
    if (!roledata.Success) {
      toast.error(roledata.message);
      return;
    }
    setArtist({ ...artist, Status: roledata.Data.Status });
  }, [roledata, updating]);
  useEffect(() => {
    if (deleting || !deletedData) return;
    if (!deletedData.Success) {
      toast.error(deletedData.message);
      return;
    }
    setArtistArtworks(
      artistArtworks.filter((art) => art.ID !== deletedData.Data.ID),
    );
  }, [deletedData, deleting]);

  useEffect(() => {
    if (!usrId || !hasHydrated) return;
    if (isUserProfile) {
      if (hasFetchedArt.current) return;
      hasFetchedArt.current = true;

      setArtist(user);
      getArt(usrId);
      return;
    }

    if (hasFetchedProfile.current) return;
    hasFetchedProfile.current = true;
    getData(usrId);
  }, [usrId, user?.ID, hasHydrated]);
  useEffect(() => {
    if (!isUserProfile) {
      if (fetchingData || !data) return;

      if (!data.Success) {
        toast.error(data.message);
        return;
      }

      setArtist(data.Data.User);

      let artworks = data.Data.Art;

      if (role !== "artist" && !canModerate(user)) {
        artworks = artworks.filter((art) => art.Status === "approved");
      }

      setArtistArtworks(artworks);
    }
    if (isUserProfile) {
      if (fetchingArtworks || !arts) return;
      if (!user?.Username?.Valid || !user?.Username?.String?.trim()) {
        router.push("/onboarding");
        return;
      }
      if (!arts.Success) {
        toast.error(arts.message);
        return;
      }
      let artworks = arts.Data;
      if (role !== "artist" && !canModerate(user)) {
        artworks = artworks.filter((art) => art.Status === "approved");
      }
      setArtistArtworks(artworks);
    }
  }, [data, arts, isUserProfile, fetchingData, fetchingArtworks, role, user]);
  if (fetchingData || fetchingArtworks) {
    return <ProfileSkeleton />;
  }
  if (!artist) {
    return (
      <div className="min-h-screen bg-frosty text-content flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold mb-4">Artist Not Found</h1>
        <p className="text-gray-400 mb-8">
          The creator you're looking for doesn't exist in our community yet.
        </p>
        <Link
          href="/"
          className="text-accent hover:underline flex items-center gap-2"
        >
          <MoveLeft size={20} /> Back to Home
        </Link>
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-frosty text-content selection:bg-accent pb-20">
      <section className="relative h-[40vh] w-full rounded-2xl overflow-hidden">
        <img
          src={
            artist?.BannerImage?.Valid && artist?.BannerImage?.String
              ? artist.BannerImage.String
              : artist?.Image?.Valid && artist?.Image?.String
                ? artist.Image.String
                : "/default.jpeg"
          }
          alt={artist?.Name}
          className="w-full h-full object-cover blur-sm opacity-40 scale-110"
        />

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-8">
            <div className="relative md:-mb-10 w-32 h-32 md:w-60 md:h-60 rounded-full overflow-hidden shadow-2xl z-20 group border-4 border-black">
              <img
                src={
                  artist?.Image?.Valid && artist?.Image?.String
                    ? artist.Image.String
                    : "/default.jpeg"
                }
                alt={artist?.Name}
                className="w-full h-full object-cover"
              />

              {/* Hover overlay */}
            </div>

            <div className="flex-1 pb-4">
              <div className="flex items-center gap-3 mb-2">
                <RoleBadge role={artist?.Role} />
                <div className="h-px w-8 bg-accent/50"></div>
              </div>
              <div className="flex items-center gap-3 group">
                <h2 className="font-heading font-bold text-content text-5xl md:text-7xl leading-none tracking-tight">
                  {artist?.Username?.Valid
                    ? `@${artist.Username.String}`
                    : "Username not set"}
                </h2>
                {role === "artist" && (
                  <Link
                    href="/onboarding"
                    className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 p-2 rounded-full bg-overlay/10 hover:bg-overlay/20 border border-overlay/10 backdrop-blur-md"
                  >
                    <Pencil size={18} className="text-content/80" />
                  </Link>
                )}
                {canAssignRoles(user) &&
                  !canAssignRoles({ Role: artist?.Role }) && (
                    <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      {artist?.Status === "approved" ? (
                        <button
                          onClick={() => handleStatusOfUser("banned")}
                          className="px-4 py-2 rounded-full border border-red-400/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm font-medium backdrop-blur-md"
                        >
                          Ban User
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusOfUser("approved")}
                          className="px-4 py-2 rounded-full border border-green-400/20 bg-green-500/10 text-green-400 hover:bg-green-500/20 text-sm font-medium backdrop-blur-md"
                        >
                          Approve User
                        </button>
                      )}
                    </div>
                  )}
              </div>
              <p className="mt-2 text-gray-400 text-lg font-medium">
                {artist?.Name}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Sidebar Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="glass rounded-2xl p-8 border border-overlay/5">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Palette size={20} className="text-accent" />
              Artist Details
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                  Role
                </p>
                <RoleBadge role={artist?.Role} />
              </div>

              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                  Batch
                </p>
                <p className="text-content font-medium">
                  {artist?.Batch?.Valid && artist?.Batch?.String
                    ? artist.Batch.String
                    : "Not specified"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                  Status
                </p>
                <p
                  className={`px-4 py-2 rounded-full border ${
                    artist?.Status === "banned"
                      ? "border-red-400/20 bg-red-500/10 text-red-400"
                      : "border-green-400/20 bg-green-500/10 text-green-400"
                  } text-sm font-medium backdrop-blur-md w-fit`}
                >
                  {capitalizeFirst(artist?.Status)}
                </p>
              </div>

              {(artist?.SocialLinks?.instagram ||
                artist?.SocialLinks?.youtube) && (
                <div className="pt-4 border-t border-overlay/5 flex gap-4">
                  {artist?.SocialLinks?.instagram && (
                    <a
                      href={artist.SocialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl border border-overlay/10 flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all group"
                    >
                      <Image
                        src="/instagram.svg"
                        height={20}
                        width={20}
                        alt="Instagram"
                        className="group-hover:scale-110 transition-transform"
                      />
                    </a>
                  )}

                  {artist?.SocialLinks?.youtube && (
                    <a
                      href={artist.SocialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl border border-overlay/10 flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all group"
                    >
                      <Image
                        src="/youtube.svg"
                        height={20}
                        width={20}
                        alt="YouTube"
                        className="group-hover:scale-110 transition-transform"
                      />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 text-gray-500 hover:text-accent transition-colors group"
          >
            <MoveLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Community
          </Link>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          <div className="glass rounded-2xl p-10 border  shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">About</h2>

            <div className="text-gray-300 leading-relaxed markdown-content">
              {artist?.Description?.String?.trim() ? (
                <ReactMarkdown>{artist.Description.String}</ReactMarkdown>
              ) : (
                <p>This artist hasn't added a bio yet.</p>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Featured Works</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {artistArtworks?.map((art) => (
                <div
                  key={art.ID}
                  className="group relative aspect-square rounded-2xl overflow-hidden glass border border-overlay/5"
                >
                  {role === "artist" && (
                    <div className="absolute top-3 right-3 z-20">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="text-content bg-frosty/50 hover:bg-frosty/70 p-2 rounded-md">
                            <MoreVertical size={16} />
                          </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              handleDelete(art.ID);
                            }}
                            className="text-red-500 focus:text-red-500"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                  <img
                    src={art.Image}
                    alt={art.Name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                    <h4 className="text-xl font-bold text-content mb-1">
                      {art.Name}
                    </h4>

                    <p className="text-gray-300 text-sm line-clamp-2">
                      {art.Description?.String}
                    </p>

                    <div className="mt-4 flex items-center gap-3 flex-wrap">
                      <Link href={`/u/${usrId}/${art.ID}`}>
                        <button className="text-accent text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity">
                          View Details <ExternalLink size={12} />
                        </button>
                      </Link>

                      {/* Artist can edit */}
                      {role === "artist" && (
                        <Link href={`/art/create?id=${art.ID}`}>
                          <button className="text-yellow-400 text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">
                            Edit
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isUserProfile && (
                <>
                  <div className="flex items-center justify-center">
                    <Link
                      href={"/art/create"}
                      className="flex items-center gap-2 justify-center rounded-full h-12 w-30 border bg-background font-semibold text-foreground text-center"
                    >
                      <Upload size={24} />
                      Upload
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
