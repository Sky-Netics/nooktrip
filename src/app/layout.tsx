import type { Metadata } from "next";

import { Inter } from "next/font/google";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nook Trip",
  description: "Explore Your Perfect Day Nearby",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex min-h-screen flex-col items-center">
          <div className="flex-1 max-w-4xl flex flex-col gap-6 bg-[#FFFFF0] rounded-lg lg:rounded-3xl mx-4 w-[calc(100%-32px)] my-5 px-5 py-5 sm:my-8 sm:px-8 ">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
