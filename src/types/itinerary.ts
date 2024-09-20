import { Stop } from "./stop";

export type Itinerary = {
  stops: Stop[];
  total_duration: string;
  total_cost: number;
  location_currency: string;
  summary: string;
  package_name: string;
  start: string;
  end: string;
  total_distance: string;
  transport_mode: string;
};
