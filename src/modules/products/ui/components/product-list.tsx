"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Props {
  category?: string;
}

export const ProductList = ({ category }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({
      category,
    })
  );

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export const ProductListSkeleton = () => {
  return (
    <div className="h-64 bg-gray-200 animate-pulse">Loading products...</div>
  );
};
