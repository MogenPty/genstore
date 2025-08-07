import Stripe from "stripe";
import z from "zod";

import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { Media, Tenant } from "@/payload-types";
import { stripe } from "@/lib/stripe";
import { TRPCError } from "@trpc/server";

import { CheckoutMetadata, ProductMetadata } from "../types";

export const checkoutRouter = createTRPCRouter({
  purchase: protectedProcedure
    .input(
      z.object({
        productIds: z
          .array(z.string())
          .min(1, "At least one product ID is required"),
        tenantSlug: z.string().min(1, "Tenant slug is required"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { productIds, tenantSlug } = input;

      const products = await ctx.payload.find({
        collection: "products",
        depth: 2,
        where: {
          and: [
            {
              id: {
                in: productIds,
              },
            },
            {
              "tenant.slug": {
                equals: tenantSlug,
              },
            },
          ],
        },
      });

      console.log("🚀 ~ products:", products);

      if (!products || products.totalDocs !== productIds.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "One or more products not found",
        });
      }

      const tenantData = await ctx.payload.find({
        collection: "tenants",
        depth: 1,
        where: {
          slug: {
            equals: tenantSlug,
          },
        },
      });

      if (!tenantData || tenantData.totalDocs !== 1) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tenant not found",
        });
      }

      const tenant = tenantData.docs[0] as Tenant & {
        logo: Media | null;
      };

      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        products.docs.map((product) => ({
          quantity: 1,
          price_data: {
            currency: "zar",
            product_data: {
              name: product.name,
              metadata: {
                id: product.id,
                name: product.name,
                price: product.price,
                stripeAccountId: tenant.stripeAccountId || "",
                tenantSlug: tenant.slug,
              } as ProductMetadata,
            },
            unit_amount: product.price * 100, // Convert to cents
          },
        }));

      const checkout = await stripe.checkout.sessions.create({
        customer_email: ctx.session.user.email,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${tenant.slug}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${tenant.slug}/checkout?cancel=true`,
        line_items: lineItems,
        mode: "payment",
        invoice_creation: {
          enabled: true,
        },
        metadata: {
          tenantSlug: tenant.slug,
          userId: ctx.session.user.id,
        } as CheckoutMetadata,
      });

      if (!checkout.url) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create checkout session",
        });
      }

      return {
        url: checkout.url,
      };
    }),
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
