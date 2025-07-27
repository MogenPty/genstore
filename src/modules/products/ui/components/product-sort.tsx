"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useProductFilters } from "../../hooks/use-product-filters";

export const ProductSort = () => {
  const [filters, setFilters] = useProductFilters();

  return (
    <div className="flex item-center gap-2">
      <Button
        size="sm"
        className={cn(
          "bg-white hover:bg-white",
          filters.sort !== "curated" &&
            "bg-transparent border-transparent hover:bg-transparent hover:border-border"
        )}
        variant="secondary"
        onClick={() => setFilters({ ...filters, sort: "curated" })}
      >
        Curated
      </Button>
      <Button
        size="sm"
        className={cn(
          "bg-white hover:bg-white",
          filters.sort !== "trending" &&
            "bg-transparent border-transparent hover:bg-transparent hover:border-border"
        )}
        variant="secondary"
        onClick={() => setFilters({ ...filters, sort: "trending" })}
      >
        Trending
      </Button>
      <Button
        size="sm"
        className={cn(
          "bg-white hover:bg-white",
          filters.sort !== "hot_and_new" &&
            "bg-transparent border-transparent hover:bg-transparent hover:border-border"
        )}
        variant="secondary"
        onClick={() => setFilters({ ...filters, sort: "hot_and_new" })}
      >
        Hot &amp; New
      </Button>
    </div>
  );
};
