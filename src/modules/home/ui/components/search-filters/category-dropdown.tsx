"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { CategoryOutput } from "@/modules/categories/types";
import { cn } from "@/lib/utils";

import { SubcategoryMenu } from "./subcategory-menu";

interface Props {
  category: CategoryOutput;
  isActive: boolean;
  isHovered: boolean;
}

export const CategoryDropdown = ({ category, isActive, isHovered }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);

  const onMouseEnter = () => {
    if (category.subcategories) {
      setIsOpen(true);
    }
  };

  const onMouseLeave = () => {
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (category.subcategories?.length) {
      setIsOpen(!isOpen);
    }
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: <explanation>
    <div
      className="relative"
      ref={categoryRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={toggleDropdown}
    >
      <div className="relative">
        <Button
          variant="elevated"
          className={cn(
            "h-11 px-4 bg-transparent border-transparent hover:bg-primary hover:border-primary hover:text-primary-foreground text-black",
            isActive && !isHovered && "bg-primary text-primary-foreground",
            isOpen && "bg-primary text-primary-foreground"
          )}
        >
          <Link
            key={category.id}
            href={`/${category.slug === "all" ? "" : category.slug}`}
          >
            {category.name}
          </Link>
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

      <SubcategoryMenu category={category} isOpen={isOpen} />
    </div>
  );
};
