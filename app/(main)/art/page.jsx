"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { getAllArt } from "@/service/art";
import Link from "next/link";
import { ArtGallerySkeleton } from "@/components/skeletons";

const ITEMS_PER_BATCH = 12;

const Page = () => {
  const data = [
    {
      ID: "a1b2c3d4-e5f6-7890-ab12-cd34ef567890",
      Name: "Midnight Sketch",
      Description: {
        String: "A raw pencil study of urban loneliness.",
        Valid: true,
      },
      Image: "/Drawing.png",
      Tags: ["illustration", "digital-art"],
      Status: "approved",
    },
    {
      ID: "b2c3d4e5-f678-9012-ab34-cd56ef789012",
      Name: "Fading Horizon",
      Description: {
        String: "Soft gradients over a distant sunset.",
        Valid: true,
      },
      Image: "/Drawing1.png",
      Tags: ["painting", "photography"],
      Status: "approved",
    },
    {
      ID: "a1b2c3d4-e5f6-7890-ab12-cd3w4ef567890",
      Name: "Midnight Sketch",
      Description: {
        String: "A raw pencil study of urban loneliness.",
        Valid: true,
      },
      Image: "/Drawing.png",
      Tags: ["illustration", "digital-art"],
      Status: "approved",
    },
    {
      ID: "b2c3d4e5-f678-9012-abww34-cd56ef789012",
      Name: "Fading Horizon",
      Description: {
        String: "Soft gradients over a distant sunset.",
        Valid: true,
      },
      Image: "/Drawing1.png",
      Tags: ["painting", "photography"],
      Status: "approved",
    },
    {
      ID: "c3d4e5f6-7890-1234-ab56-cd78ef901234",
      Name: "Fragments",
      Description: {
        String: "Abstract broken shapes forming emotion.",
        Valid: true,
      },
      Image: "/Drawing2.png",
      Tags: ["3d", "digital-art"],
      Status: "approved",
    },
    {
      ID: "d4e5f678-9012-3456-ab78-cd90ef123456",
      Name: "Ink Bloom",
      Description: {
        String: "Experimental ink textures and shadows.",
        Valid: true,
      },
      Image: "/Drawing3.png",
      Tags: ["illustration", "painting"],
      Status: "approved",
    },
    {
      ID: "c3d4e5f6-789swwsws0-1234-ab56-cd78ef901234",
      Name: "Fragments",
      Description: {
        String: "Abstract broken shapes forming emotion.",
        Valid: true,
      },
      Image: "/Drawing2.png",
      Tags: ["3d", "digital-art"],
      Status: "approved",
    },
    {
      ID: "d4e5f6swwsswsw78-9012-3456-ab78-cd90ef123456",
      Name: "Ink Bloom",
      Description: {
        String: "Experimental ink textures and shadows.",
        Valid: true,
      },
      Image: "/Drawing3.png",
      Tags: ["illustration", "painting"],
      Status: "approved",
    },
    {
      ID: "d4e5f6saaazwwsswsw78-9012-3456-ab78-cd90ef123456",
      Name: "Ink Bloom",
      Description: {
        String: "Experimental ink textures and shadows.",
        Valid: true,
      },
      Image: "/Drawing3.png",
      Tags: ["illustration", "painting"],
      Status: "approved",
    },
    {
      ID: "dsswwsw4e5f6saaazwwsswsw78-9012-3456-ab78-cd90ef123456",
      Name: "Ink Bloom",
      Description: {
        String: "Experimental ink textures and shadows.",
        Valid: true,
      },
      Image: "/Drawing3.png",
      Tags: ["illustration", "painting"],
      Status: "approved",
    },
    {
      ID: "dsswwsw4e5f6saaazwwsswwddwwsw78-9012-3456-ab78-cd90ef123456",
      Name: "Ink Bloom",
      Description: {
        String: "Experimental ink textures and shadows.",
        Valid: true,
      },
      Image: "/Drawing3.png",
      Tags: ["illustration", "painting"],
      Status: "approved",
    },
    {
      ID: "dsswwsw4e5f6saaazwwsswdwdwdwdwdwwsw78-9012-3456-ab78-cd90ef123456",
      Name: "Ink Bloom",
      Description: {
        String: "Experimental ink textures and shadows.",
        Valid: true,
      },
      Image: "/Drawing3.png",
      Tags: ["illustration", "painting"],
      Status: "approved",
    },
    {
      ID: "e5f67890-1234-5678-ab90-cd12ef345678",
      Name: "Lost Frequency",
      Description: {
        String: "Sound visualized in chaotic waves.",
        Valid: true,
      },
      Image: "/Drawing4.png",
      Tags: ["digital-art", "3d"],
      Status: "approved",
    },
    {
      ID: "f6789012-3456-7890-ab12-cd34ef567891",
      Name: "Dream Archive",
      Description: {
        String: "A surreal memory trapped in colors.",
        Valid: true,
      },
      Image: "/Drawing5.png",
      Tags: ["painting", "illustration"],
      Status: "approved",
    },
    {
      ID: "67890123-4567-8901-ab23-cd45ef678912",
      Name: "Neon Silence",
      Description: {
        String: "Cyberpunk street under heavy rain.",
        Valid: true,
      },
      Image: "/Drawing6.png",
      Tags: ["digital-art", "photography"],
      Status: "approved",
    },
    {
      ID: "78901234-5678-9012-ab34-cd56ef789123",
      Name: "Velvet Night",
      Description: {
        String: "Dark shades with a glowing skyline.",
        Valid: true,
      },
      Image: "/Event1.jpeg",
      Tags: ["photography", "digital-art"],
      Status: "approved",
    },
    {
      ID: "89012345-6789-0123-ab45-cd67ef891234",
      Name: "Crimson Theory",
      Description: {
        String: "Red textures blending with emotion.",
        Valid: true,
      },
      Image: "/Event2.jpeg",
      Tags: ["painting", "3d"],
      Status: "approved",
    },
    {
      ID: "90123456-7890-1234-ab56-cd78ef912345",
      Name: "Golden Dust",
      Description: {
        String: "Particles of gold over dark canvas.",
        Valid: true,
      },
      Image: "/Event3.jpeg",
      Tags: ["illustration", "painting"],
      Status: "approved",
    },
    {
      ID: "01234567-8901-2345-ab67-cd89ef023456",
      Name: "Echo Valley",
      Description: {
        String: "Silent landscapes with layered sound.",
        Valid: true,
      },
      Image: "/Event4.jpeg",
      Tags: ["photography", "illustration"],
      Status: "approved",
    },
    {
      ID: "12345678-9012-3456-ab78-cd90ef134567",
      Name: "Broken Symmetry",
      Description: { String: "Geometry in imperfect balance.", Valid: true },
      Image: "/default.jpeg",
      Tags: ["3d", "digital-art"],
      Status: "approved",
    },
    {
      ID: "23456789-0123-4567-ab89-cd01ef245678",
      Name: "Pulse Machine",
      Description: {
        String: "Mechanical life rendered in steel.",
        Valid: true,
      },
      Image: "/brush.png",
      Tags: ["3d", "illustration"],
      Status: "approved",
    },
    {
      ID: "34567890-1234-5678-ab90-cd12ef356789",
      Name: "Noise Layer",
      Description: { String: "Textured static in visual form.", Valid: true },
      Image: "/noise.png",
      Tags: ["digital-art", "painting"],
      Status: "approved",
    },
    {
      ID: "45678901-2345-6789-ab01-cd23ef467890",
      Name: "Portrait Zero",
      Description: { String: "A study of human silence.", Valid: true },
      Image: "/me.png",
      Tags: ["photography", "illustration"],
      Status: "approved",
    },
    {
      ID: "56789012-3456-7890-ab12-cd34ef578901",
      Name: "Paper Sky",
      Description: { String: "Clouds folded like paper cranes.", Valid: true },
      Image: "/Drawing.png",
      Tags: ["illustration", "painting"],
      Status: "approved",
    },
    {
      ID: "67890123-4567-8901-ab23-cd45ef689012",
      Name: "Glass City",
      Description: {
        String: "A futuristic city reflected in glass.",
        Valid: true,
      },
      Image: "/Drawing2.png",
      Tags: ["3d", "digital-art"],
      Status: "approved",
    },
    {
      ID: "78901234-5678-9012-ab34-cd56ef790123",
      Name: "Afterglow",
      Description: {
        String: "Light remains after darkness leaves.",
        Valid: true,
      },
      Image: "/Event2.jpeg",
      Tags: ["photography", "painting"],
      Status: "approved",
    },
    {
      ID: "89012345-6789-0123-ab45-cd67ef801234",
      Name: "Static Bloom",
      Description: { String: "Flowers growing in digital noise.", Valid: true },
      Image: "/noise.png",
      Tags: ["digital-art", "illustration"],
      Status: "approved",
    },
    {
      ID: "90123456-7890-1234-ab56-cd78ef912346",
      Name: "Blue Onion Origin",
      Description: { String: "The first layer of chaos and art.", Valid: true },
      Image: "/Logo.jpeg",
      Tags: ["branding", "digital-art"],
      Status: "approved",
    },
  ];
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
