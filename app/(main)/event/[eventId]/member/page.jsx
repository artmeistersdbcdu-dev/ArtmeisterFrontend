"use client";
import { AttendeesSkeleton } from "@/components/skeletons";
import useFetch from "@/hooks/useFetch";
import { deleteEventAttendee, getEventAttendees } from "@/service/event";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const params = useParams();
  const eventId = params.eventId;
  const [attendees, setAttendees] = useState(null);

  const {
    data: deletedAttendeeRes,
    loading: deleting,
    fn: deletingAttendee,
  } = useFetch(deleteEventAttendee);
  const {
    data: attendeesInfo,
    loading,
    fn: getAttendees,
  } = useFetch(getEventAttendees);
  const handleRmAttendees = (userId) => {
    if (deleting) return;
    const payload = {
      id: eventId,
      userid: userId,
    };
    deletingAttendee(payload);
  };
  useEffect(() => {
    if (!eventId) return;
    getAttendees(eventId);
  }, [eventId]);
  useEffect(() => {
    if (!loading && attendeesInfo?.Success) {
      setAttendees(attendeesInfo.Data)
    }
  }, [loading, attendeesInfo]);
  useEffect(() => {
    if (!deleting && attendeesInfo?.Success) {
      setAttendees(attendees.filter((atd)=>atd.ID !== deletedAttendeeRes?.Data));
    }
  }, [deleting, deletedAttendeeRes]);
if(loading){
  return (
    <AttendeesSkeleton/>
  )
}

  return (
    <main className="min-h-screen bg-frosty text-content px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Event Attendees</h1>
          <p className="text-gray-500 mt-2">
            Manage who’s attending this event
          </p>
        </div>

        {loading ? (
          <div className="text-gray-400">Loading attendees...</div>
        ) : attendees?.length > 0 ? (
          <div className="space-y-4">
            {attendees.map((attendee) => (
              <div
                key={attendee.ID}
                className="flex items-center justify-between p-5 rounded-2xl border border-overlay/10 bg-overlay/5 backdrop-blur-xl hover:bg-overlay/8 transition"
              >
                {/* Left Side */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-overlay/10">
                    <img
                      src={attendee?.Image?.String || "/placeholder.png"}
                      alt={attendee?.Name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <Link href={`/u/${attendee.ID}`} >
                    <h2 className="font-semibold text-lg hover:text-yellow-400 transition">

                    {attendee?.Name}
                    </h2>
                    </Link>

                    <p className="font-semibold text-lg text-gray-400 transition">
                    @
                    {attendee?.Username?.String}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {attendee?.Email}
                    </p>
                  </div>
                </div>

                {/* Middle */}
                <div className="hidden md:flex flex-col items-end">
                  <p className="text-sm text-gray-400">
                    Batch {attendee?.Batch?.String}
                  </p>

                  <span
                    className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                      attendee?.Status === "approved"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {attendee?.Status}
                  </span>
                </div>

                {/* Right Side */}
                <button
                  onClick={() => handleRmAttendees(attendee.ID)}
                  disabled={deleting}
                  className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition disabled:opacity-50"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-overlay/10 rounded-3xl">
            <p className="text-gray-500 text-lg">No attendees found</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default page;
