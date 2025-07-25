import type { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.payload.find({
      collection: "categories",
      depth: 1, //load subcategories
      pagination: false,
      where: {
        parent: {
          exists: false,
        },
      },
      sort: "name",
    });

    const formattedData = data.docs.map((category) => ({
      ...category,
      subcategories: (category.subcategories?.docs ?? []).map(
        (subcategory) => ({
          ...(subcategory as Category),
        })
      ),
    }));

    return formattedData;
  }),
});
