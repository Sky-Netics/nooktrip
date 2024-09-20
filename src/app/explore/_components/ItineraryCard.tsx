import { Button } from '@/components/ui/button'
import { Itinerary } from '@/types/itinerary'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export default function ItineraryCard({itinerary, number, link}: {itinerary: Itinerary, number: number, link: string}) {
  return (
    <div
              className="relative grid px-6 pt-4 pb-5 rounded-md bg-card shadow-sm border border-muted"
            >
              <p className="text-xl font-bold">
                #{number} - {itinerary.package_name}
              </p>

              <div className="mt-3 flex gap-1.5 items-center text-xs text-muted-foreground">
                <Image
                  className="w-4 h-4"
                  src="/icons/location.png"
                  width={50}
                  height={50}
                  alt="cost image"
                />
                <span>{itinerary.total_distance}</span>

                <span className="mx-2">&#8226;</span>

                <Image
                  className="w-4 h-4"
                  src="/icons/duration.png"
                  width={50}
                  height={50}
                  alt="cost image"
                />
                <span>{itinerary.total_duration}</span>
              </div>

              <p className="mt-6 text-sm">{itinerary.summary}</p>

              <span className="max-sm:mt-4 sm:absolute right-6 top-4 text-primary-foreground font-extrabold">{`${itinerary.total_cost} CAD`}</span>

              <Link
                href={link}
                className="sm:mt-4 max-sm:absolute max-sm:bottom-4 max-sm:right-4 sm:justify-self-start"
              >
                <Button size="sm">
                  View Details{" "}
                  <ChevronRight className="w-4 h-4 hidden sm:block" />
                </Button>
              </Link>
            </div>
  )
}