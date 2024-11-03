"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SearchItinerarySchema } from "@/schema/utils.schema";
import { FormMessage } from "@/components/FormMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface FormState {
  zodErrors?: Record<string, string[]>;
}

export default function SearchForm() {
  const [formState, setFormState] = useState<FormState>({
    zodErrors: undefined,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const location = formData.get("location") as string;
    const travelType = formData.get("travelType") as string;
    const budget = formData.get("budget") as string;

    const validationFields = SearchItinerarySchema.safeParse({
      location,
      travelType,
      budget: budget,
    });

    if (!validationFields.success) {
      setFormState({
        zodErrors: validationFields.error.flatten().fieldErrors,
      });
      setIsSubmitting(false);
    } else {
      router.push(
        `/explore?location=${location}&travelType=${travelType}&budget=${budget}`
      );
      setFormState({ zodErrors: undefined });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#F5F5F5] rounded-xl sm:order-2 p-4">
      <form
        onSubmit={handleSubmit}
        className="flex gap-6 flex-col items-start sm:flex-row"
      >
        <div className="grid w-full sm:max-w-sm items-center gap-1.5">
          <Label htmlFor="location">Location</Label>
          <Input
            type="text"
            name="location"
            id="location"
            placeholder="Toronto"
            required
          />
          <FormMessage message={formState.zodErrors?.location} type="error" />
        </div>

        <FormDivider />

        <div className="grid w-full sm:max-w-sm items-center gap-1.5">
          <Label htmlFor="travelComposite">Travel Composite</Label>
          <Select defaultValue="solo" name="travelType" required>
            <SelectTrigger>
              <SelectValue placeholder="Select travel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solo">Solo Traveler</SelectItem>
              <SelectItem value="couple">Couple Travelers</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage message={formState.zodErrors?.travelType} type="error" />
        </div>

        <FormDivider />

        <div className="grid w-full sm:max-w-sm items-center gap-1.5">
          <Label htmlFor="budget">Budget</Label>
          <Input
            type="number"
            id="budget"
            name="budget"
            placeholder="25"
            required
            min={0}
          />
          <FormMessage message={formState.zodErrors?.budget} type="error" />
        </div>
        <SubmitButton isSubmitting={isSubmitting} />
      </form>
    </div>
  );
}

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting }) => (
  <Button
    type="submit"
    className="px-8 font-semibold sm:mt-5"
    disabled={isSubmitting}
  >
    {isSubmitting ? (
      <Loader2 className="w-4 h-4 mx-4 animate-spin" />
    ) : (
      "Search"
    )}
  </Button>
);

const FormDivider: React.FC = () => (
  <div className="hidden sm:block h-14 w-px border-amber-500 border" />
);
