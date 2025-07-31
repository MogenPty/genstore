import type { Sort, Where } from "payload";
import z from "zod";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category, Media, Product, Tenant } from "@/payload-types";

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
      const data = await ctx.payload.findByID({
        collection: "products",
        depth: 2, // Populates image and category fields
        id: input.id,
      });

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }
      const product = data as Product & {
        image: Media | null;
        tenant: Tenant & {
          logo: Media | null;
        };
      };

      return product;
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
      });

      return {
        ...data,
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
