import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

type ProductsOutput = inferRouterOutputs<AppRouter>["products"]["getMany"];

export type ProductOutput = ProductsOutput["docs"][0];
