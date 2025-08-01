import { Suspense } from "react";

import { ProductFilters } from "../components/product-filters";
import { ProductListSkeleton, ProductList } from "../components/product-list";
import { ProductSort } from "../components/product-sort";

interface Props {
  category?: string;
  tenantSlug?: string;
  narrowView?: boolean;
}

export const ProductListView = ({
  category,
  tenantSlug,
  narrowView,
}: Props) => {
  return (
    <div className="px-4 py-8 lg:px-12 flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 justify-between">
        <p className="text-2xl font-medium">Curated for you</p>
        <ProductSort />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-x-12 gap-y-6">
        <div className="lg:col-span-2">
          <ProductFilters />
        </div>
        <div className="lg:col-span-4 xl:col-span-6">
          <Suspense fallback={<ProductListSkeleton narrowView={narrowView} />}>
            <ProductList
              category={category}
              tenantSlug={tenantSlug}
              narrowView={narrowView}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
