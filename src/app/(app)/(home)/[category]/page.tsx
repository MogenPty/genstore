import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

import { getQueryClient, trpc } from "@/trpc/server";
import {
  ProductList,
  ProductListSkeleton,
} from "@/modules/products/ui/components/product-list";

interface Props {
  params: Promise<{
    category: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { category } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({
      category,
    })
  );

  return (
    <div className="flex items-center justify-center h-full">
      <h1 className="text-2xl font-bold">Category Page: {category}</h1>
      <br />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList category={category} />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default Page;
