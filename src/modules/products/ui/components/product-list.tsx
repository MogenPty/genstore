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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {data.docs.map((product) => (
        <div
          key={product.id}
          className="border rounded-md bg-white p-4 shadow-none hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-medium">{product.name}</h2>
          <p className="text-sm text-gray-600">${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export const ProductListSkeleton = () => {
  return (
    <div className="h-64 bg-gray-200 animate-pulse">Loading products...</div>
  );
};
