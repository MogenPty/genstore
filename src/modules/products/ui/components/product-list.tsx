"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { useProductFilters } from "../../hooks/use-product-filters";
import { ProductCard, ProductCardSkeleton } from "./product-card";
import { DEFAULT_PAGE_LIMIT } from "@/constants";
import { Button } from "@/components/ui/button";
import { InboxIcon } from "lucide-react";

interface Props {
  category?: string;
}

export const ProductList = ({ category }: Props) => {
  const [filters] = useProductFilters();

  const trpc = useTRPC();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(
      trpc.products.getMany.infiniteQueryOptions(
        {
          ...filters,
          category,
          limit: DEFAULT_PAGE_LIMIT,
        },
        {
          getNextPageParam: (lastPage) => {
            return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
          },
        }
      )
    );

  if (data.pages?.[0]?.docs.length === 0) {
    return (
      <div className="border border-primary border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full">
        <InboxIcon className="size-12 text-primary" />
        <p className="font-medium text-base">
          No products found for this category.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {data.pages
          .flatMap((page) => page.docs)
          .map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.image?.url}
              authorUsername={`mogenpty`}
              authorImageUrl={undefined}
              reviewRating={3}
              reviewCount={5}
              price={product.price}
            />
          ))}
      </div>
      <div className="flex justify-center pt-8">
        {hasNextPage && (
          <Button
            className="font-medium disabled:opacity-50 text-base bg-white"
            variant="outline"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </Button>
        )}
      </div>
    </>
  );
};

export const ProductListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {Array.from({ length: DEFAULT_PAGE_LIMIT }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};
