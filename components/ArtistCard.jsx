import Image from "next/image";
import { Rubik_Wet_Paint } from "next/font/google";
import Link from "next/link";

const rubikWetPaint = Rubik_Wet_Paint({ weight: "400", subsets: ["latin"] });
export function ArtistCard({ id, name, role, img, instagram, youtube }) {
const roles = {
  president: {
    label: "President",
    from: "#DC2626",
    to: "#991B1B",
    text: "#DC2626",
  },

  vice_president: {
    label: "Vice President",
    from: "#EA580C",
    to: "#9A3412",
    text: "#EA580C",
  },

  general_secretary: {
    label: "General Secretary",
    from: "#2563EB",
    to: "#1E3A8A",
    text: "#3B82F6",
  },

  logistic: {
    label: "Logistic",
    from: "#059669",
    to: "#065F46",
    text: "#10B981",
  },

  social_media_head: {
    label: "Social Media Head",
    from: "#9333EA",
    to: "#6B21A8",
    text: "#A855F7",
  },

  content_head: {
    label: "Content Head",
    from: "#D97706",
    to: "#92400E",
    text: "#F59E0B",
  },

  core_member: {
    label: "Core Member",
    from: "#0891B2",
    to: "#155E75",
    text: "#06B6D4",
  },

  member: {
    label: "Member",
    from: "#4B5563",
    to: "#1F2937",
    text: "#6B7280",
  },
};
  const colourScheme = roles[role];
  return (
    <>
      <svg width="0" height="0" className="absolute">
        <filter id="rough-edges">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.1 0.099"
            numOctaves={4}
            seed={7}
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
        </filter>
      </svg>

      <div className="relative flex flex-col items-center py-6 px-6 gap-6">
        {/* Rough-edged background layer — filter applies here only */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: `radial-gradient(circle, ${colourScheme.from}, ${colourScheme.to})`,
            filter: "url(#rough-edges)",
          }}
        />

        {/* Content layer — no filter, stays crisp */}
        <div className="relative flex flex-col items-center gap-6 w-full">
          {/* Image + Name */}
          <div className="relative w-64 h-56">
            <Image
              src={img}
              alt={name}
              fill
              className="object-cover object-center rounded-xl"
            />

            <div className="absolute inset-x-0 bottom-0 translate-y-1/2 flex justify-center">
              <span
                className={`${rubikWetPaint.className} text-black text-center text-3xl uppercase tracking-wider`}
                style={{
                  WebkitTextStroke: "12px white",
                  paintOrder: "stroke fill",
                  textShadow: `
              3px 3px 0 #fff, -3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff,
              6px 0 0 #fff, -6px 0 0 #fff, 0 6px 0 #fff, 0 -6px 0 #fff,
              0 10px 14px rgba(0,0,0,0.6)
              `,
                }}
              >
                {name}
              </span>
            </div>
          </div>

          {/* Role */}
          <div className="pt-6">
            <span
              className="inline-block text-xl font-bold px-3 py-1 -rotate-10 uppercase tracking-wider rounded-sm"
              style={{
                backgroundColor: colourScheme.text,
              }}
            >
              {colourScheme.label}
            </span>
          </div>

          {/* Socials */}
          <div className="flex items-start w-full gap-4 pt-2">
            <Link href={"/"}>
              <Image
                src="/instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </Link>

            <Link href={"/"}>
              <Image
                src="/youtube.svg"
                alt="YouTube"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
