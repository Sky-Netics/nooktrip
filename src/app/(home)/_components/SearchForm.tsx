"use client";

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
import { useEffect, useState, FormEvent } from "react";

interface FormState {
  zodErrors?: Record<string, string[]>;
}

type LocationSuggestion = {
  properties: {
    formatted: string;
    city?: string;
    country?: string;
  };
};

export default function SearchForm() {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>({
    zodErrors: undefined,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputValue, setInputValue] = useState(""); // For the input display
  const [searchQuery, setSearchQuery] = useState(""); // For API calls
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const debounceTimeout = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `/api/location?query=${encodeURIComponent(searchQuery)}`
          );
          const data = await response.json();
          setSuggestions(data.features || []);
          setShowSuggestions(true);
        } catch (error) {
          console.error("Failed to fetch suggestions:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    setInputValue(suggestion.properties.formatted);
    setShowSuggestions(false);
    // Don't update searchQuery here to prevent API call
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchQuery(value); // Only update search query when typing
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      location: formData.get("location"),
      travelType: formData.get("travelType"),
      budget: formData.get("budget"),
    };

    try {
      const validatedData = SearchItinerarySchema.parse(data);
      router.push(
        `/explore?location=${validatedData.location}&travelType=${validatedData.travelType}&budget=${validatedData.budget}`
      );
    } catch (error: any) {
      if (error.errors) {
        const zodErrors: Record<string, string[]> = {};
        error.errors.forEach((err: any) => {
          const path = err.path[0];
          if (!zodErrors[path]) {
            zodErrors[path] = [];
          }
          zodErrors[path].push(err.message);
        });
        setFormState({ zodErrors });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#F5F5F5] rounded-xl sm:order-2 p-4">
      <form
        onSubmit={handleSubmit}
        className="flex gap-6 flex-col items-start sm:flex-row"
      >
        <div className="grid w-full sm:max-w-sm items-center gap-1.5 relative">
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <Input
              type="text"
              name="location"
              id="location"
              placeholder="Toronto"
              required
              value={inputValue}
              onChange={handleInputChange}
              onFocus={() => {
                if (suggestions.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              onBlur={() => {
                // Small delay to allow click on suggestion to register
                setTimeout(() => setShowSuggestions(false), 200);
              }}
              className="pr-8"
            />
            {isLoading && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
              </div>
            )}
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-10 mt-1 max-h-[200px] overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="py-1.5 px-2 hover:bg-gray-50 cursor-pointer transition-colors duration-150 border-b last:border-b-0"
                  onMouseDown={() => handleSuggestionClick(suggestion)}
                >
                  <span className="text-xs text-gray-700">
                    {suggestion.properties.formatted}
                  </span>
                </div>
              ))}
            </div>
          )}
          <FormMessage message={formState.zodErrors?.location} type="error" />
        </div>

        <FormDivider />

        <div className="grid w-full sm:max-w-sm items-center gap-1.5">
          <Label htmlFor="travelComposite">Travel Composite</Label>
          <Select defaultValue="solo" name="travelType" required>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select travel type" />
            </SelectTrigger>
            <SelectContent className="bg-white">
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
            className="bg-white"
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
