import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

type CategoriesOutput = inferRouterOutputs<AppRouter>["categories"]["getMany"];

export type CategoryOutput = CategoriesOutput[0];
