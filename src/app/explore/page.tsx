import { searchItinerary } from "@/actions/search.action";
import { SearchItinerarySchema } from "@/schema/utils.schema";
import { Itinerary } from "@/types/itinerary";
import { SearchItinerary } from "@/types/utils";
import { redirect } from "next/navigation";
import ItineraryCard from "./_components/ItineraryCard";
import ItineraryDetail from "./_components/ItineraryDetail";

export const dynamic = 'force-dynamic';

export default async function page({
  searchParams: { location, travelType, budget, detail },
}: {
  searchParams: SearchItinerary & { detail?: string };
}) {
  const { success } = SearchItinerarySchema.safeParse({
    location,
    travelType,
    budget,
  });

  if (!success) redirect("/");

  const { data, error } = await searchItinerary({
    location,
    travelType,
    budget,
  });

  if (error) {
    return <div>Error Happend!</div>;
  }

  const decodedDetails = decodeURIComponent(detail ?? "");
  const selectedItinerary: Itinerary = data?.itineraries?.find(
    (itinerary: Itinerary) => itinerary.package_name === decodedDetails
  );

  if (selectedItinerary) {
    return <ItineraryDetail itinerary={selectedItinerary} />;
  } else {
    return (
      <div>
        <p className="text-lg font-medium">Result:</p>
        <div className="mt-2 grid gap-6">
          {data?.itineraries?.map((itinerary: Itinerary, index: number) => (
            <ItineraryCard
              key={itinerary.package_name}
              itinerary={itinerary}
              number={index + 1}
              link={`/explore?location=${location}&travelType=${travelType}&budget=${budget}&detail=${encodeURIComponent(
                itinerary.package_name
              )}`}
            />
          ))}
        </div>
      </div>
    );
  }
}
