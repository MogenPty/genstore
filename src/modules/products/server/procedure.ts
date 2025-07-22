import type { Where } from "payload";
import z from "zod";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from "@/payload-types";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};

      if (input.category) {
        const categoryData = await ctx.payload.find({
          collection: "categories",
          limit: 1,
          depth: 1, // Populates image and category fields
          pagination: false,
          where: { slug: { equals: input.category } },
        });

        const formattedData = categoryData.docs.map((category) => ({
          ...category,
          subcategories: (category.subcategories?.docs ?? []).map(
            (subcategory) => ({
              ...(subcategory as Category),
              subcategories: undefined,
            })
          ),
        }));

        const subCategories = [
          formattedData[0].slug,
          ...formattedData[0].subcategories.map((subcat) => subcat.slug),
        ];
        const category = categoryData.docs[0];

        if (category) {
          where["category.slug"] = {
            in: subCategories,
          };
        }
      }

      const data = await ctx.payload.find({
        collection: "products",
        depth: 1, // Populates image and category fields
        where,
      });

      return data;
    }),
});
