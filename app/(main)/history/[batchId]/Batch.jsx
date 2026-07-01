"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowLeft, Users, Award, Briefcase } from "lucide-react";
import { batches } from "@/lib/batchesData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Batch = () => {
  const params = useParams();
  const batchId = params.batchId;

  // Find the selected batch by ID
  const batch = batches.find((b) => b.id === batchId);

  // If the batch does not exist, render a clean fallback error layout
  if (!batch) {
    return (
      <div className="min-h-screen bg-frosty text-content flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-bold mb-4 text-red-500 font-serif">
          Cohort Not Found
        </h1>
        <p className="text-neutral-400 mb-8 max-w-md font-sans">
          The batch history profile you are searching for does not exist or has been archived.
        </p>
        <Link
          href="/history"
          className="text-red-500 hover:text-red-400 flex items-center gap-2 transition-colors font-semibold"
        >
          <ArrowLeft size={20} /> Back to History Timeline
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-frosty text-content selection:bg-red-500 pb-24">
      {/* Back Button Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/history"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-content transition-colors"
        >
          <ArrowLeft size={16} /> Back to Timeline
        </Link>
      </div>

      {/* Hero Banner Section */}
      <section className="w-full mt-6">
        <div className="relative w-full h-[320px] md:h-[450px] overflow-hidden border-y border-overlay/10">
          <Image
            src={batch.bannerImage}
            alt={batch.name}
            fill
            priority
            className="object-cover blur-[2px] brightness-75 scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent z-10" />

          {/* Banner Details Overlay */}
          <div className="absolute inset-0 flex items-end z-20">
            <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 md:pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge className="bg-red-950/60 border border-red-800 text-red-400 font-mono text-sm px-3 py-1 font-semibold">
                    {batch.timelineYear} Cohort
                  </Badge>
                  <span className="text-xs text-neutral-400 flex items-center gap-1 font-sans">
                    <Users size={14} className="text-neutral-500" />
                    {batch.members.length} Active Members
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-serif text-content tracking-tight leading-none">
                  {batch.name}
                </h1>
                <p className="text-red-500 font-sans font-medium uppercase tracking-widest text-xs md:text-sm">
                  {batch.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: About & Achievements */}
        <div className="lg:col-span-7 space-y-8">
          {/* About Cohort */}
          <div className="rounded-2xl p-6 sm:p-8 border border-overlay/10 bg-neutral-950/40 backdrop-blur-md">
            <h2 className="text-2xl font-serif text-content mb-4">
              About This Cohort
            </h2>
            <p className="text-neutral-300 leading-relaxed font-sans text-base sm:text-lg">
              {batch.about}
            </p>
          </div>

          {/* Highlights & Milestones */}
          <div className="rounded-2xl p-6 sm:p-8 border border-overlay/10 bg-neutral-950/40 backdrop-blur-md">
            <h3 className="text-xl font-serif text-content mb-6 flex items-center gap-2">
              <Award size={20} className="text-red-500" />
              Cohort Milestones & Legacy
            </h3>
            <ul className="space-y-4">
              {batch.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-red-950/60 border border-red-900 flex items-center justify-center text-[10px] text-red-400 font-bold shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-neutral-300 text-sm sm:text-base font-sans leading-relaxed">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Member Roster Grid */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl p-6 border border-overlay/10 bg-neutral-950/40 backdrop-blur-md">
            <h3 className="text-xl font-serif text-content mb-6 flex items-center gap-2">
              <Users size={20} className="text-red-500" />
              Cohort Members
            </h3>
            
            <div className="space-y-4">
              {batch.members.map((member, index) => (
                <Card 
                  key={index}
                  className="bg-neutral-900/40 border border-overlay/5 hover:border-red-950/60 hover:bg-neutral-900/60 transition-all duration-300 rounded-xl"
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    {/* Member Avatar */}
                    <div className="relative h-12 w-12 rounded-full overflow-hidden border border-overlay/10 shrink-0">
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>

                    {/* Member Details */}
                    <div className="space-y-1 min-w-0">
                      <h4 className="text-sm sm:text-base font-sans font-bold text-content truncate">
                        {member.name}
                      </h4>
                      <p className="text-xs text-neutral-400 flex items-center gap-1.5 truncate">
                        <Briefcase size={12} className="text-neutral-500 shrink-0" />
                        {member.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

      </section>
    </main>
  );
};

export default Batch;