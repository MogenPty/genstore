import Link from "next/link";

import { CategoryOutput } from "@/modules/categories/types";

interface Props {
  category: CategoryOutput;
  isOpen: boolean;
}

export const SubcategoryMenu = ({ category, isOpen }: Props) => {
  if (
    !isOpen ||
    !category.subcategories ||
    category.subcategories.length === 0
  ) {
    return null;
  }

  const backgroundColor = category.color || "#F5F5F5"; // Default background color if not specified

  return (
    <div className="absolute z-100 w-60" style={{ top: "100%", left: 0 }}>
      <div className="w-60 h-3" />
      <div
        style={{ backgroundColor }}
        className="w-60 text-black rounded-md overflow-hidden border border-blue-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] -translate-x-[2px] -translate-y-[2px]"
      >
        <div>
          {category.subcategories.map((subcategory) => (
            <Link
              key={subcategory.id}
              href={`/${category.slug}/${subcategory.slug}`}
              className="w-full text-left p-4 hover:bg-primary hover:text-primary-foreground transition-colors duration-200 flex justify-between items-center underline font-medium"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
