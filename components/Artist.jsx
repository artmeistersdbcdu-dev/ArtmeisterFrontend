"use client";

import { useEffect, useMemo, useState } from "react";
import { ArtistCard } from "./ArtistCard";
import { ArtistsSectionSkeleton } from "./skeletons";
import useFetch from "@/hooks/useFetch";
import { getAllCoreMemberUser } from "@/service/user";
import { ChevronDown } from "lucide-react";

export const Artist = () => {
  const [artists, setArtists] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const {
    data: artistsRes,
    loading,
    fn: getArtists,
  } = useFetch(getAllCoreMemberUser);

  useEffect(() => {
    getArtists();
  }, []);

  useEffect(() => {
    if (artistsRes?.Success) {
      setArtists(artistsRes.Data);
    }
  }, [artistsRes]);

  const displayedArtists = useMemo(() => {
    return showAll ? artists : artists.slice(0, 7);
  }, [artists, showAll]);

  const hasMore = artists.length > displayedArtists.length;

  if (loading) {
    return <ArtistsSectionSkeleton />;
  }

  return (
    <section id="artists" className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="flex justify-between items-end mb-12">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <span className="text-content/60 font-semibold tracking-widest text-sm uppercase">
              OUR ARTISTS
            </span>
            <div className="h-px w-12 bg-content/20" />
          </div>

          <h2 className="font-heading font-bold text-4xl">Meet Our Creators</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4">
        {displayedArtists.map((artist) => (
          <div key={artist.ID} className="w-[300px] h-[425px] mb-9">
            <ArtistCard
              id={artist.ID}
              name={artist.Name}
              role={artist.Role}
              img={artist.Image?.String || "/placeholder.png"}
              instagram={artist.SocialLinks?.instagram}
              youtube={artist.SocialLinks?.youtube}
            />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center -mt-4 mb-12">
          <button
            onClick={() => setShowAll(true)}
            className="group flex items-center gap-2 px-6 py-2.5 rounded-full border border-content/20 text-content/70 text-sm font-medium tracking-wide hover:border-content/50 hover:text-content transition-colors duration-200"
          >
            View all artists
            <ChevronDown
              size={16}
              className="group-hover:translate-y-0.5 transition-transform duration-200"
            />
          </button>
        </div>
      )}
    </section>
  );
};