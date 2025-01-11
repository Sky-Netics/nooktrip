export type TransportMode = 'walking' | 'cycling' | 'driving' | 'ferry';

export type Stop = {
  location_title: string;
  location_address: string;
  duration: string;
  cost: number;
  currency: string;
  google_map_coordinates: string;
  path_to_next: string | null;
  transport_mode: TransportMode;
};
