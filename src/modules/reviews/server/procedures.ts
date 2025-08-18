import z from "zod";

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

export const reviewsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const product = await ctx.payload.findByID({
        collection: "products",
        id: input.productId,
      });

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      const reviewData = await ctx.payload.find({
        collection: "reviews",
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

      const review = reviewData.docs[0];
      if (!review) {
        return null;
      }

      return review;
    }),
  create: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        rating: z
          .number()
          .min(1, { message: "Rating must be at least 1" })
          .max(5, { message: "Rating must be at most 5" }),
        description: z
          .string()
          .min(1, { message: "Description must be at least 1 character long" }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.payload.findByID({
        collection: "products",
        id: input.productId,
      });

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      const existingReview = await ctx.payload.find({
        collection: "reviews",
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

      if (existingReview.docs.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User has already reviewed this product",
        });
      }

      const review = await ctx.payload.create({
        collection: "reviews",
        data: {
          product: product.id,
          user: ctx.session.user.id,
          rating: input.rating,
          description: input.description,
        },
      });

      return review;
    }),
  update: protectedProcedure
    .input(
      z.object({
        reviewId: z.string(),
        rating: z
          .number()
          .min(1, { message: "Rating must be at least 1" })
          .max(5, { message: "Rating must be at most 5" }),
        description: z
          .string()
          .min(1, { message: "Description must be at least 1 character long" }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existingReview = await ctx.payload.findByID({
        collection: "reviews",
        id: input.reviewId,
        depth: 0,
      });

      if (!existingReview) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Review not found",
        });
      }

      if (existingReview.user !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "User is not allowed to update this review",
        });
      }

      const updatedReview = await ctx.payload.update({
        collection: "reviews",
        id: input.reviewId,
        data: {
          rating: input.rating,
          description: input.description,
        },
      });

      return updatedReview;
    }),
});
