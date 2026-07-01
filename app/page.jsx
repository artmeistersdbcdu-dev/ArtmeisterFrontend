"use client";

import { Footer } from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import About from "@/components/About";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap, { SplitText } from "gsap/all";
import { Artist } from "@/components/Artist";
import { Events } from "@/components/Events";
import { Navbar } from "@/components/Navbar";
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
    return (
        <main className="min-h-screen space-y-16 md:space-y-48 p-0 bg-frosty text-content selection:bg-accent">
             <Navbar />
            <HeroSection />
            <About />
            <Artist />
            <Events />
            <Footer />
        </main>
    );
}


