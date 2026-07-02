"use client";
import React, { useEffect, useRef } from "react";
import {
  Calendar,
  ArrowRight,
  MoreVertical,
  Trash2,
  Pencil,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import gsap from "gsap";
import { deleteEvent } from "@/service/event";
import useFetch from "@/hooks/useFetch";
import { toast } from "sonner";

export const EventCard = ({ event, isAdmin }) => {
    const getEventState = (eventDate) => {
    const now = new Date();
    const start = new Date(eventDate);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    if (now < start) return "Upcoming";
    if (now >= start && now <= end) return "Ongoing";
    return "Completed";
  };
  const eventState = getEventState(event.EventDate);
  const {
    data: deletedEventData,
    fn: deleteEventFn,
    loading: deletingEvent,
  } = useFetch(deleteEvent);
  const handleDelete = (id) => {
    if (!isAdmin) return;
    if (deletingEvent) return;
    deleteEventFn(id);
  };
  useEffect(() => {
    if (deletedEventData) {
      toast.success("Event deleted successfully");
      fn();
    }
  }, [deletedEventData]);
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const arrowRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(imageRef.current, {
      scale: 1.1,
      duration: 0.6,
      ease: "power2.out",
    });
    gsap.to(arrowRef.current, {
      x: 5,
      opacity: 1,
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    });
    gsap.to(arrowRef.current, {
      x: 0,
      opacity: 0.7,
      duration: 0.3,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden rounded-[2.5rem] border border-overlay/10 bg-overlay/5 backdrop-blur-md transition-all duration-300 hover:border-overlay/20 hover:shadow-2xl hover:shadow-red-500/10 cursor-pointer h-full"
    >
      {/* Image Section */}
      <div className="relative h-72 w-full overflow-hidden">
        <img
          ref={imageRef}
          src={event?.Image?.String || "/default.jpeg"}
          alt={event?.Name}
          className="h-full w-full object-cover transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />

        {/* Date Badge */}
        <div className="absolute top-6 left-6 flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-frosty/60 backdrop-blur-xl border border-overlay/10 shadow-xl">
          <span className="text-content font-bold text-2xl leading-none">
            {new Date(event?.EventDate).getDate()}
          </span>
          <span className="text-content/60 font-semibold tracking-widest text-[11px] uppercase mt-1">
            {new Date(event?.EventDate).toLocaleString("default", {
              month: "short",
            })}
          </span>
        </div>
        {/* Delete Button */}
        {isAdmin && (
          <div className="absolute top-20 right-6 z-20">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-xl bg-frosty/50 backdrop-blur-xl border border-overlay/10 text-content hover:bg-overlay/10 transition-all"
                >
                  <MoreVertical size={18} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-44 bg-frosty/90 border border-overlay/10 text-content"
              >
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();

                    // edit logic
                  }}
                  className="cursor-pointer"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Event
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();

                    handleDelete(event?.ID);
                  }}
                  className="cursor-pointer text-red-400 focus:text-red-400"
                  disabled={deletingEvent}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Event
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        {/* Status Badge */}
        <div className="absolute top-6 right-6">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
              eventState === "Upcoming"
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : eventState === "Ongoing"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-overlay/10 text-muted-foreground border border-overlay/10"
            }`}
          >
            {eventState === "Upcoming"
              ? "● Upcoming"
              : eventState === "Ongoing"
                ? "● Ongoing"
                : "● Completed"}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col grow space-y-4">
        <h3 className="text-3xl font-bold text-content group-hover:text-red-400 transition-colors duration-300 leading-tight">
          {event?.Name}
        </h3>

        <p className="text-muted-foreground line-clamp-2 text-base leading-relaxed font-light">
          {event?.Description?.String}
        </p>

        <div className="mt-auto pt-6 flex items-center justify-between border-t border-overlay/5">
          <div className="flex items-center gap-3 text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em]">
            <Calendar size={16} className="text-red-500" />
            <span>{event?.Venue?.String || "ART SOCIETY EVENT"}</span>
          </div>

          <div ref={arrowRef} className="opacity-70 group-hover:text-red-400">
            <ArrowRight size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};
