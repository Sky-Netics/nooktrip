"use client";

import Image from "next/image";
import { Stop, TransportMode } from "@/types/stop";
import { useActiveStop } from "@/context/ActiveStopContext";

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
  
  return (
    <div
      className={`relative z-10 my-8 w-[90%] m-auto flex items-center rounded-lg gap-2 transition-opacity duration-300 ${opacity}`}
      style={{ backgroundColor: TRANSPORT_COLORS[transportMode] + '20' }}
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
    </div>
  );
}
