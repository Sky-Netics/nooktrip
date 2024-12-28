"use client";

import { Itinerary } from "@/types/itinerary";
import { ActiveStopProvider } from "@/context/ActiveStopContext";
import ItineraryDetail from "./ItineraryDetail";

export default function ItineraryDetailClientWrapper({
  itinerary,
}: {
  itinerary: Itinerary;
}) {
  return (
    <ActiveStopProvider>
      <ItineraryDetail itinerary={itinerary} />
    </ActiveStopProvider>
  );
}
