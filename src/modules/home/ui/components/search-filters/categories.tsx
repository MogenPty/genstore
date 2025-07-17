/** biome-ignore-all lint/a11y/noStaticElementInteractions: false positive */
"use client";

import { ListFilterIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { CategoryOutput } from "@/modules/categories/types";
import { cn } from "@/lib/utils";

import { CategoriesSidebar } from "./categories-sidebar";
import { CategoryDropdown } from "./category-dropdown";
import { useParams } from "next/navigation";

interface Props {
  data: CategoryOutput[]; // Define the type based on your data structure
}

export const Categories = ({ data }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(data.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const params = useParams();
  const categoryParam = params.category as string | undefined;

  const activeCategory = categoryParam || "all"; // Replace with your logic to get the active category

  const activeCategoryIndex = data.findIndex(
    (category) => category.slug === activeCategory
  );
  const isActiveCategoryHidden =
    activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

  useEffect(() => {
    const calculateVisibleCount = () => {
      if (!containerRef.current || !measureRef.current || !viewAllRef.current) {
        return;
      }

      const containerWidth = containerRef.current.offsetWidth;
      const viewAllWidth = viewAllRef.current.offsetWidth;
      const availableWidth = containerWidth - viewAllWidth;

      const items = Array.from(measureRef.current.children);

      let totalWidth = 0;
      let visible = 0;

      for (const item of items) {
        const itemWidth = item.getBoundingClientRect().width;

        if (totalWidth + itemWidth > availableWidth) break;

        totalWidth += itemWidth;
        visible++;
      }

      setVisibleCount(visible);
    };

    const resizeObserver = new ResizeObserver(calculateVisibleCount);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      {/* Hidden container for measuring widths */}
      <div
        className="absolute opacity-0 pointer-events-none flex"
        style={{ position: "fixed", left: -9999, top: -9999 }}
        ref={measureRef}
      >
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isHovered={isAnyHovered}
            />
          </div>
        ))}
      </div>

      {/* Container for visible categories */}
      <div
        className="flex flex-nowrap items-center"
        ref={containerRef}
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
      >
        {data.slice(0, visibleCount).map((category: CategoryOutput) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isHovered={isAnyHovered}
            />
          </div>
        ))}

        <div ref={viewAllRef} className="shrink-0">
          <Button
            variant="elevated"
            className={cn(
              "h-11 px-4 bg-transparent border-transparent hover:bg-primary hover:border-primary hover:text-primary-foreground text-secondary-foreground",
              isActiveCategoryHidden &&
                !isAnyHovered &&
                "bg-primary text-primary-foreground"
            )}
            onClick={() => setIsSidebarOpen(true)}
          >
            View All
            <ListFilterIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
