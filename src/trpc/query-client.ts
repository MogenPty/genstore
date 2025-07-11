import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import superjson from "superjson";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 30,
      },
      dehydrate: {
        serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) => {
          // Only dehydrate queries that are not in the cache
          return (
            query.state.status === "pending" ||
            defaultShouldDehydrateQuery(query)
          );
        },
      },
      hydrate: {
        deserializeData: superjson.deserialize,
      },
    },
  });
}
