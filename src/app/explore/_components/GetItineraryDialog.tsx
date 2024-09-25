"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Itinerary } from "@/types/itinerary";
import { useState } from "react";
import SendMailForm from "./SendMailForm";

export const GetItineraryDialog = ({
  className,
  itinerary,
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  itinerary: Itinerary;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn("mt-6 py-5 px-10 font-semibold", className)}>
          Get Your Itinerary
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px] pt-12 text-primary-foreground">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-medium">
            Get Your Itinerary
          </DialogTitle>
        </DialogHeader>

        <SendMailForm
          itinerary={itinerary}
          closeDialog={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
