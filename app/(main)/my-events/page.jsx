"use client";
import React, { useEffect, useState } from "react";
import { EventCard } from "../event/_components/EventCard";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import { getMyAllEvents } from "@/service/event";
import { EventsListSkeleton } from "@/components/skeletons";

const MyEvent = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const { data, fn, loading } = useFetch(getMyAllEvents);

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data?.Success) {
      setRegisteredEvents(data?.Data || []);
    }
  }, [data, loading]);

  return (
    <section className="min-h-screen bg-frosty pb-20 selection:bg-red-500/30">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-24 space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-red-500/20 bg-red-500/5 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 font-bold tracking-[0.2em] text-[10px] uppercase">
              My Registered Events
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-3xl flex flex-wrap justify-center items-center gap-4 md:text-5xl lg:text-6xl font-bold text-content leading-tight tracking-tight">
              My
              <span className="text-transparent bg-clip-text bg-linear-to-br from-red-400 via-red-600 to-red-900">
                EVENTS
              </span>
            </h2>

            <p className="text-gray-400 text-sm text-center  md:text-md max-w-2xl font-light leading-relaxed">
              All the events you’ve registered for—your creative journey, neatly
              lined up like browser tabs you swear you’ll revisit.
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <EventsListSkeleton/>
        )}

        {/* Empty State */}
        {!loading && registeredEvents.length === 0 && (
          <div className="text-center text-gray-500 py-20 text-lg">
            No registered events yet.
          </div>
        )}

        {/* Events Grid */}
        {!loading && registeredEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-14">
            {registeredEvents.map((event) => (
              <Link
                key={event.ID}
                href={`/event/${event.ID}`}
                className="event-card-link block h-full"
              >
                <EventCard event={event} isAdmin={false} />
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Background blur */}
      <div className="fixed top-0 right-0 -z-10 w-[50vw] h-[50vw] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 -z-10 w-[30vw] h-[30vw] bg-red-600/5 blur-[100px] rounded-full pointer-events-none" />
    </section>
  );
};

export default MyEvent;
