"use client";

import { SearchItinerarySchema, TravelTypeSchema } from "@/schema/utils.schema";
import { Itinerary } from "@/types/itinerary";
import { SearchItinerary, TravelType } from "@/types/utils";
import { redirect, useSearchParams } from "next/navigation";
import ItineraryCard from "./_components/ItineraryCard";
import ItineraryDetailClientWrapper from "./_components/ItineraryDetailClientWrapper";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";

async function searchItinerary({
  location,
  travelType,
  budget,
}: SearchItinerary) {
  try {
    const validationFields = SearchItinerarySchema.safeParse({
      location,
      travelType,
      budget: budget.toString(),
    });

    if (!validationFields.success) {
      return {
        data: {},
        error: validationFields.error.flatten().fieldErrors,
      };
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        city: location,
        budget: budget,
        is_single: travelType === "solo",
      }),
    };

    const response = await fetch("/api/itineraries", requestOptions);
    
    if (!response.ok) {
      const errorData = await response.json();
      return {
        data: {},
        error: errorData.error || "Failed to fetch itineraries",
      };
    }

    const data = await response.json();
    return {
      data,
      error: undefined,
    };
  } catch (error) {
    console.error("Error fetching itineraries:", error);
    return {
      data: {},
      error: "Failed to fetch itineraries. Please try again.",
    };
  }
}

function ExploreContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const location = searchParams.get("location") ?? "";
  const travelTypeParam = searchParams.get("travelType");
  const budgetParam = searchParams.get("budget");
  const detail = searchParams.get("detail");

  // Type casting with validation
  const travelType = TravelTypeSchema.safeParse(travelTypeParam).success 
    ? travelTypeParam as TravelType 
    : "solo";
  const budget = Number(budgetParam);

  useEffect(() => {
    const fetchData = async () => {
      if (!location || !travelTypeParam || !budgetParam) return;
      
      setLoading(true);
      const result = await searchItinerary({
        location,
        travelType,
        budget,
      });
      
      if (result.error) {
        setError(result.error);
      } else {
        setData(result.data);
      }
      setLoading(false);
    };

    fetchData();
  }, [location, travelType, budget, travelTypeParam, budgetParam]);

  if (loading) return <Loading />;
  if (error) return (
    <div className="w-full max-w-3xl mx-auto p-4 text-center">
      <p className="text-red-500">Error: {error}</p>
    </div>
  );
  if (!data) return null;

  const decodedDetails = decodeURIComponent(detail ?? "");
  const selectedItinerary: Itinerary = data?.itineraries?.find(
    (itinerary: Itinerary) => itinerary.package_name === decodedDetails
  );

  if (selectedItinerary) {
    return <ItineraryDetailClientWrapper itinerary={selectedItinerary} />;
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
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

export default function Page() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location") ?? "";
  const travelTypeParam = searchParams.get("travelType");
  const budgetParam = searchParams.get("budget");

  const { success } = SearchItinerarySchema.safeParse({
    location,
    travelType: travelTypeParam,
    budget: budgetParam,
  });

  if (!success) redirect("/");

  return (
    <Suspense fallback={<Loading />}>
      <ExploreContent />
    </Suspense>
  );
}
