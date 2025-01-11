import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative rounded-xl overflow-hidden">
      <Image
        className="hidden sm:block w-full h-80 object-cover"
        src="/home/hero.png"
        alt="Main Image"
        width={1438}
        height={564}
      />
      <div className="flex flex-col items-start gap-4 w-full sm:absolute sm:top-0 sm:left-0 sm:w-80 sm:h-full bg-yellow-900 bg-opacity-85 p-5 rounded-xl">
        <p className="text-white font-bold leading-[1.75] sm:text-3xl">
          Explore{" "}
          <span className="sm:block text-amber-500">Your Perfect Day</span>{" "}
          Nearby
        </p>
        <div className="flex-1 w-full flex justify-between flex-wrap sm:flex-col items-center sm:justify-end sm:items-start sm:mb-8 gap-4">
          <p className="text-white text-[13px] sm:text-xs">Plan, Travel, Remember</p>
          <Button className="px-4 sm:px-7 text-sm sm:text-lg font-bold">Explore</Button>
        </div>
      </div>
    </div>
  );
}
