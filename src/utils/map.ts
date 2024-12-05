export type Coordinate = {
  lat: number;
  lng: number;
};

export function parseCoordinates(coordString: string): Coordinate {
  // Expected format: "lat,lng" or "{lat},{lng}"
  const [lat, lng] = coordString.split(',').map(num => parseFloat(num.trim()));
  return { lat, lng };
}

export function getBoundsForCoordinates(coordinates: Coordinate[]): {
  ne: Coordinate;
  sw: Coordinate;
} {
  const lats = coordinates.map(coord => coord.lat);
  const lngs = coordinates.map(coord => coord.lng);

  return {
    ne: { lat: Math.max(...lats), lng: Math.max(...lngs) },
    sw: { lat: Math.min(...lats), lng: Math.min(...lngs) }
  };
}

export function calculateMapCenter(coordinates: Coordinate[]): Coordinate {
  const bounds = getBoundsForCoordinates(coordinates);
  return {
    lat: (bounds.ne.lat + bounds.sw.lat) / 2,
    lng: (bounds.ne.lng + bounds.sw.lng) / 2
  };
}
