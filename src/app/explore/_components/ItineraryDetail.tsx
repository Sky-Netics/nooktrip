import { Itinerary } from "@/types/itinerary";
import { Stop } from "@/types/stop";
import { Fragment } from "react";
import { GetItineraryDialog } from "./GetItineraryDialog";
import IineraryDetailRoute from "./IineraryDetailRoute";
import ItineraryDetailCard from "./ItineraryDetailCard";
import ItinerarySummeryCard from "./ItinerarySummeryCard";

export default function ItineraryDetail({
  itinerary,
}: {
  itinerary: Itinerary;
}) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* <BackButton /> */}
      <p className="text-xl font-semibold">{itinerary.package_name}</p>
      <div className="my-8 md:my-12 flex flex-col items-center justify-center md:flex-row md:items-start gap-6 md:gap-12">
        <div className="md:basis-1/2  md:order-2 grid auto-rows-min justify-items-center">
          <ItinerarySummeryCard itinerary={itinerary} />
          <GetItineraryDialog
            className="hidden md:flex"
            itinerary={itinerary}
          />
        </div>
        <div className="mt-6 md:mt-0 md:basis-1/2 flex justify-center md:justify-end">
          <div className="w-full flex flex-col max-w-md items-end justify-start">
            {itinerary.stops?.map((stop: Stop, index: number) => (
              <Fragment key={stop.location_address}>
                <ItineraryDetailCard stop={stop} number={index + 1} />
                {index < itinerary.stops.length - 1 && (
                  <IineraryDetailRoute route={stop.path_to_next} />
                )}
              </Fragment>
            ))}
          </div>
        </div>

        <GetItineraryDialog className="md:hidden" itinerary={itinerary} />
      </div>
    </div>
  );
}
