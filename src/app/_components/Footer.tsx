import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-yellow-900 text-[#FFFFF0] text-sm flex flex-wrap justify-center sm:justify-between items-center gap-4 sm:gap-5 px-4 py-3 sm:px-8 lg:px-12">
      <div className="flex gap-2 items-center">
        <Image
          className="h-6 w-6 me-2"
          src="/Instagram.svg"
          alt="Instagram"
          height={55}
          width={55}
        />
        <Link href="#">Privacy</Link>
        <span>/</span>
        <Link href="#">Terms of Use</Link>
      </div>
      <p className="text-center">Copyright © 2024 NookTrip. All rights reserved.</p>
    </footer>
  );
}
