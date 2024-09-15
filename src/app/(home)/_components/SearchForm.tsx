"use client";

import { validateSearchItinerary } from "@/actions/search.action";
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
import { useFormState } from "react-dom";

export default function SearchForm() {
  const [state, action] = useFormState(validateSearchItinerary, {zodErrors: {}});

  return (
    <div className="w-full bg-[#F5F5F5] rounded-xl sm:order-2 p-4">
      <form
        action={action}
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
          <FormMessage message={state.zodErrors?.location} type="error" />

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
          <FormMessage message={state.zodErrors?.travelType} type="error" />

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
          <FormMessage message={state.zodErrors?.budget} type="error" />
        </div>

        <Button type="submit" className="px-8 font-semibold sm:mt-5">
          Search
        </Button>
      </form>
    </div>
  );
}

const FormDivider = () => {
  return <div className="hidden sm:block h-14 w-px border-amber-500 border" />;
};
