"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { FormEvent, useState } from "react";

export const GetItineraryDialog = ({
  className,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast({
      description: "Itinerary has been sent to your email.",
      variant: "success"
    });
    setOpen(false);
  };
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

        <form className="grid gap-2 mt-2" onSubmit={(e) => handleSubmit(e)}>
          <Label htmlFor="email" className="text-sm font-normal">
            Enter your email to receive your trip details.
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Explore@NookTrip.ca"
            required
          />
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox id="terms" required />
            <Label
              htmlFor="terms"
              className="text-xs font-light italic peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              By clicking &quot;Send,&quot; you agree to receive emails from
              NookTrip.
            </Label>
          </div>
          <DialogFooter className="mt-6 items-center sm:!justify-center">
            <Button size="lg" type="submit" className="font-bold px-8 py-5">
              Send
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
