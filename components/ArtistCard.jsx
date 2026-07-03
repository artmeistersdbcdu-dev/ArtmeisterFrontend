import Image from "next/image";
import { Rubik_Wet_Paint } from "next/font/google";
import Link from "next/link";

const rubikWetPaint = Rubik_Wet_Paint({ weight: "400", subsets: ["latin"] });
export function ArtistCard({ id, name, role, img, instagram, youtube }) {
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
      className="absolute inset-0 bg-radial from-red-500 to-red-950 rounded-xl"
      style={{ filter: "url(#rough-edges)" }}
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
        <span className="inline-block text-xl font-bold bg-red-500 px-3 py-1 -rotate-10 uppercase tracking-wider rounded-sm">
          {role}
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
