"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { Coordinate, calculateMapCenter, getBoundsForCoordinates, parseCoordinates } from "@/utils/map";
import { Stop, TransportMode } from "@/types/stop";
import { useActiveStop } from "@/context/ActiveStopContext";

const TRANSPORT_COLORS: Record<TransportMode, string> = {
  walking: "#4CAF50",
  cycling: "#2196F3",
  driving: "#FFC107",
  ferry: "#03A9F4",
};

const TRANSPORT_ICONS: Record<TransportMode, string> = {
  walking: "/icons/walking-person-go-walk-move.svg",
  cycling: "/icons/USDOT_highway_sign_bicycle_symbol_-_black.svg.png",
  driving: "/icons/Car_with_Driver-Silhouette.svg",
  ferry: "/icons/ferry-svgrepo-com.svg",
};

interface RouteMapProps {
  stops: Stop[];
  className?: string;
}

async function getDirections(start: Coordinate, end: Coordinate, mode: TransportMode) {
  const modeMapping = {
    walking: "walking",
    cycling: "cycling",
    driving: "driving",
    ferry: "driving",
  };

  const response = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/${modeMapping[mode]}/${start.lng},${start.lat};${end.lng},${end.lat}?alternatives=false&continue_straight=true&geometries=geojson&overview=full&steps=true&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
  );
  const data = await response.json();
  return data.routes[0].geometry.coordinates;
}

export default function RouteMap({ stops, className = "" }: RouteMapProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const { activeIndex, setActiveIndex } = useActiveStop();
  const mapInitializedRef = useRef(false);

  useEffect(() => {
    if (!mapContainer.current || mapInitializedRef.current) return;
    mapInitializedRef.current = true;

    const coordinates = stops.map((stop) => parseCoordinates(stop.google_map_coordinates));
    const center = calculateMapCenter(coordinates);
    const bounds = getBoundsForCoordinates(coordinates);

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [center.lng, center.lat],
      zoom: 12,
      dragRotate: false,
    });

    map.current = mapInstance;

    mapInstance.on("load", async () => {
      for (let i = 0; i < stops.length - 1; i++) {
        const currentCoord = parseCoordinates(stops[i].google_map_coordinates);
        const nextCoord = parseCoordinates(stops[i + 1].google_map_coordinates);
        const nextStop = stops[i + 1];

        try {
          const routeCoordinates = await getDirections(currentCoord, nextCoord, nextStop.transport_mode);

          mapInstance.addSource(`route-${i}`, {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: routeCoordinates,
              },
            },
          });

          mapInstance.addLayer({
            id: `route-line-${i}`,
            type: "line",
            source: `route-${i}`,
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": TRANSPORT_COLORS[nextStop.transport_mode],
              "line-width": 4,
            },
          });
        } catch (error) {
          console.error("Error fetching directions:", error);
        }
      }
    });

    coordinates.forEach((coord, index) => {
      const el = document.createElement("div");
      el.style.backgroundColor = TRANSPORT_COLORS[stops[index].transport_mode];
      el.style.width = "32px";
      el.style.height = "32px";
      el.style.borderRadius = "50%";
      el.style.display = "flex";
      el.style.alignItems = "center";
      el.style.justifyContent = "center";
      el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
      el.style.cursor = "pointer";

      const img = document.createElement("img");
      img.src = TRANSPORT_ICONS[stops[index].transport_mode];
      img.style.width = "18px";
      img.style.height = "18px";
      img.style.filter = "brightness(0) invert(1)";
      img.style.objectFit = "contain";
      el.appendChild(img);

      const marker = new mapboxgl.Marker(el).setLngLat([coord.lng, coord.lat]).addTo(mapInstance);

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        const newIndex = activeIndex === index ? null : index;
        setActiveIndex(newIndex);
      });

      markersRef.current.push(marker);
    });

    mapInstance.getCanvas().addEventListener("click", () => {
      setActiveIndex(null);
    });

    mapInstance.fitBounds(
      [
        [bounds.sw.lng, bounds.sw.lat],
        [bounds.ne.lng, bounds.ne.lat],
      ],
      { padding: 50 }
    );

    return () => {
      mapInstance.remove();
      map.current = null;
      markersRef.current = [];
      mapInitializedRef.current = false;
    };
  }, [stops]);

  // Handle Fullscreen Mode
  useEffect(() => {
    if (map.current) {
      map.current.resize(); // Adjust map size when switching to fullscreen
    }
  }, [isFullScreen]);

  return (
    <div className={`relative ${isFullScreen ? "z-20" : ""}`}>
      <div
        ref={mapContainer}
        className={`w-full ${isFullScreen ? "h-screen fixed top-0 left-0" : "h-[400px] overflow-hidden"} rounded-lg ${className}`}
      >
        <button
          onClick={() => setIsFullScreen(!isFullScreen)}
          className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md"
        >
          <img
            src={isFullScreen ? "/icons/exit-fullscreen.svg" : "/icons/fullscreen.svg"}
            alt="fullscreen icon"
            className="w-6 h-6"
          />
        </button>
      </div>
    </div>
  );
}
