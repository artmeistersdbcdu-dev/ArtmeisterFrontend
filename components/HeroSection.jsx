"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import Image from "next/image";
const Hero = () => {

    useGSAP(() => {
        const heroSplit = new SplitText(".title", {
            type: "chars, words",
        });

        const paragraphSplit = new SplitText(".subtitle", {
            type: "lines",
        });

        heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
        });
        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
            delay: 1,
        });


    }, []);

    return (
        <>
            <section id="hero" >
                <h1 className="title pt-8">Art Meister</h1>

                <div className="body">

                    <div className="content">
                        <div className="space-y-5 hidden md:block">
                            <p>Curate. Create. Connect.</p>
                            <p className="subtitle">
                                Unleash Your <br /> Creative Spirit
                            </p>
                        </div>

                        <div className="hero-info">
                            <p className="subtitle">
                                Art Meister is a premier community for artists and enthusiasts.
                                We provide a space where imagination knows no bounds and
                                creativity is celebrated in every form.
                            </p>
                            <a href="/art">Explore Gallery</a>
                        </div>
                    </div>
                </div>

                <div className="absolute brush md:-bottom-15 md:right-[32%] bottom-7 right-20 pointer-events-none -z-10">
                    <Image
                        src={"/brush.png"}
                        width={500}
                        height={500}
                        alt="brush"
                        className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] "
                    />
                </div>
            </section>
        </>
    );
};

export default Hero;