"use client";

import Image from "next/image";
import { Stop, TransportMode } from "@/types/stop";
import { useActiveStop } from "@/context/ActiveStopContext";

import Link from "next/link";

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

const TRANSPORT_LABELS: Record<TransportMode, string> = {
  walking: 'Walking',
  cycling: 'Cycling',
  driving: 'Driving',
  ferry: 'Ferry'
};

export default function IineraryDetailRoute({ 
  route, 
  transportMode,
  index 
}: { 
  route: string | null;
  transportMode: TransportMode;
  index: number;
}) {
  const { activeIndex } = useActiveStop();
  const opacity = activeIndex === null || activeIndex === index ? "opacity-100" : "opacity-30";

  if (!route) return null;
  

  

  const parts = route.split('/'); 
  const coordinates = parts[parts.length - 1].split(',');
  const latitude = coordinates[0]; 
  const longitude = coordinates[1]


  return (
    <div
    className={`relative z-10 my-8 w-[90%] m-auto flex items-center rounded-lg gap-2 transition-opacity duration-300 ${opacity}`}
    style={{ backgroundColor: TRANSPORT_COLORS[transportMode] + '20' }}
  >
    <Link
      href={`https://maps.google.com/maps?q=${latitude},${longitude}&zoom=15`}
      target="_blank"
      className="relative z-10 my-8 bg-[#e6e6e6] w-[90%] m-auto flex items-center rounded-lg gap-2 after:content-[''] after:absolute after:-z-10 after:h-[calc(100%+64px)] after:left-5 after:border-l-2 after:border-black/30 after:border-dashed"
    >
      <div className="p-1 rounded-lg" style={{ backgroundColor: TRANSPORT_COLORS[transportMode] }}>
        <div className="w-8 h-8 relative">
          <Image
            src={TRANSPORT_ICONS[transportMode]}
            className="invert object-contain"
            fill
            alt={transportMode}
          />
        </div>
      </div>
      <p className="text-sm font-medium capitalize">{TRANSPORT_LABELS[transportMode]}</p>

      <p className="text-xs text-[11px] pe-1 break-all">{route}</p>
      </Link>
    </div>


  );
}
