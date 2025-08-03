import { authRouter } from "@/modules/auth/server/procedures";
import { categoriesRouter } from "@/modules/categories/server/procedure";
import { checkoutRouter } from "@/modules/checkout/server/procedure";
import { productsRouter } from "@/modules/products/server/procedure";
import { tagsRouter } from "@/modules/tags/server/procedures";
import { tenantsRouter } from "@/modules/tenants/server/procedure";

import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  categories: categoriesRouter,
  checkout: checkoutRouter,
  products: productsRouter,
  tags: tagsRouter,
  tenants: tenantsRouter,
});

export type AppRouter = typeof appRouter;
