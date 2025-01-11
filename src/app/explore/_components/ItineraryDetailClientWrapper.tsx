"use client";

import { Itinerary } from "@/types/itinerary";
import { ActiveStopProvider } from "@/context/ActiveStopContext";
import ItineraryDetail from "./ItineraryDetail";
import { memo } from "react";

// Using memo to prevent unnecessary re-renders when parent updates
export default memo(function ItineraryDetailClientWrapper({
  itinerary,
}: {
  itinerary: Itinerary;
}) {
  return (
    <ActiveStopProvider>
      <ItineraryDetail itinerary={itinerary} />
    </ActiveStopProvider>
  );
});
