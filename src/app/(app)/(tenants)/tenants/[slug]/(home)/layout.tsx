import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

import { Footer } from "@/modules/tenants/ui/components/footer";
import { getQueryClient, trpc } from "@/trpc/server";
import { Navbar, NavbarSkeleton } from "@/modules/tenants/ui/components/navbar";

interface Props {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

const TenantLayout = async ({ children, params }: Props) => {
  const { slug } = await params;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.tenants.getOne.queryOptions({
      slug,
    })
  );

  return (
    <div className="min-h-screen bg-[#F4F4F0] flex flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<NavbarSkeleton />}>
          <Navbar slug={slug} />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1">
        <div className="max-w-(--breakpoint-xl) mx-auto">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default TenantLayout;
