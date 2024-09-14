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

export default function SearchForm() {
  return (
    <div className="w-full bg-[#F5F5F5] rounded-xl sm:order-2 p-4">
      <form className="flex gap-6 flex-col items-start sm:flex-row sm:items-end">
        <div className="grid w-full sm:max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>

        <FormDivider />
        <div className="grid w-full sm:max-w-sm items-center gap-1.5">
          <Label htmlFor="travelComposite">Travel Composite</Label>
          <Select defaultValue="true">
            <SelectTrigger>
              <SelectValue placeholder="Select a verified email to display" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="true">Solo Traveler</SelectItem>
              <SelectItem value="false">Couple Travelers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <FormDivider />

        <div className="grid w-full sm:max-w-sm items-center gap-1.5">
          <Label htmlFor="budget">Budget</Label>
          <Input type="number" id="budget" placeholder="25" />
        </div>

        <Button type="submit" className="px-8 font-semibold">
          Search
        </Button>
      </form>
    </div>
  );
}

const FormDivider = () => {
  return <div className="hidden sm:block h-14 w-px border-amber-500 border" />;
};
