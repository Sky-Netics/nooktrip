import { searchItinerary } from "@/actions/search.action";
import { Button } from "@/components/ui/button";
import { SearchItinerarySchema } from "@/schema/utils.schema";
import { Itinerary } from "@/types/Itinerary";
import { SearchItinerary } from "@/types/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function page({
  searchParams: { location, travelType, budget },
}: {
  searchParams: SearchItinerary;
}) {
  const { success } = SearchItinerarySchema.safeParse({
    location,
    travelType,
    budget,
  });

  if (!success) redirect("/");

  await sleep(2000);

  const { data, error } = await searchItinerary({
    location,
    travelType,
    budget,
  });

  if (error) {
    return <div>Error Happend!</div>;
  }

  return (
    <div>
      <p className="text-lg font-medium">Result:</p>
      <div className="mt-2 grid lg:grid-cols-2 gap-6">
        {data?.itenaries?.map((itinerary: Itinerary, index: number) => (
          <div
            key={itinerary.package_name}
            className="relative grid px-6 pt-4 pb-5 rounded-md bg-primary-foreground/15 shadow-sm border border-primary-foreground/40"
          >
            <p className="text-xl font-bold">
              #{index + 1} - {itinerary.package_name}
            </p>

            <div className="mt-3 flex gap-1.5 items-center text-xs text-muted-foreground">
              <Image
                className="w-4 h-4"
                src="/icons/location.png"
                width={50}
                height={50}
                alt="cost image"
              />
              <span>{itinerary.total_distance}</span>

              <span className="mx-2">&#8226;</span>

              <Image
                className="w-4 h-4"
                src="/icons/duration.png"
                width={50}
                height={50}
                alt="cost image"
              />
              <span>{itinerary.total_duration}</span>
            </div>

            <p className="mt-6 text-sm">{itinerary.summary}</p>

            {/* <p className="mt-4 text-xs text-muted-foreground">
              {`length: ${itinerary.total_distance} `}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {`duration: ${itinerary.total_duration}`}
            </p> */}

            <span className="max-sm:mt-4 sm:absolute right-6 top-4 text-primary-foreground font-extrabold">{`${itinerary.total_cost} ${itinerary.location_currency}`}</span>

            <Button className="mt-4 max-sm:absolute max-sm:bottom-4 max-sm:right-4 sm:justify-self-start" size="sm">
              View Details <ChevronRight className="w-4 h-4 hidden sm:block" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
