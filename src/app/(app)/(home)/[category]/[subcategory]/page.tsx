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
    subcategory?: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { subcategory } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({
      category: subcategory,
    })
  );

  return (
    <div className="flex items-center justify-center h-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList category={subcategory} />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default Page;
