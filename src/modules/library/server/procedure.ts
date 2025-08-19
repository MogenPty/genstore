import z from "zod";

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { Media, Tenant } from "@/payload-types";

import { GENSTORE_PAGE_CURSOR, GENSTORE_PAGE_LIMIT } from "@/constants";
import { TRPCError } from "@trpc/server";

export const libraryRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const ordersData = await ctx.payload.find({
        collection: "orders",
        pagination: false,
        depth: 0, // Populates only IDs without additional data
        limit: 1,
        where: {
          and: [
            {
              product: {
                equals: input.productId,
              },
            },
            {
              user: {
                equals: ctx.session.user.id,
              },
            },
          ],
        },
      });

      const order = ordersData.docs[0];

      if (!order) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Order not found",
        });
      }

      const product = await ctx.payload.findByID({
        collection: "products",
        id: input.productId,
        depth: 2,
      });

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      return {
        ...product,
        image: product.image as Media | null,
        tenant: product.tenant as Tenant & {
          logo: Media | null;
        },
      };
    }),
  getMany: protectedProcedure
    .input(
      z.object({
        cursor: z.number().default(GENSTORE_PAGE_CURSOR),
        limit: z.number().default(GENSTORE_PAGE_LIMIT),
      })
    )
    .query(async ({ ctx, input }) => {
      const ordersData = await ctx.payload.find({
        collection: "orders",
        depth: 0, // Populates only IDs without additional data
        page: input.cursor,
        limit: input.limit,
        where: {
          user: {
            equals: ctx.session.user.id,
          },
        },
      });

      const productIds = ordersData.docs.map((doc) => doc.product);

      const productsData = await ctx.payload.find({
        collection: "products",
        pagination: false,
        where: {
          id: {
            in: productIds,
          },
        },
      });

      const dataWithReviews = await Promise.all(
        productsData.docs.map(async (doc) => {
          const reviews = await ctx.payload.find({
            collection: "reviews",
            pagination: false,
            where: { product: { equals: doc.id } },
          });

          return {
            ...doc,
            reviewCount: reviews.totalDocs,
            reviewRating:
              reviews.docs.length === 0
                ? 0
                : reviews.docs.reduce((acc, review) => acc + review.rating, 0) /
                  reviews.totalDocs,
          };
        })
      );

      return {
        ...productsData,
        docs: dataWithReviews.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & {
            logo: Media | null;
          },
        })),
      };
    }),
});
