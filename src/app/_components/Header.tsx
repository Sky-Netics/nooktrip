import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center">
      <Link href="/">
        <Image
          className="w-20 h-12 md:w-24 md:h-16 object-cover"
          src="/Logo.png"
          priority
          width={588}
          height={348}
          alt="Logo"
        />
      </Link>
      <nav>
        <ul className="flex">
          <li>
            <Link href="/" className="text-amber-500 font-bold">
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
