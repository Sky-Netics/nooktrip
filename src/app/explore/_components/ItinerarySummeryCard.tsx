"use client";

import { Itinerary } from "@/types/itinerary";
import Image from "next/image";
import RouteMap from "@/components/RouteMap";

interface Props {
  itinerary: Itinerary;
}

export default function ItinerarySummeryCard({ itinerary }: Props) {
  return (
    <div className="bg-yellow-900 text-[#FFFFF0] p-4 md:p-6 rounded-lg">
      <RouteMap
        stops={itinerary.stops}
        className="shadow-lg shadow-black/30 mb-6"
      />
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex gap-2 items-center">
            <Image
              className="w-4 h-4 brightness-0 invert"
              src="/icons/duration.png"
              width={50}
              height={50}
              alt="duration"
            />
            <span>{itinerary.total_duration}</span>
          </div>
          <div className="flex gap-2 items-center">
            <Image
              className="w-4 h-4 brightness-0 invert"
              src="/icons/cost.png"
              width={50}
              height={50}
              alt="cost"
            />
            <span>
              {itinerary.total_cost} {itinerary.location_currency}
            </span>
          </div>
        </div>
        <p className="text-sm">{itinerary.summary}</p>
      </div>
    </div>
  );
}
