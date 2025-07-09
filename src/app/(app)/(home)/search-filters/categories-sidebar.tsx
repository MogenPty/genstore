import { type Category } from "@/payload-types";

import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { se } from "date-fns/locale";

interface Props {
  data: Category[]; // Define the type based on your data structure
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const CategoriesSidebar = ({ data, open, onOpenChange }: Props) => {
  const [parentCategories, setParentCategories] = useState<Category[] | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const currentCategory = parentCategories ?? data ?? [];

  const router = useRouter();

  const handleCategoryClick = (category: Category) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as Category[]);
      setSelectedCategory(category);
    } else {
      if (parentCategories && selectedCategory)
        router.push(`/${selectedCategory.slug}/${category.slug}`);
      else {
        if (category.subcategories === null) router.push("/");
        else router.push(`/${category.slug}`);

        handleOpenChange?.(false);
      }
    }
  };

  const handleOpenChange = (open: boolean) => {
    setParentCategories(null);
    setSelectedCategory(null);
    onOpenChange?.(open);
  };

  const handleBackClick = () => {
    if (parentCategories) {
      setParentCategories(null);
      setSelectedCategory(null);
    }
  };

  const backgroundColor = selectedCategory?.color || "white"; // Default background color if not specified

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ backgroundColor }}
        aria-describedby="categories-sidebar"
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={handleBackClick}
              className="w-full text-left p-4 hover:bg-secondary hover:text-primary transition-colors flex items-center text-base font-medium cursor-pointer"
            >
              <ChevronLeftIcon className="size-4 mr-2" />
              Back
            </button>
          )}
          {currentCategory.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryClick(category)}
              className="w-full text-left p-4 hover:bg-secondary hover:text-primary transition-colors flex justify-between items-center text-base font-medium cursor-pointer"
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className="size-4 ml-auto" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
