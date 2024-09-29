import { Badge } from "@/components/ui/badge";
import { Stop } from "@/types/stop";
import Image from "next/image";

export default function ItineraryDetailCard({
  stop,
  number,
}: {
  stop: Stop;
  number: number;
}) {
  // const [time, title] = stop?.start?.split(" - ");

  return (
    <div className="w-full relative bg-card p-4 border border-primary flex gap-4 rounded-lg min-h-32">
      <p className="text-[#FF7F50] font-bold text-4xl rounded-lg bg-[#E6E6E6] h-full px-4 flex items-center">
        {number}
      </p>
      <div className="flex-1 flex flex-col gap-4 items-start text-primary-foreground text-sm">
        <p className="text-base font-medium flex-1">{stop.location_title}</p>
        {stop.location_address && (
          <p className="flex gap-2">
            <Image
              className="w-4 h-4"
              src="/icons/location.png"
              width={50}
              height={50}
              alt="location"
            />
            <span>{stop.location_address}</span>
          </p>
        )}

        <p className="flex gap-2">
          <Image
            className="w-4 h-4"
            src="/icons/time.png"
            width={50}
            height={50}
            alt="time"
          />
          <span>{stop.duration}</span>
        </p>
      </div>
      {stop.cost > 0 && (
        <Badge className="absolute right-4 bottom-4 self-end px-5 py-1 text-sm">
          {`${stop.cost} ${stop.currency}`}
        </Badge>
      )}
    </div>
  );
}
