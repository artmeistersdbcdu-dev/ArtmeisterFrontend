"use client";

import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { changeArtStatus } from "@/service/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check, X, Calendar, Tag, Image as ImageIcon, ExternalLink } from "lucide-react";

const ApproveArt = ({ art }) => {
  const [artWorks, setArtWorks] = useState(art ?? []);

  useEffect(() => {
    if (art) setArtWorks(art);
  }, [art]);

  const {
    data: res,
    loading,
    error,
    fn: changeArtStatusFn,
  } = useFetch(changeArtStatus);

  const handleArtChange = (id, status) => {
    changeArtStatusFn(id, status);
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update artwork status");
    }
    if (res?.Success && !loading && !error) {
      setArtWorks(artWorks?.filter((art) => art.ID !== res.Data.ID));
      toast.success(`Artwork successfully ${res.Data.Status}`);
    }
  }, [error, res]);
if(!artWorks){
    return (
        <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center py-16 text-center border border-overlay/5 rounded-2xl bg-overlay/5 border-dashed space-y-3">
            <div className="p-4 rounded-full bg-overlay/5 text-gray-500">
              <ImageIcon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-300 font-medium text-lg">All caught up!</p>
              <p className="text-gray-500 text-sm max-w-xs mx-auto">No pending artworks to review at the moment.</p>
            </div>
          </div>
    );
}
  return (
    <div className="space-y-8 w-full max-w-5xl mx-auto animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-serif text-content mb-2 tracking-wide">
            Pending Artworks
          </h2>
          <p className="text-gray-400 text-sm">
            Review newly submitted artworks for curation and verification in the gallery.
          </p>
        </div>
        <div className="px-4 py-2 rounded-xl border border-overlay/10 bg-overlay/5 backdrop-blur-md text-sm text-gray-300 font-medium">
          Pending Review: <span className="text-red-500 font-semibold">{artWorks?.length || 0}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {artWorks?.map((artItem) => (
          <div
            key={artItem.ID}
            className="group rounded-2xl border border-overlay/10 bg-overlay/5 backdrop-blur-md overflow-hidden flex flex-col hover:border-overlay/20 transition-all duration-300 hover:shadow-glow"
          >
            {/* Image Section */}
            <div className="h-56 w-full relative overflow-hidden bg-frosty/40">
              <img
                src={artItem.Image || "/placeholder.png"}
                alt={artItem.Name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-3 right-3">
                <Badge className="bg-frosty/60 backdrop-blur-md text-content border-overlay/15 capitalize font-medium text-xs">
                  {artItem.Status}
                </Badge>
              </div>
            </div>

            {/* Description & Metadata Section */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-xl text-content font-medium tracking-wide truncate flex-1">
                    {artItem.Name}
                  </h3>
                  <a
                    href={artItem.Image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-content p-1 rounded-md hover:bg-overlay/5 transition-colors"
                    title="Open full size image"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                  {artItem.Description?.Valid && artItem.Description.String
                    ? artItem.Description.String
                    : "No description provided."}
                </p>

                {/* Tags */}
                {artItem.Tags && artItem.Tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {artItem.Tags.map((tag, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-overlay/5 text-gray-300 border-overlay/5 text-[10px] font-normal px-2 py-0"
                      >
                        <Tag className="w-2.5 h-2.5 mr-1 text-gray-400" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer and Actions */}
              <div className="space-y-4 pt-2 border-t border-overlay/5">
                <div className="flex items-center text-xs text-gray-400 gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Submitted: {new Date(artItem.CreatedAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => handleArtChange(artItem.ID, "rejected")}
                    variant="outline"
                    className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 rounded-xl h-9 text-xs py-0 gap-1.5"
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </Button>

                  <Button
                    onClick={() => handleArtChange(artItem.ID, "approved")}
                    className="flex-1 bg-red-600 text-content hover:bg-red-500 rounded-xl h-9 text-xs py-0 gap-1.5 font-medium border-0"
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ApproveArt;
