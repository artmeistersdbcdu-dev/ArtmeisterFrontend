"use client";

import React, { useState } from "react";
import { ArtistCard } from "./ArtistCard";

import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { getAllCoreMemberUser } from "@/service/user";
import { ArtistsSectionSkeleton } from "./skeletons";
export const Artist = () => {
  //   const [artists, setArtist] = useState(null);
  //   const {
  //     data: artistsRes,
  //     loading,
  //     fn: getArtists,
  //   } = useFetch(getAllCoreMemberUser);
  //   useEffect(() => {
  //     getArtists();
  //   }, []);
  //   useEffect(() => {
  //     if (artistsRes && artistsRes.Success) {
  //       setArtist(artistsRes.Data);
  //     }
  //   }, [artistsRes, loading]);
  // if(loading){
  //   return <ArtistsSectionSkeleton/>
  // }

  const artists = [
    {
      ID: "4cfeaaeb-3436-4b88-8e57-3bf347ecd574",
      Name: "Neha Verma",
      Email: "neha2004.nv@gmail.com",
      Status: "approved",
      Role: "general_secretary",
      Image: {
        String:
          "https://res.cloudinary.com/bgh2sdag/image/upload/v1783017274/art-club/cfscmuefdeuvhmz0a57a.jpg",
        Valid: true,
      },
    },
    {
      ID: "cf9336d2-a4ca-4dfb-8897-82e667367a29",
      Name: "Raj",
      Email: "raj020449@gmail.com",
      Status: "approved",
      Role: "president",
      Image: {
        String:
          "https://res.cloudinary.com/bgh2sdag/image/upload/v1783008695/art-club/tr6euj16o114myysfm0c.jpg",
        Valid: true,
      },
    },
    {
      ID: "a8d1e3f2-8b12-4a19-bb4e-2e8b3d0d11a1",
      Name: "Aarav Sharma",
      Email: "aarav.sharma@gmail.com",
      Status: "approved",
      Role: "vice_president",
      Image: {
        String:
          "https://res.cloudinary.com/bgh2sdag/image/upload/v1783017274/art-club/cfscmuefdeuvhmz0a57a.jpg",
        Valid: true,
      },
    },
    {
      ID: "b4f7a2c1-2f34-4b5c-9123-cd19e8f2b332",
      Name: "Priya Singh",
      Email: "priya.singh@gmail.com",
      Status: "approved",
      Role: "core_member",
      Image: {
        String:
          "https://res.cloudinary.com/bgh2sdag/image/upload/v1783008695/art-club/tr6euj16o114myysfm0c.jpg",
        Valid: true,
      },
    },
    {
      ID: "c7d9e3b5-3a98-4d8b-a9b2-11ff3344ee55",
      Name: "Karan Mehta",
      Email: "karan.mehta@gmail.com",
      Status: "approved",
      Role: "logistic",
      Image: {
        String:
          "https://res.cloudinary.com/bgh2sdag/image/upload/v1783017274/art-club/cfscmuefdeuvhmz0a57a.jpg",
        Valid: true,
      },
    },
    {
      ID: "d3f1a8b4-45a6-4e78-9988-1a2b3c4d5e66",
      Name: "Simran Kaur",
      Email: "simran.kaur@gmail.com",
      Status: "approved",
      Role: "content_head",
      Image: {
        String:
          "https://res.cloudinary.com/bgh2sdag/image/upload/v1783008695/art-club/tr6euj16o114myysfm0c.jpg",
        Valid: true,
      },
    },
    {
      ID: "e5c2d7f8-78b9-4123-a7b1-8899aa00bb77",
      Name: "Rohan Gupta",
      Email: "rohan.gupta@gmail.com",
      Status: "approved",
      Role: "core_member",
      Image: {
        String:
          "https://res.cloudinary.com/bgh2sdag/image/upload/v1783017274/art-club/cfscmuefdeuvhmz0a57a.jpg",
        Valid: true,
      },
    },
    {
      ID: "f9b8c7d6-90ab-4cde-b123-556677889900",
      Name: "Ananya Das",
      Email: "ananya.das@gmail.com",
      Status: "approved",
      Role: "content_head",
      Image: {
        String:
          "https://res.cloudinary.com/bgh2sdag/image/upload/v1783008695/art-club/tr6euj16o114myysfm0c.jpg",
        Valid: true,
      },
    },
    {
      ID: "11223344-5566-7788-99aa-bbccddeeff01",
      Name: "Vikram Joshi",
      Email: "vikram.joshi@gmail.com",
      Status: "approved",
      Role: "core_member",
      Image: {
        String:
          "https://res.cloudinary.com/bgh2sdag/image/upload/v1783017274/art-club/cfscmuefdeuvhmz0a57a.jpg",
        Valid: true,
      },
    },
    {
      ID: "22334455-6677-8899-aabb-ccddeeff0011",
      Name: "Meera Kapoor",
      Email: "meera.kapoor@gmail.com",
      Status: "approved",
      Role: "social_media_head",
      Image: {
        String:
          "https://res.cloudinary.com/bgh2sdag/image/upload/v1783008695/art-club/tr6euj16o114myysfm0c.jpg",
        Valid: true,
      },
    },
    {
      ID: "33445566-7788-99aa-bbcc-ddeeff001122",
      Name: "Aditya Roy",
      Email: "aditya.roy@gmail.com",
      Status: "approved",
      Role: "member",
      Image: {
        String:
          "https://res.cloudinary.com/bgh2sdag/image/upload/v1783017274/art-club/cfscmuefdeuvhmz0a57a.jpg",
        Valid: true,
      },
    },
    {
      ID: "44556677-8899-aabb-ccdd-eeff00112233",
      Name: "Sneha Pillai",
      Email: "sneha.pillai@gmail.com",
      Status: "approved",
      Role: "member",
      Image: {
        String:
          "https://res.cloudinary.com/bgh2sdag/image/upload/v1783008695/art-club/tr6euj16o114myysfm0c.jpg",
        Valid: true,
      },
    },
    {
      ID: "55667788-99aa-bbcc-ddee-ff0011223344",
      Name: "Yash Malhotra",
      Email: "yash.malhotra@gmail.com",
      Status: "approved",
      Role: "member",
      Image: {
        String:
          "https://res.cloudinary.com/bgh2sdag/image/upload/v1783017274/art-club/cfscmuefdeuvhmz0a57a.jpg",
        Valid: true,
      },
    },
    {
      ID: "66778899-aabb-ccdd-eeff-001122334455",
      Name: "Tanvi Rao",
      Email: "tanvi.rao@gmail.com",
      Status: "approved",
      Role: "content_head",
      Image: {
        String:
          "https://res.cloudinary.com/bgh2sdag/image/upload/v1783008695/art-club/tr6euj16o114myysfm0c.jpg",
        Valid: true,
      },
    },
  ];
  return (
    <section id="artists" className="max-w-7xl mx-auto px-6 md:px-12 ">
      <div className="flex justify-between items-end mb-12">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <span className="text-content/60 font-semibold tracking-widest text-sm uppercase">
              OUR ARTISTS
            </span>
            <div className="h-px w-12 bg-content/20"></div>
          </div>
          <h2 className="font-heading font-bold text-4xl">Meet Our Creators</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {artists?.map((artist,index) => (
          <div className="w-[300px] mt-7 h-[400px] " key={index}>

          <ArtistCard
            id={artist.ID}
            name={artist.Name}
            role={artist.Role}
            img={artist.Image?.String || "/placeholder.png"}
            instagram={artist.SocialLinks?.instagram}
            youtube={artist.SocialLinks?.youtube}
            />
            </div>
        ))}
      </div>
    </section>
  );
};
