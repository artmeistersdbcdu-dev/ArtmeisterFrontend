import Image from "next/image";
import { Rubik_Wet_Paint } from "next/font/google";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";

const rubikWetPaint = Rubik_Wet_Paint({ weight: "400", subsets: ["latin"] });
export function ArtistCard({ id, name, role, img, instagram, youtube }) {
const roles = {
  president: {
    label: "President",
    from: "#D6140A",
    mid: "#E6521A",
    to: "#7A0000",
    text: "#FFF200",
    glow: "#D6140A",
    shadow: "#300000",
    highlight: "#FFD4CF",
    dots: "#E64A38",
    burst: "#FFD54A",
    rotate: 7,
    textSize: "text-2xl", // 9 chars
  },

  vice_president: {
    label: "Vice President",
    from: "#E66A00",
    mid: "#E68A1A",
    to: "#993800",
    text: "#FFF200",
    glow: "#E67E00",
    shadow: "#3D1800",
    highlight: "#FFE0B2",
    dots: "#E6941A",
    burst: "#FFF176",
    rotate: 4,
    textSize: "text-xl", // 14 chars
  },

  general_secretary: {
    label: "General Secretary",
    from: "#0058CC",
    mid: "#2E7FE6",
    to: "#00318C",
    text: "#FFF200",
    glow: "#1670D6",
    shadow: "#001640",
    highlight: "#D4F1FF",
    dots: "#3E8FE6",
    burst: "#FFE95E",
    rotate: 9,
    textSize: "text-lg", // 17 chars
  },

  logistic: {
    label: "Logistic",
    from: "#00B82C",
    mid: "#2ED457",
    to: "#00611A",
    text: "#FFF200",
    glow: "#00C948",
    shadow: "#002A0B",
    highlight: "#D6FFD9",
    dots: "#2ECE5C",
    burst: "#FFF176",
    rotate: 3,
    textSize: "text-2xl", // 8 chars
  },

  social_media_head: {
    label: "Social Media Head",
    from: "#AD00C7",
    mid: "#C42EE6",
    to: "#5C0078",
    text: "#FFF200",
    glow: "#C400D9",
    shadow: "#240030",
    highlight: "#F7D6FF",
    dots: "#B830D6",
    burst: "#FFF176",
    rotate: 6,
    textSize: "text-lg", // 17 chars
  },

  content_head: {
    label: "Content Head",
    from: "#D6AD00",
    mid: "#E6C11A",
    to: "#CC6200",
    text: "#111111",
    glow: "#D6AD00",
    shadow: "#5C2E00",
    highlight: "#FFF9C4",
    dots: "#E6BE2E",
    burst: "#FF7043",
    rotate: 10,
    textSize: "text-xl", // 12 chars
  },

  core_member: {
    label: "Core Member",
    from: "#00A3CC",
    mid: "#2ECCE6",
    to: "#00566B",
    text: "#FFF200",
    glow: "#00B8D9",
    shadow: "#00272E",
    highlight: "#D8FAFF",
    dots: "#2ED4E6",
    burst: "#FFF176",
    rotate: 5,
    textSize: "text-xl", // 11 chars
  },

  member: {
    label: "Member",
    from: "#7A7A7A",
    mid: "#ADADAD",
    to: "#1F1F1F",
    text: "#FFFFFF",
    glow: "#D9D9D9",
    shadow: "#0A0A0A",
    highlight: "#FFFFFF",
    dots: "#C4C4C4",
    burst: "#FFE95E",
    rotate: 8,
    textSize: "text-2xl", // 6 chars
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

     <div
  className="relative h-full flex flex-col items-center py-6 px-6 gap-6"
  style={{
    boxShadow: `8px 8px 0px ${colourScheme.shadow}`, // bombastic offset shadow
  }}
>

  <img
    src="brush.png"
    alt="paint splash"
    className="absolute -top-16 -right-15 z-50 -rotate-130 w-32 h-32 pointer-events-none select-none"
  />


  <div
    className="absolute inset-0 rounded-xl"
    style={{
      background: `linear-gradient(135deg, ${colourScheme.from}, ${colourScheme.mid} 50%, ${colourScheme.to})`,
      filter: "url(#rough-edges)",
    }}
  />

  {/* Halftone dot overlay for comic texture */}
  <div
    className="absolute inset-0 rounded-xl mix-blend-overlay opacity-40 pointer-events-none"
    style={{
      backgroundImage: `radial-gradient(${colourScheme.glow} 1.5px, transparent 1.5px)`,
      backgroundSize: "10px 10px",
    }}
  />

  {/* Content layer — no filter, stays crisp */}
  <div className="relative flex flex-col items-center gap-6 w-full">
    {/* Image + Name */}
    <div className="relative border-4 border-b-8 border-black w-64 h-56">
      <Image
        src={img}
        alt={name}
        fill
        className="object-cover object-center shadow-2xl border-8 border-white"
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

    {/* Role — bombastic badge */}
    <div
      className="mt-6 border-4 border-black"
      style={{
        transform: `rotate(-${colourScheme.rotate}deg)`,
        background: `radial-gradient(circle, ${colourScheme.from}, ${colourScheme.mid} 60%, ${colourScheme.to})`,
        boxShadow: `4px 4px 0px ${colourScheme.shadow}`,
      }}
    >
      <span
        className={`inline-block text-black ${colourScheme.textSize} font-extrabold px-3 text-center uppercase tracking-wider`}
        style={{
          WebkitTextStroke: "1px black",
          paintOrder: "stroke fill",
        }}
      >
        {colourScheme.label}
      </span>
    </div>

    {/* Socials */}
    <div className="flex items-start w-full gap-4 pt-2">
      {instagram && (
        <Link href={instagram} target="_blank">
          <Image src="/instagram.svg" alt="Instagram" width={24} height={24} className="w-6 h-6" />
        </Link>
      )}
      {youtube && (
        <Link href={youtube} target="_blank">
          <Image src="/youtube.svg" alt="YouTube" width={24} height={24} className="w-6 h-6" />
        </Link>
      )}
      <Link href={`/u/${id}`} className="">
        <SquareArrowOutUpRight/>
      </Link>
    </div>
  </div>
</div>
    </>
  );
}
