"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Category } from "@/payload-types";
import { SubcategoryMenu } from "./subcategory-menu";
import { useDropdownPosition } from "./use-dropdown-position";

interface Props {
  category: Category;
  isActive: boolean;
  isHovered: boolean;
}

export const CategoryDropdown = ({ category, isActive, isHovered }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const { getDropdownPosition } = useDropdownPosition(categoryRef);
  const dropdownPosition = getDropdownPosition();

  const onMouseEnter = () => {
    if (category.subcategories) {
      setIsOpen(true);
    }
  };

  const onMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: <explanation>
    <div
      className="relative"
      ref={categoryRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <Button
          variant="elevated"
          className={cn(
            "h-11 px-4 bg-transparent border-transparent hover:bg-primary hover:border-primary hover:text-primary-foreground text-secondary-foreground",
            isActive && !isHovered && "bg-primary text-primary-foreground"
          )}
        >
          {category.name}
        </Button>
        {category.subcategories && category.subcategories.length > 0 && (
          <div
            className={cn(
              `opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-[${category.color}] left-1/2 -translate-x-1/2`,
              isOpen && "opacity-100"
            )}
          />
        )}
      </div>

      <SubcategoryMenu
        category={category}
        isOpen={isOpen}
        position={dropdownPosition}
      />
    </div>
  );
};
