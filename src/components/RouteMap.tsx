"use client";

import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import { Coordinate, calculateMapCenter, getBoundsForCoordinates, parseCoordinates } from '@/utils/map';
import { Stop, TransportMode } from '@/types/stop';
import { useActiveStop } from '@/context/ActiveStopContext';

const TRANSPORT_COLORS: Record<TransportMode, string> = {
  walking: '#4CAF50',
  cycling: '#2196F3',
  driving: '#FFC107',
  ferry: '#03A9F4'
};

const TRANSPORT_ICONS: Record<TransportMode, string> = {
  walking: '/icons/walking-person-go-walk-move.svg',
  cycling: '/icons/USDOT_highway_sign_bicycle_symbol_-_black.svg.png',
  driving: '/icons/Car_with_Driver-Silhouette.svg',
  ferry: '/icons/ferry-svgrepo-com.svg'
};

interface RouteMapProps {
  stops: Stop[];
  className?: string;
}

async function getDirections(start: Coordinate, end: Coordinate, mode: TransportMode) {
  const modeMapping = {
    walking: 'walking',
    cycling: 'cycling',
    driving: 'driving',
    ferry: 'driving'
  };

  const response = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/${modeMapping[mode]}/${start.lng},${start.lat};${end.lng},${end.lat}?alternatives=false&continue_straight=true&geometries=geojson&overview=full&steps=true&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
  );
  const data = await response.json();
  return data.routes[0].geometry.coordinates;
}

export default function RouteMap({ stops, className = "" }: RouteMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const { activeIndex, setActiveIndex } = useActiveStop();

  // Initialize map only once
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const coordinates = stops.map(stop => parseCoordinates(stop.google_map_coordinates));
    const center = calculateMapCenter(coordinates);
    const bounds = getBoundsForCoordinates(coordinates);

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [center.lng, center.lat],
      zoom: 12,
      dragRotate: false
    });

    map.current = mapInstance;

    // Draw routes
    mapInstance.on('load', async () => {
      for (let i = 0; i < stops.length - 1; i++) {
        const currentCoord = parseCoordinates(stops[i].google_map_coordinates);
        const nextCoord = parseCoordinates(stops[i + 1].google_map_coordinates);
        const nextStop = stops[i + 1];

        try {
          const routeCoordinates = await getDirections(currentCoord, nextCoord, nextStop.transport_mode);

          mapInstance.addSource(`route-${i}`, {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: routeCoordinates
              }
            }
          });

          mapInstance.addLayer({
            id: `route-line-${i}`,
            type: 'line',
            source: `route-${i}`,
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': TRANSPORT_COLORS[nextStop.transport_mode],
              'line-width': 4
            }
          });
        } catch (error) {
          console.error('Error fetching directions:', error);
        }
      }
    });

    // Add markers
    coordinates.forEach((coord, index) => {
      const el = document.createElement('div');
      el.style.backgroundColor = TRANSPORT_COLORS[stops[index].transport_mode];
      el.style.width = '32px';
      el.style.height = '32px';
      el.style.borderRadius = '50%';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      el.style.cursor = 'pointer';
      
      const img = document.createElement('img');
      img.src = TRANSPORT_ICONS[stops[index].transport_mode];
      img.style.width = '18px';
      img.style.height = '18px';
      img.style.filter = 'brightness(0) invert(1)';
      img.style.objectFit = 'contain';
      el.appendChild(img);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([coord.lng, coord.lat])
        .addTo(mapInstance);

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Marker clicked:', index);
        const newIndex = activeIndex === index ? null : index;
        setActiveIndex(newIndex);
      });

      markersRef.current.push(marker);
    });

    // Add click outside handler
    mapInstance.getCanvas().addEventListener('click', () => {
      console.log('Map clicked, resetting markers');
      setActiveIndex(null);
    });

    mapInstance.fitBounds([
      [bounds.sw.lng, bounds.sw.lat],
      [bounds.ne.lng, bounds.ne.lat]
    ], { padding: 50 });

    return () => {
      map.current?.remove();
      map.current = null;
      markersRef.current = [];
    };
  }, [stops]); // Only depend on stops, not activeIndex

  // Handle active index changes
  useEffect(() => {
    if (!map.current || !markersRef.current.length) return;

    // Update marker sizes
    markersRef.current.forEach((marker, index) => {
      const el = marker.getElement();
      const img = el.querySelector('img') as HTMLImageElement;
      
      if (index === activeIndex) {
        el.style.width = '48px';
        el.style.height = '48px';
        img.style.width = '27px';
        img.style.height = '27px';
      } else {
        el.style.width = '32px';
        el.style.height = '32px';
        img.style.width = '18px';
        img.style.height = '18px';
      }
    });

    // Update route opacities
    const mapInstance = map.current;
    if (mapInstance && mapInstance.isStyleLoaded()) {
      stops.forEach((_, i) => {
        if (i < stops.length - 1) {
          const opacity = activeIndex === null || i === activeIndex ? 1 : 0.3;
          mapInstance.setPaintProperty(`route-line-${i}`, 'line-opacity', opacity);
        }
      });
    }
  }, [activeIndex, stops]);

  return (
    <div 
      ref={mapContainer} 
      className={`w-full h-[400px] rounded-lg ${className}`}
    />
  );
}
