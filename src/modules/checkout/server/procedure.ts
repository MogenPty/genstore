import z from "zod";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Media, Tenant } from "@/payload-types";
import { TRPCError } from "@trpc/server";

export const checkoutRouter = createTRPCRouter({
  getProducts: baseProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.payload.find({
        collection: "products",
        depth: 2, // Populates image and category fields
        where: {
          id: {
            in: input.ids,
          },
        },
      });

      if (
        !data ||
        data.totalDocs === 0 ||
        data.totalDocs !== input.ids.length
      ) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Products not found",
        });
      }

      return {
        ...data,
        totalPrice: data.docs.reduce(
          (total, product) => total + (product.price || 0),
          0
        ),
        docs: data.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & {
            logo: Media | null;
          },
        })),
      };
    }),
});
