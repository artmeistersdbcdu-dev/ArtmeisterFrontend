"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

const About = () => {
  const aboutData = [
    {
      eventImage: {
        src: "/Event1.jpeg",
        width: 450,
        height: 300,
        alt: "hero",
        pos: "items-start",
      },
      points: [
        "A memorable community gathering where artists showcased their work and shared ideas in an open creative space.",
      ],
    },
    {
      eventImage: {
        src: "/Event2.jpeg",
        width: 450,
        height: 300,
        alt: "hero",
        pos: "items-end",
      },
      points: [
        "An interactive art workshop where members explored new techniques and experimented with bold creative styles.",
      ],
    },
    {
      eventImage: {
        src: "/Event3.jpeg",
        width: 450,
        height: 300,
        alt: "hero",
        pos: "items-start",
      },
      points: [
        "A special exhibition night where artists presented their best creations to an engaged audience.",
      ],
    },
    {
      eventImage: {
        src: "/Event4.jpeg",
        width: 450,
        height: 300,
        alt: "hero",
        pos: "items-end",
      },
      points: [
        "A creative meet-up focused on sharing ideas, building friendships, and supporting artistic growth.",
      ],
    },
    {
      eventImage: {
        src: "/Event5.jpeg",
        width: 450,
        height: 300,
        alt: "hero",
        pos: "items-center",
      },
      points: [
        "A creative meet-up focused on sharing ideas, building friendships, and supporting artistic growth.",
      ],
    },
  ];
  const svgRef = useRef(null);
  useGSAP(() => {
    const paths = svgRef.current.querySelectorAll("path");

    paths.forEach((p) => {
      const length = p.getTotalLength();
      gsap.set(p, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });
    gsap.from(".event-img", {
      opacity: 0,
      scale: 0.7,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: "#about",
        start: "top 250%",
        end: "bottom 120%",
        scrub: 1,
      },
    });
    gsap.to(paths, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "#about",
        start: "top 50%",
        end: "bottom 120%",
        scrub: 1,
      },
    });
  }, []);
  return (
    <section id="about" className="relative   min-h-screen space-y-32">
      <div className="title">
        <h2 className="text-center text-9xl relative z-10 text-content font-bold">
          Our Journey
        </h2>
      </div>
      <div className="">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1944.2 6151.5"
            className="absolute inset-0 h-full w-full"
            id="desktop-svg"
            ref={svgRef}
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="paint-texture">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.06"
                  numOctaves="4"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="35"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
              <linearGradient id="paint-red" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7f1d1d" />
                <stop offset="50%" stopColor="#991b1b" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
            </defs>
            <g filter="url(#paint-texture)">
              <path
                fill="none"
                stroke="url(#paint-red)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="480"
                d="M1085 250c-868 126.5-961 907-29.5 1453S1397 3353 733 3318s-606-718-53.6-808c552.3-90 1689.3 743.4 475.6 1689-985 767.5-234 1313-234 1702.5"
                id="main-path"
              />
              <path
                d="M450 1400 v 150"
                stroke="url(#paint-red)"
                strokeWidth="80"
                strokeLinecap="round"
              />
              <path
                d="M1200 3200 v 200"
                stroke="url(#paint-red)"
                strokeWidth="60"
                strokeLinecap="round"
              />
              <path
                d="M300 3500 v 120"
                stroke="url(#paint-red)"
                strokeWidth="90"
                strokeLinecap="round"
              />
              <path
                d="M1400 4500 v 180"
                stroke="url(#paint-red)"
                strokeWidth="70"
                strokeLinecap="round"
              />
              <path
                d="M600 5500 v 250"
                stroke="url(#paint-red)"
                strokeWidth="100"
                strokeLinecap="round"
              />
              <path
                d="M1150 400 l 1 1"
                stroke="url(#paint-red)"
                strokeWidth="30"
                strokeLinecap="round"
              />
              <path
                d="M800 1200 l 1 1"
                stroke="url(#paint-red)"
                strokeWidth="20"
                strokeLinecap="round"
              />
              <path
                d="M500 2500 l 1 1"
                stroke="url(#paint-red)"
                strokeWidth="40"
                strokeLinecap="round"
              />
              <path
                d="M1500 3800 l 1 1"
                stroke="url(#paint-red)"
                strokeWidth="25"
                strokeLinecap="round"
              />
              <path
                d="M1000 4800 l 1 1"
                stroke="url(#paint-red)"
                strokeWidth="35"
                strokeLinecap="round"
              />
              <path
                d="M400 5800 l 1 1"
                stroke="url(#paint-red)"
                strokeWidth="50"
                strokeLinecap="round"
              />
              <path
                d="M1250 3500 l 1 1"
                stroke="url(#paint-red)"
                strokeWidth="15"
                strokeLinecap="round"
              />
              <path
                d="M650 2800 l 1 1"
                stroke="url(#paint-red)"
                strokeWidth="28"
                strokeLinecap="round"
              />
              <path
                d="M1300 5200 l 1 1"
                stroke="url(#paint-red)"
                strokeWidth="20"
                strokeLinecap="round"
              />
              <path
                d="M900 1800 l 1 1"
                stroke="url(#paint-red)"
                strokeWidth="25"
                strokeLinecap="round"
              />
              <path
                d="M1600 2200 l 1 1"
                stroke="url(#paint-red)"
                strokeWidth="18"
                strokeLinecap="round"
              />
              <path
                d="M200 4200 l 1 1"
                stroke="url(#paint-red)"
                strokeWidth="32"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>
      </div>

      <div className="flex flex-col relative container mx-auto z-10 gap-48">
        {aboutData.map((event, index) => (
          <div
            key={index}
            className={`flex flex-col event-img ${event.eventImage.pos} px-10`}
          >
            <Image
              src={event.eventImage.src}
              width={event.eventImage.width}
              height={event.eventImage.height}
              alt={event.eventImage.alt}
              className="w-[450px] h-[300px]  rounded-lg"
            />

            <ul className="text-content mt-6 space-y-3 max-w-md list-disc leading-relaxed">
              {event.points.map((point, pointIndex) => (
                <li key={pointIndex}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="relative z-20 flex  justify-center pt-24 pb-16">
        <Link href={"/history"}>
          <button className="group px-8 py-4 rounded-full border border-red-800 bg-red-950/20 backdrop-blur-md text-white font-semibold flex items-center gap-3 transition-all duration-300 hover:bg-red-800 hover:border-red-600 hover:shadow-[0_0_30px_rgba(153,27,27,0.4)] cursor-pointer">
            <span className="font-sans text-base tracking-wide uppercase">
              View Our Whole History
            </span>
            <ArrowRight className="text-content group-hover:translate-x-1.5 transition-transform" size={18} />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default About;
