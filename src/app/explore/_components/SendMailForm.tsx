import { sendMail } from "@/actions/email.action";
import { FormMessage } from "@/components/FormMessage";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Itinerary } from "@/types/itinerary";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function SendMailForm({
  itinerary,
  closeDialog,
}: {
  itinerary: Itinerary;
  closeDialog: () => void;
}) {
  const [state, action] = useFormState(sendMail, {
    success: false,
    zodErrors: {},
    errorMessage: "",
  });

  useEffect(() => {
    if (state.success) {
      toast({
        description: "Itinerary has been sent to your email.",
        variant: "success",
      });
      closeDialog();
    }
  }, [state.success, closeDialog]);

  return (
    <form className="grid gap-2 mt-4" action={action}>
      <Label htmlFor="email" className="text-sm md:text-base font-normal">
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
      <Input name="itinerary" type="hidden" value={JSON.stringify(itinerary)} />
      <div className="flex items-center space-x-2 mt-2">
        <Checkbox id="terms" required />
        <Label
          htmlFor="terms"
          className="text-xs md:text-sm font-light italic peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          By clicking &quot;Send,&quot; you agree to receive emails from
          NookTrip.
        </Label>
      </div>
      <FormMessage message={[state.errorMessage ?? ""]} type="error" />
      <DialogFooter className="mt-4 items-center sm:!justify-center">
        <SubmitButton />
      </DialogFooter>
    </form>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      size="lg"
      type="submit"
      className="font-bold px-8 py-5 md:text-base"
      disabled={pending}
    >
      {pending ? <Loader2 className="w-4 h-4 mx-3 animate-spin" /> : "Send"}
    </Button>
  );
};
