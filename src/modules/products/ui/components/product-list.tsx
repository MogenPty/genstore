"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { useProductFilters } from "../../hooks/use-product-filters";
import { ProductCard, ProductCardSkeleton } from "./product-card";
import { GENSTORE_PAGE_LIMIT } from "@/constants";
import { Button } from "@/components/ui/button";
import { InboxIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  category?: string;
  tenantSlug?: string;
  narrowView?: boolean;
}

export const ProductList = ({ category, tenantSlug, narrowView }: Props) => {
  const [filters] = useProductFilters();

  const trpc = useTRPC();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(
      trpc.products.getMany.infiniteQueryOptions(
        {
          ...filters,
          category,
          tenantSlug,
          limit: GENSTORE_PAGE_LIMIT,
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
        <InboxIcon className="size-12 text-black" />
        <p className="font-medium text-base">
          No products found for this category.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
          narrowView && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3"
        )}
      >
        {data.pages
          .flatMap((page) => page.docs)
          .map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.image?.url}
              tenantSlug={product.tenant?.slug || "Unknown"}
              tenantImageUrl={product.tenant?.logo?.url || undefined}
              reviewRating={product.reviewRating}
              reviewCount={product.reviewCount}
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

export const ProductListSkeleton = ({
  narrowView,
}: {
  narrowView?: boolean;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
        narrowView && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3"
      )}
    >
      {Array.from({ length: GENSTORE_PAGE_LIMIT }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};
