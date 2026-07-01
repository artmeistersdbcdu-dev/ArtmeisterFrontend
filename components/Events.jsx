import React from "react";
import { EventListItem } from "./EventListItem";
import { MoveRight, Calendar, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllEvents } from "@/service/event";
import useFetch from "@/hooks/useFetch";
import { EventsSectionSkeleton } from "./skeletons";
export const Events = () => {
  const [events, setEvents] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const { data: eventsRes, loading, fn: getEvents } = useFetch(getAllEvents);

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    if (eventsRes?.Success) {
      setEvents(eventsRes?.Data);
      if (eventsRes?.Data?.length > 0) {
        setSelectedEvent(eventsRes.Data[0]);
      }
    }
  }, [eventsRes]);
  if(loading){
   return <EventsSectionSkeleton/>
  }
  return (
    <section id="events" className="max-w-7xl mx-auto px-6 md:px-12 mb-32">
      <div className="flex justify-between items-end mb-12">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <span className="text-accent font-semibold tracking-widest text-sm uppercase">
              UPCOMING EVENTS
            </span>

            <div className="h-px w-12 bg-accent/50"></div>
          </div>

          <h2 className="font-heading font-bold text-4xl text-red-500">
            What's Happening
          </h2>
        </div>

        <Link
          href="/event"
          className="text-accent hover:text-red-400 items-center gap-2 font-medium group transition-colors hidden sm:flex"
        >
          VIEW ALL EVENTS
          <MoveRight
            className="group-hover:translate-x-1 transition-transform"
            size={16}
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Event List */}

        <div className="flex flex-col gap-4 lg:col-span-1">
          {events?.slice(0, 3)?.map((event) => (
            <div
              key={event.ID}
              onClick={() => setSelectedEvent(event)}
              className="cursor-pointer"
            >
              <EventListItem
                id={event.ID}
                date={new Date(event.EventDate).getDate()}
                month={new Date(event.EventDate).toLocaleString("default", {
                  month: "short",
                })}
                title={event.Name}
                desc={event.Description?.String}
                active={event.Status === "online"}
              />
            </div>
          ))}
        </div>

        {/* Featured Event */}

        {selectedEvent && (
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden group glass h-[400px]">
            <img
              src={selectedEvent?.Image?.String}
              alt={selectedEvent.Name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent"></div>

            <div className="absolute bottom-0 left-0 p-8 w-full">
              <span className="bg-accent text-content text-xs font-bold px-3 py-1 rounded uppercase tracking-wider mb-4 inline-block">
                {selectedEvent?.Status?.String}
              </span>

              <h3 className="font-heading font-bold text-3xl mb-2">
                {selectedEvent?.Name}
              </h3>

              <p className="text-gray-300 mb-6">
                {selectedEvent.Description?.String.slice(0,90)}....
              </p>

              <div className="flex flex-wrap gap-6 mb-8 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-accent" />

                  {new Date(selectedEvent.EventDate).toDateString()}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-accent" />
                  {selectedEvent.Venue?.String || "Venue TBA"}
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-accent" />

                  {new Date(selectedEvent.EventDate).toLocaleTimeString()}
                </div>
              </div>

              <Link href={`/event/${selectedEvent.ID}`} className="w-fit">
                <button className="bg-accent hover:bg-red-700 text-content px-6 py-2 rounded-full font-medium flex items-center gap-2 transition-all">
                  LEARN MORE <MoveRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
