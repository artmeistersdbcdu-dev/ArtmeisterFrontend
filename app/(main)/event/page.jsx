"use client";
import React, { useEffect, useRef, useState } from "react";
import { EventCard } from "./_components/EventCard";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { getAllEvents } from "@/service/event";
import { useAuthStore } from "@/store/user";
import useFetch from "@/hooks/useFetch";
import { EventsListSkeleton } from "@/components/skeletons";
import { canModerate } from "@/lib/roles";
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
export default function EventPage() {
  const [allEvents, setAllEvents] = useState(null);
  const { data, fn, loading } = useFetch(getAllEvents);
  const user = useAuthStore((state) => state.user);
  const isAdmin = canModerate(user);
  const containerRef = useRef(null);
  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data?.Success) {
      setAllEvents(data.Data);
    }
  }, [data, loading]);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".event-card-link");

      gsap.from(cards, {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <main className="min-h-screen bg-frosty  pb-20 selection:bg-red-500/30">
      <section className="container mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="mb-24 space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-red-500/20 bg-red-500/5 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 font-bold tracking-[0.2em] text-[10px] uppercase">
              Upcoming Experiences
            </span>
          </div>

          <h2 className="text-6xl md:text-[8vw] font-bold text-content leading-[0.9] tracking-tighter">
            EVENTS & <br />
            <span className="text-transparent bg-clip-text bg-linear-to-br from-red-400 via-red-600 to-red-900">
              SHOWCASES
            </span>
          </h2>

          <p className="text-muted-foreground text-lg md:text-2xl max-w-2xl font-light leading-relaxed">
            Discover the intersection of tradition and innovation. Join our
            curated series of events designed to inspire the next generation of
            creators.
          </p>
        </div>

        {/* Events Grid */}
        {loading ? (
          <EventsListSkeleton />
        ) : (
          <div
            ref={containerRef}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-14"
          >
            {allEvents?.map((event) => (
              <Link
                key={event.ID}
                href={`/event/${event.ID}`}
                className="event-card-link block h-full"
              >
                <EventCard event={event} isAdmin={isAdmin} />
              </Link>
            ))}
          </div>
        )}
      </section>

      <div className="fixed top-0 right-0 -z-10 w-[50vw] h-[50vw] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 -z-10 w-[30vw] h-[30vw] bg-red-600/5 blur-[100px] rounded-full pointer-events-none" />
    </main>
  );
}
