"use client";

import { sendMail } from "@/actions/email.action";
import { FormMessage } from "@/components/FormMessage";
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
import { Itinerary } from "@/types/itinerary";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export const GetItineraryDialog = ({
  className,
  itinerary,
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  itinerary: Itinerary;
}) => {
  const ref = useRef<HTMLFormElement>(null);

  const [open, setOpen] = useState(false);

  const [state, action] = useFormState(sendMail, {
    success: false,
    zodErrors: {},
    errorMessage: "",
  });

  console.log(state);

  useEffect(() => {
    if (state.success) {
      toast({
        description: "Itinerary has been sent to your email.",
        variant: "success",
      });
      setOpen(false);
      ref.current?.reset();
    }
  }, [state.success]);

  console.log("open:", open);

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

        <form className="grid gap-2 mt-2" action={action} ref={ref}>
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
          <FormMessage message={state.zodErrors?.email} type="error" />
          <Input
            name="itinerary"
            type="hidden"
            value={JSON.stringify(itinerary)}
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
            <FormMessage message={[state.errorMessage ?? ""]} type="error" />
          </div>
          <DialogFooter className="mt-6 items-center sm:!justify-center">
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      size="lg"
      type="submit"
      className="font-bold px-8 py-5"
      disabled={pending}
    >
      {/* <Loader2 className="w-4 h-4 mx-3 animate-spin" /> */}
      {pending ? <Loader2 className="w-4 h-4 mx-3 animate-spin" /> : "Send"}
    </Button>
  );
};
