"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import data from "@/data.json";
import Link from "next/link";
import { MoveLeft, Calendar, MapPin, Clock, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import {
  deleteEvent,
  getEventById,
  getMyEvent,
  joinEvent,
} from "@/service/event";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/user";
import { toast } from "sonner";
import { EventDetailSkeleton } from "@/components/skeletons";
import { canModerate } from "@/lib/roles";

// Helper to parse backend EventDate and extract day, month, and full readable date format
const parseEventDate = (dateStr) => {
  if (!dateStr) return { day: "", month: "", fullDate: "" };
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return { day: "", month: "", fullDate: "" };

    const day = date.getDate().toString().padStart(2, "0");
    const month = date
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    const fullDate = date.toLocaleDateString("default", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return { day, month, fullDate };
  } catch (e) {
    console.error("Error parsing date:", e);
    return { day: "", month: "", fullDate: "" };
  }
};

export default function EventDetail() {
  const router = useRouter();
  const params = useParams();
  const [isRegistered, setisRegistered] = useState(false);
  const user = useAuthStore((state) => state.user);
  const [event, setEvent] = useState(null);
  const isModerator = canModerate(user);
  const isBanned = user?.Status === "banned";
  const eventId = params.eventId;
  const {
    data: eventDetails,
    fn: getEventFn,
    loading: getEventLoading,
    errors: getEventError,
  } = useFetch(getEventById);
  const {
    data: deletedEvent,
    fn: deleteEventfn,
    loading: deletingEvent,
  } = useFetch(deleteEvent);
  const {
    data: myEventDetails,
    fn: myEventFn,
    loading: myEventLoading,
  } = useFetch(getMyEvent);
  const {
    data: registerEventDetails,
    fn: registerEventFn,
    loading: registerEventLoading,
  } = useFetch(joinEvent);
  const handleEventClick = () => {
    if (user?.Status == "banned") {
      toast.error("You are banned from registering for events");
      return;
    }

    if (!user) {
      toast.error("Please Login First");
      return;
    }
    registerEventFn(eventId);
  };
  useEffect(() => {
    if (!registerEventLoading && registerEventDetails?.Success) {
      router.push(`/my-events`);
    }
  }, [registerEventDetails, registerEventLoading]);
  const featured = data.featuredEvent;
  const isDisabled = () => {
    if (event) return isBanned || (isRegistered && !isModerator);
    const eventDate = new Date(event.EventDate);
    const now = new Date();
    return now > eventDate;
  };
  const handleDeleteEvent = () => {
    deleteEventfn(eventId);
  };
  useEffect(() => {
    getEventFn(eventId);
    if (user?.Username?.Valid) {
      myEventFn(eventId);
    }
  }, [eventId, user]);
  useEffect(() => {
    if (deletedEvent?.Success) {
      toast.success(deletedEvent?.Message);
      router.push("/event");
    }
  }, [deletedEvent]);

  useEffect(() => {
    if (!getEventLoading && eventDetails?.Success) {
      setEvent(eventDetails?.Data);
    }
  }, [eventDetails, getEventLoading]);
  useEffect(() => {
    if (!myEventLoading && myEventDetails?.Success) {
      setisRegistered(true);
    }
  }, [myEventDetails, myEventLoading]);

  if (getEventLoading) {
    return <EventDetailSkeleton />;
  }

  if (
    getEventError ||
    (eventDetails && !eventDetails.Success) ||
    (!getEventLoading && !event)
  ) {
    return (
      <div className="min-h-screen bg-frosty text-content flex flex-col items-center justify-center p-6 text-center selection:bg-red-500">
        <h1 className="text-4xl font-bold mb-4 text-red-500">
          Event Not Found
        </h1>
        <p className="text-gray-400 mb-8 max-w-md">
          {getEventError?.message ||
            eventDetails?.message ||
            "The event you're looking for doesn't exist or has been removed."}
        </p>
        <Link
          href="/"
          className="text-red-400 hover:text-red-300 hover:underline flex items-center gap-2 transition"
        >
          <MoveLeft size={20} /> Back to Home
        </Link>
      </div>
    );
  }
  const getButtonConfig = () => {
    if (isBanned)
      return {
        label: "Register Now",
        disabled: true,
        title: "You are banned from registering",
      };

    if (isRegistered)
      return {
        label: "Already Registered",
        disabled: true,
        title: "You already registered",
      };

    if (eventState === "Ongoing")
      return {
        label: "Join Live",
        disabled: false,
        title: "",
      };

    return {
      label: "Register Now",
      disabled: false,
      title: "",
    };
  };

  const { label, disabled, title } = getButtonConfig();
  const isFeatured = featured && featured.title === event.Name;

  const { day, month, fullDate } = parseEventDate(event.EventDate);
  const getEventState = (eventDate) => {
    const now = new Date();
    const start = new Date(eventDate);

    // assuming event lasts 1 day
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    if (now < start) return "Upcoming";
    if (now >= start && now <= end) return "Ongoing";
    return "Completed";
  };

  const eventState = getEventState(event.EventDate);

  // Fallbacks: Image.String fallback is /logo.png, and BannerImage.String fallback is /default.jpeg
  const logoSrc = event.Image?.String || "/logo.png";
  const bannerSrc =
    (isFeatured ? featured.image : null) ||
    event.BannerImage?.String ||
    "/default.jpeg";

  return (
    <main className="min-h-screen bg-frosty text-content selection:bg-red-500 pb-20">
      <section className="w-full ">
        <div className="relative w-full h-[300px] md:h-[480px] overflow-hidden border-y border-overlay/10">
          <img
            src={bannerSrc}
            alt={event.Name || "Event Banner"}
            className="w-full h-full blur-sm object-cover scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent"></div>

          <div className="absolute inset-0 flex items-end">
            <div className="max-w-6xl mx-auto w-full px-6 md:px-12 pb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden bg-frosty/60 backdrop-blur-md border border-overlay/10 shadow-xl flex items-center justify-center">
                  <img
                    src={logoSrc}
                    alt="Event Logo"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
                        eventState === "Upcoming"
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : eventState === "Ongoing"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-overlay/10 text-gray-300 border border-overlay/10"
                      }`}
                    >
                      {eventState === "Upcoming"
                        ? "● Upcoming"
                        : eventState === "Ongoing"
                          ? "● Ongoing"
                          : "● Completed"}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-3xl md:text-6xl leading-tight">
                    {event.Name}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-xl bg-frosty/70 backdrop-blur-md border border-overlay/10">
                  <span className="text-content font-bold text-2xl md:text-3xl leading-none">
                    {day}
                  </span>
                  <span className="text-content/60 font-semibold tracking-widest text-xs uppercase mt-1">
                    {month}
                  </span>
                </div>

                {eventState !== "Completed" && (
                  <div className="flex gap-3">
                    {/* Main button */}
                    <div className="flex gap-3">
                      {/* Edit button for admin */}
                      {isModerator && (
                        <>
                          <Link href={`/admin/events/create?id=${eventId}`}>
                            <button className="px-6 py-3 rounded-xl bg-zinc-700 text-content font-bold text-sm md:text-base hover:bg-zinc-600 transition shadow-lg">
                              Edit Event
                            </button>
                          </Link>
                          <Link href={`/event/${eventId}/member`}>
                            <button
                              className="px-6 py-3 rounded-xl bg-red-500 text-content font-bold text-sm md:text-base hover:bg-red-600 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Check Attendees
                            </button>
                          </Link>
                        </>
                      )}

                      {/* Main action button (for everyone, including admin) */}
                      <button
                        onClick={handleEventClick}
                        disabled={disabled}
                        title={title}
                        className="px-6 py-3 rounded-xl bg-red-500 text-content font-bold text-sm md:text-base hover:bg-red-600 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {label}
                      </button>
                    </div>

                    {/* Delete button for admin */}

                    {isModerator && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition">
                            <Trash2 size={18} className="text-red-400" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete Event from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className={
                                "bg-red-500 text-content hover:bg-red-600"
                              }
                              onClick={() => handleDeleteEvent()}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 md:px-12 mt-12 space-y-8">
        <div className="rounded-2xl p-8 border border-overlay/10 bg-overlay/5 backdrop-blur-md">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Calendar size={20} className="text-red-400" />
            Event Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                Date
              </p>
              <p className="text-content font-medium flex items-center gap-2">
                <Calendar size={14} className="text-red-400" />
                {fullDate || `${day} ${month}`}{" "}
                {isFeatured ? ` · ${featured.date}` : ""}
              </p>
            </div>

            {isFeatured && featured.location && (
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                  Location
                </p>
                <p className="text-content font-medium flex items-center gap-2">
                  <MapPin size={14} className="text-red-400" />
                  {featured.location}
                </p>
              </div>
            )}

            {isFeatured && featured.time && (
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                  Time
                </p>
                <p className="text-content font-medium flex items-center gap-2">
                  <Clock size={14} className="text-red-400" />
                  {featured.time}
                </p>
              </div>
            )}

            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                Organized by
              </p>
              <p className="text-content font-medium">{data.siteName}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-8 md:p-10 border border-overlay/10 bg-overlay/5 backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-4">About This Event</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            {event.Description?.String}
          </p>

          {isFeatured && (
            <p className="text-gray-300 leading-relaxed mt-4 text-lg">
              {featured.subtitle} — Join us on{" "}
              <span className="text-red-400 font-semibold">
                {featured.date}
              </span>{" "}
              at{" "}
              <span className="text-red-400 font-semibold">
                {featured.location}
              </span>
              . Doors open at{" "}
              <span className="text-red-400 font-semibold">
                {featured.time}
              </span>
              .
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
