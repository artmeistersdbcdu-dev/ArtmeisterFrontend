"use client";

import React, { useState } from "react";
import { ArtistCard } from "./ArtistCard";

import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { getAllCoreMemberUser } from "@/service/user";
import { ArtistsSectionSkeleton } from "./skeletons";
export const Artist = () => {
  const [artists, setArtist] = useState(null);
  const {
    data: artistsRes,
    loading,
    fn: getArtists,
  } = useFetch(getAllCoreMemberUser);
  useEffect(() => {
    getArtists();
  }, []);
  useEffect(() => {
    if (artistsRes && artistsRes.Success) {
      setArtist(artistsRes.Data);
    }
  }, [artistsRes, loading]);
if(loading){
  return <ArtistsSectionSkeleton/>
}
  return (
    <section id="artists" className="max-w-7xl mx-auto px-6 md:px-12 ">
      <div className="flex justify-between items-end mb-12">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <span className="text-content/60 font-semibold tracking-widest text-sm uppercase">
              OUR ARTISTS
            </span>
            <div className="h-px w-12 bg-content/20"></div>
          </div>
          <h2 className="font-heading font-bold text-4xl">Meet Our Creators</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {artists?.map((artist) => (
          <ArtistCard
            key={artist.ID}
            id={artist.ID}
            name={artist.Name}
            role={artist.Role}

            img={artist.Image?.String||"/placeholder.png"}
            instagram={artist.SocialLinks?.instagram}
            youtube={artist.SocialLinks?.youtube}
          />
        ))}
      </div>
    </section>
  );
};
