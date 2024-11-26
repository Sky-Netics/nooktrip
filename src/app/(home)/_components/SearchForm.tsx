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
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

type LocationSuggestion = {
  properties: {
    formatted: string;
    city?: string;
    country?: string;
  };
};

export default function SearchForm() {
  const [state, action] = useFormState(validateSearchItinerary, {
    zodErrors: {},
  });
  const [inputValue, setInputValue] = useState(""); // For the input display
  const [searchQuery, setSearchQuery] = useState(""); // For API calls
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  return (
    <div className="w-full bg-[#F5F5F5] rounded-xl sm:order-2 p-4">
      <form
        action={action}
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
              className="pr-8"
            />
            {isLoading && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
              </div>
            )}
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <div 
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-10 mt-1 max-h-[200px] overflow-y-auto"
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="py-1.5 px-2 hover:bg-gray-50 cursor-pointer transition-colors duration-150 border-b last:border-b-0"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span className="text-xs text-gray-700">
                    {suggestion.properties.formatted}
                  </span>
                </div>
              ))}
            </div>
          )}
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
        <SubmitButton />
      </form>
    </div>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="px-8 font-semibold sm:mt-5"
      disabled={pending}
    >
      {pending ? <Loader2 className="w-4 h-4 mx-4 animate-spin" /> : "Search"}
    </Button>
  );
};

const FormDivider = () => {
  return <div className="hidden sm:block h-14 w-px border-amber-500 border" />;
};
