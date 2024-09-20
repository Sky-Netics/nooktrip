import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function IineraryDetailRoute({ route }: { route: string }) {
  return (
    <Link
      href={route}
      target="_blank"
      className="relative z-10 my-8 bg-[#e6e6e6] w-[90%] m-auto flex items-center rounded-lg gap-2 after:content-[''] after:absolute after:-z-10 after:h-[calc(100%+64px)] after:left-5 after:border-l-2 after:border-black/30 after:border-dashed"
    >
      <div className="p-1 bg-white rounded-lg">
        <Image
          src="/explore/route.png"
          className="w-8 h-8"
          width={46}
          height={46}
          alt="route"
        />
      </div>
      <p className="text-xs text-[11px] pe-1">{route}</p>
    </Link>
  );
}
