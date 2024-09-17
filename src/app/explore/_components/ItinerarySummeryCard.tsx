import { Itinerary } from "@/types/itinerary";
import Image from "next/image";

export default function ItinerarySummeryCard({
  itinerary,
}: {
  itinerary: Itinerary;
}) {
  return (
    <div className=" bg-yellow-900 text-[#FFFFF0] p-4 md:p-6 rounded-lg ">
      <Image
        src="/explore/detail.png"
        className="rounded-md w-[640px]"
        width={700}
        height={600}
        alt="detail-image"
      />
      <p className="mt-4 text-base font-medium">{itinerary.summary}</p>
      <p className="mt-4 text-xs">
        <span className="font-semibold text-[13px] leading-tight">start: </span>
        {itinerary.start}
      </p>
      <p className="mt-4 text-xs">
        <span className="font-semibold text-[13px] leading-tight">end: </span>
        {itinerary.end}
      </p>
      <p className="mt-4 text-xs">
        <span className="font-semibold text-[13px] leading-tight">
          Duration:{" "}
        </span>
        {itinerary.total_duration}
      </p>
      <p className="mt-4 text-xs">
        <span className="font-semibold text-[13px] leading-tight">
          Mode of Transport:{" "}
        </span>
        {itinerary.transport_mode}
      </p>
      <p className="mt-4 text-xs">
        <span className="font-semibold text-[13px] leading-tight">
          Approximately Cost:{" "}
        </span>
        {`${itinerary.total_cost} ${itinerary.location_currency}`}
      </p>
      <p className="mt-4 text-xs">
        <span className="font-semibold text-[13px] leading-tight">
          Distance:{" "}
        </span>
        {itinerary.total_distance}
      </p>
    </div>
  );
}
