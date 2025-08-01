import { ChangeEvent } from "react";

import { formatCurrency } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  minPrice?: string | null;
  maxPrice?: string | null;
  onMinPriceChange?: (value: string | null) => void;
  onMaxPriceChange?: (value: string | null) => void;
}

export const PriceFilter = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: Props) => {
  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.-]+/g, "");
    onMinPriceChange?.(value);
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.-]+/g, "");
    onMaxPriceChange?.(value);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="min-price" className="font-medium text-base">
          Min Price
        </Label>
        <Input
          id="min-price"
          type="text"
          placeholder="R0.00"
          value={minPrice ? formatCurrency(minPrice) : ""}
          onChange={handleMinPriceChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="max-price" className="font-medium text-base">
          Max Price
        </Label>
        <Input
          id="max-price"
          type="text"
          placeholder="R0.00"
          value={maxPrice ? formatCurrency(maxPrice) : ""}
          onChange={handleMaxPriceChange}
        />
      </div>
    </div>
  );
};
