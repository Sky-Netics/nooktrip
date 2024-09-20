import { SearchItinerarySchema, TravelTypeSchema } from "@/schema/utils.schema";
import { z } from "zod";

export type TravelType = z.infer<typeof TravelTypeSchema>;

export type SearchItinerary = z.infer<typeof SearchItinerarySchema>