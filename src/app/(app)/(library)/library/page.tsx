import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { GENSTORE_PAGE_LIMIT } from "@/constants";
import { getQueryClient, trpc } from "@/trpc/server";
import { LibraryView } from "@/modules/library/ui/view/library-view";

export const dynamic = "force-dynamic";

const LibraryPage = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.library.getMany.infiniteQueryOptions({
      limit: GENSTORE_PAGE_LIMIT,
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LibraryView />
    </HydrationBoundary>
  );
};

export default LibraryPage;
