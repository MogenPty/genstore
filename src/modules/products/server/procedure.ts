import type { Sort, Where } from "payload";
import z from "zod";
import { headers as getHeaders } from "next/headers";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category, Media, Tenant } from "@/payload-types";

import { sortValues } from "../search-params";
import { GENSTORE_PAGE_CURSOR, GENSTORE_PAGE_LIMIT } from "@/constants";
import { TRPCError } from "@trpc/server";

export const productsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const headers = await getHeaders();
      const session = await ctx.payload.auth({ headers });

      const product = await ctx.payload.findByID({
        collection: "products",
        depth: 2, // Populates image and category fields
        id: input.id,
        select: {
          content: false, // Exclude content field
        },
      });

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      let isPurchased = false;

      if (session.user) {
        const orders = await ctx.payload.find({
          collection: "orders",
          pagination: false,
          limit: 1,
          where: {
            and: [
              { product: { equals: input.id } },
              { user: { equals: session.user.id } },
            ],
          },
        });

        isPurchased = orders.totalDocs > 0;
      }

      const reviews = await ctx.payload.find({
        collection: "reviews",
        pagination: false,
        where: { product: { equals: input.id } },
      });

      const reviewsRating =
        reviews.docs.length === 0
          ? 0
          : reviews.docs.reduce((acc, review) => acc + review.rating, 0) /
            reviews.docs.length;

      // Compute rating distribution counts for ratings 1..5
      const ratingDistribution = reviews.docs.reduce<Record<number, number>>(
        (acc, review) => {
          const r = Math.round(review.rating);
          if (r >= 1 && r <= 5) acc[r] = (acc[r] || 0) + 1;
          return acc;
        },
        {}
      );

      if (reviews.docs.length > 0) {
        Object.keys(ratingDistribution).forEach((key) => {
          const rating = Number(key);
          const count = ratingDistribution[rating] || 0;
          ratingDistribution[rating] = Math.round(
            (count / reviews.docs.length) * 100
          );
        });
      }

      return {
        ...product,
        isPurchased,
        image: product.image as Media | null,
        tenant: product.tenant as Tenant & {
          logo: Media | null;
        },
        reviewsRating,
        reviewCount: reviews.docs.length,
        ratingDistribution,
      };
    }),
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(GENSTORE_PAGE_CURSOR),
        limit: z.number().default(GENSTORE_PAGE_LIMIT),
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(),
        sort: z.enum(sortValues).nullable().optional(),
        tenantSlug: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};

      let sort: Sort = "-createdAt";

      if (input.sort === "trending") {
        sort = "name"; // Sort by name ascending for trending products
      }

      if (input.sort === "curated") {
        sort = "+createdAt"; // Sort by creation date ascending for curated products
      }

      if (input.sort === "hot_and_new") {
        sort = "-name"; // Sort by name descending for hot and new products
      }

      if (input.minPrice) {
        where.price = {
          greater_than_equal: parseFloat(input.minPrice),
        };
      }

      if (input.maxPrice) {
        where.price = {
          ...where.price,
          less_than_equal: parseFloat(input.maxPrice),
        };
      }

      if (input.tenantSlug) {
        where["tenant.slug"] = {
          equals: input.tenantSlug,
        };
      }

      if (input.category) {
        const categoryData = await ctx.payload.find({
          collection: "categories",
          limit: 1,
          depth: 1, // Populates image and category fields
          pagination: false,
          where: { slug: { equals: input.category } },
        });

        if (categoryData) {
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
            formattedData[0]?.slug,
            ...(formattedData[0]?.subcategories.map((subcat) => subcat.slug) ??
              []),
          ];

          where["category.slug"] = {
            in: subCategories,
          };
        }
      }

      if (input.tags && input.tags.length > 0) {
        where["tags.name"] = {
          in: input.tags,
        };
      }

      const data = await ctx.payload.find({
        collection: "products",
        depth: 2, // Populates image and category fields
        where,
        sort,
        page: input.cursor,
        limit: input.limit,
        select: {
          content: false, // Exclude content field
        },
      });

      const dataWithReviews = await Promise.all(
        data.docs.map(async (doc) => {
          const reviews = await ctx.payload.find({
            collection: "reviews",
            pagination: false,
            where: { product: { equals: doc.id } },
          });

          return {
            ...doc,
            reviewCount: reviews.docs.length,
            reviewRating:
              reviews.docs.length === 0
                ? 0
                : reviews.docs.reduce((acc, review) => acc + review.rating, 0) /
                  reviews.docs.length,
          };
        })
      );

      return {
        ...data,
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
