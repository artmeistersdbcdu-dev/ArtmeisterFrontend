"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { getAllArt } from "@/service/art";
import Link from "next/link";
import { ArtGallerySkeleton } from "@/components/skeletons";

const ITEMS_PER_BATCH = 12;

const Page = () => {

  const { data: arts, loading, fn: getArts } = useFetch(getAllArt);
  const [allArts, setAllArts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);
  useEffect(() => {}, [arts, loading]);
  const loaderRef = useRef(null);

  useEffect(() => {
    getArts();
  }, []);

  useEffect(() => {
    if (!loading && arts?.Success) {
      const fetched = arts.Data || [];
      setAllArts(fetched);
      setVisibleCount(ITEMS_PER_BATCH);
    }
  }, [arts, loading]);

  const visibleArts = allArts.slice(0, visibleCount);
  const hasMore = visibleCount < allArts.length;

  // Stable callback — reads latest state via functional update
  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + ITEMS_PER_BATCH);
  }, []);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { rootMargin: "200px" },
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  if (loading) {
    return <ArtGallerySkeleton />;
  }

  return (
    <section>
      <div className="min-h-screen bg-frosty text-content px-6 py-10">
        <div className="mb-10 text-center">
          <h2 className="text-5xl font-bold tracking-tight">
            Art <span className="text-red-700 mx-2">Exhibition</span>
          </h2>
          <p className="text-content/60 mt-2">
            Discover creativity in every frame.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 space-y-3">
          {visibleArts.map((art) => (
            <div
              key={art.ID}
              className="break-inside-avoid overflow-hidden rounded-2xl relative group cursor-pointer"
            >
              <Link href={`/u/${art.UserID}/${art.ID}`}>
                <img
                  src={art.Image}
                  alt={art.Name}
                  className="w-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-frosty/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex flex-col justify-end p-4">
                  <p className="font-semibold text-content">{art.Name}</p>
                  {art.Description?.Valid && (
                    <p className="text-sm text-content/70">
                      {art.Description.String}
                    </p>
                  )}
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {art.Tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-overlay/20 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {hasMore && (
          <div
            ref={loaderRef}
            className="flex justify-center py-10 text-content/60"
          >
            Loading more art...
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
