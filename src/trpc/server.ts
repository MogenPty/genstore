import "server-only";

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { cache } from "react";
// import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { createTRPCContext } from "./init";
import { makeQueryClient } from "./query-client";
import { appRouter } from "./routers/_app";

export const getQueryClient = cache(makeQueryClient);

export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});

export const caller = appRouter.createCaller(createTRPCContext);

// export function HydrateClient(props: { children: React.ReactNode }) {
//   const queryClient = getQueryClient();
//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       {props.children}
//     </HydrationBoundary>
//   );
// }

// export function prefetch<T extends ReturnType<TRPCOptions<any>>>(
//   queryOptions: T
// ){
//   const queryClient = getQueryClient();

//   if (queryOptions.queryKey[1] === 'inf')
// }
