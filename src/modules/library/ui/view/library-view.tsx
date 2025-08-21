import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { ProductList, ProductListSkeleton } from "../components/product-list";
import { Suspense } from "react";

export const LibraryView = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="p-4 bg-[#F4F4F4] w-full border-b">
        <Link href="/" prefetch className="flex items-center gap-2">
          <ArrowLeftIcon className="size-4" />
          <span className="text font-medium">Continue Shopping</span>
        </Link>
      </nav>
      <header className="py-8 bg-[#F4F4F4] border-b">
        <div className="flex flex-col gap-y-4 mx-auto max-w-(--breakpoint-xl) px-4 lg:px-12">
          <h1 className="text-[40px] font-medium">Library</h1>
          <p className="font-medium">Your purchases and reviews</p>
        </div>
      </header>
      <section className="py-10 mx-auto max-w-(--breakpoint-xl) px-4 lg:px-12">
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList />
        </Suspense>
      </section>
    </div>
  );
};
