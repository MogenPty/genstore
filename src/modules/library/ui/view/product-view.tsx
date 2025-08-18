"use client";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { ReviewSidebar } from "../components/review-sidebar";

interface Props {
  productId: string;
}

export const ProductView = ({ productId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.library.getOne.queryOptions({ productId })
  );
  return (
    <div className="min-h-screen bg-white">
      <nav className="p-4 bg-[#F4F4F4] w-full border-b">
        <Link href="/library" prefetch className="flex items-center gap-2">
          <ArrowLeftIcon className="size-4" />
          <span className="text font-medium">Back to Library</span>
        </Link>
      </nav>
      <header className="py-8 bg-[#F4F4F4] border-b">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 lg:px-12">
          <h1 className="text-[40px] font-medium">{data.name}</h1>
          <p className="font-medium">{data.description}</p>
        </div>
      </header>
      <section className="py-10 mx-auto max-w-(--breakpoint-xl) px-4 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="p-4 bg-white rounded-md border gap-4">
              <ReviewSidebar productId={productId} />
            </div>
          </div>
          <div className="lg:col-span-5">
            <p className="font-medium italic text-muted-foreground">
              No Special Content
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
