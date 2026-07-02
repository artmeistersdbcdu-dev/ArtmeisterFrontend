"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Calendar, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HistoryTimeline({ batches }) {
  return (
    <div className=" max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-16 md:mb-24 space-y-4">
        <Badge variant="outline" className="px-4 py-1.5 border-red-800 text-red-500 uppercase tracking-widest text-xs font-semibold bg-red-950/20">
          Our Chronicle
        </Badge>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-content tracking-tight leading-none">
          Legacy & Batches
        </h1>
        <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto font-sans leading-relaxed">
          Traverse the timeline of Art Meisters. Each cohort brings their own unique voice, mediums, and creative masterpieces to our collective canvas.
        </p>
      </div>

      {/* Timeline Section */}
      <div className="relative">
        {/* Central Vertical Line (Desktop Only) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-linear-to-b from-red-900/60 via-red-800/40 to-transparent hidden md:block" />

        {/* Batch Nodes Container */}
        <div className="space-y-16 md:space-y-32 relative">
          {batches.map((batch, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={batch.id}
                className={`flex flex-col md:flex-row items-center justify-between w-full md:gap-8 ${
                  !isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Card Column */}
                <div className="w-full md:w-[45%]">
                  <Link href={`/history/${batch.id}`} className="group block">
                    <Card className="border border-overlay/10 bg-overlay/5 backdrop-blur-md overflow-hidden rounded-2xl transition-all duration-500 hover:border-red-900/50 hover:bg-neutral-900/60 hover:shadow-[0_0_30px_rgba(153,27,27,0.15)] transform group-hover:-translate-y-1.5">
                      {/* Banner Image Container */}
                      <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/30 to-transparent z-10" />
                        <Image
                          src={batch.image}
                          alt={batch.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-w-768px) 100vw, 50vw"
                        />
                        <div className="absolute top-4 left-4 z-20">
                          <Badge className="bg-red-800 text-white font-mono text-sm px-3 py-1 font-semibold border-none hover:bg-red-700">
                            {batch.timelineYear}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <CardContent className="p-6 sm:p-8 space-y-4">
                        <div className="space-y-2">
                          <h2 className="text-2xl sm:text-3xl font-serif text-content group-hover:text-red-400 transition-colors">
                            {batch.name}
                          </h2>
                          <p className="text-xs sm:text-sm font-sans font-medium text-red-500/80 uppercase tracking-widest">
                            {batch.title}
                          </p>
                        </div>

                        <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                          {batch.shortDesc}
                        </p>

                        {/* Footer details within Card */}
                        <div className="pt-4 border-t border-overlay/5 flex flex-wrap items-center justify-between gap-4">
                          {/* Members overlap group */}
                          <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                              {batch.members.slice(0, 4).map((member, idx) => (
                                <div
                                  key={idx}
                                  className="relative h-8 w-8 rounded-full border border-neutral-950 overflow-hidden"
                                  title={member.name}
                                >
                                  <Image
                                    src={member.avatar}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                    sizes="32px"
                                  />
                                </div>
                              ))}
                              {batch.members.length > 4 && (
                                <div className="h-8 w-8 rounded-full bg-neutral-800 border border-neutral-950 flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                                  +{batch.members.length - 4}
                                </div>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground font-sans flex items-center gap-1">
                              <Users size={12} className="text-neutral-500" />
                              {batch.members.length} members
                            </span>
                          </div>

                          {/* Link action */}
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-red-500 group-hover:text-red-400 transition-colors">
                            VIEW PROFILE <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>

                {/* Timeline Circle Center Column */}
                <div className="relative flex items-center justify-center my-6 md:my-0">
                  {/* Outer circle glow */}
                  <div className="absolute h-10 w-10 rounded-full bg-red-900/30 blur-sm scale-150 animate-pulse hidden md:block" />
                  {/* Central Node */}
                  <div className="relative h-6 w-6 rounded-full border-2 border-red-700 bg-frosty items-center justify-center z-20 hidden md:flex">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
                  </div>
                </div>

                {/* Opposite Spacer Column */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
