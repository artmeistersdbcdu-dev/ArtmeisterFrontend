import React from "react";
import HistoryTimeline from "./HistoryTimeline";
import { batches } from "@/lib/batchesData";

export const metadata = {
  title: "Batch History | Art Meisters",
  description: "Walk through the chronological timeline of our artistic cohorts, explore their members and works.",
};

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-frosty text-content">
      <HistoryTimeline batches={batches} />
    </div>
  );
}