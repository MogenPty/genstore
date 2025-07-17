"use client";

import { useParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";

import { DEFAULT_BACKGROUND_COLOR } from "@/modules/home/constants";
import { useTRPC } from "@/trpc/client";

import { Categories } from "./categories";
import { SearchInput } from "./search-input";
import { BreadcrumbNavigation } from "./breadcrumbs-navigation";

export const SearchFilters = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  const params = useParams();
  const categoryParam = params.category as string | undefined;
  const subcategoryParam = params.subcategory as string | undefined;
  const activeCategory = categoryParam || "all";

  const activeCategoryData = data.find((cat) => cat.slug === activeCategory);
  const activeSubcategoryData = activeCategoryData?.subcategories?.find(
    (subcat) => subcat.slug === subcategoryParam
  );

  const activeCategoryColor =
    activeCategoryData?.color || DEFAULT_BACKGROUND_COLOR;
  const activeCategoryName = activeCategoryData?.name || null;
  const activeSubcategoryName = activeSubcategoryData?.name || null;

  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: activeCategoryColor }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
      <BreadcrumbNavigation
        categorySlug={activeCategory}
        categoryName={activeCategoryName}
        subCategoryName={activeSubcategoryName}
      />
    </div>
  );
};

export const SearchFiltersSkeleton = () => {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
      <SearchInput disabled />
      <div className="hidden lg:block">
        <div className="h-max" />
      </div>
    </div>
  );
};
