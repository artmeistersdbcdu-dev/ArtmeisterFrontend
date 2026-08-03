"use client";

import useFetch from "@/hooks/useFetch";
import { getLatestArt } from "@/service/art";
import { useEffect } from "react";
import { useState } from "react";
import { ArtSectionSkeleton } from "./skeletons";
import ArtCard from "./ArtCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Art = () => {
  const { data: artRes, loading, fn: getArt } = useFetch(getLatestArt);
  const [arts, setArts] = useState([]);
  useEffect(() => {
    getArt();
  }, []);
  useEffect(() => {
    if (!artRes?.Success) {
      return;
    }
    setArts(artRes?.Data);
  }, [artRes]);
  if (loading) {
    return <ArtSectionSkeleton />;
  }
  if (!artRes?.Success) {
    return (
      <div className="w-full flex items-center justify-center">
        No Art Available
      </div>
    );
  }
  return (
    <section id="arts" className="max-w-7xl mx-auto px-6 md:px-12 space-y-10">
      <div className="flex justify-between items-end mb-12">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <span className="text-content/60 font-semibold tracking-widest text-sm uppercase">
              OUR ARTS
            </span>
            <div className="h-px w-12 bg-content/20" />
          </div>

          <h2 className="font-heading text-red-700 font-bold text-4xl">Explore Our Gallery</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {arts.map((art) => (
          <div
            key={art.ID}
            className="break-inside-avoid overflow-hidden rounded-2xl relative group cursor-pointer"
          >
            <ArtCard art={art} />
          </div>
        ))}
        <Link
          href="/art"
          className="flex items-center py-7 justify-center gap-2 rounded-2xl border border-dashed border-gray-300 hover:border-gray-500 transition-colors group"
        >
          <span className="text-lg font-semibold">Explore Gallery</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default Art;
