import Stripe from "stripe";

export type ProductMetadata = {
  stripeAccountId: string;
  id: string;
  name: string;
  price: number;
  currency?: string;
  tenantSlug: string;
};

export type CheckoutMetadata = {
  tenantSlug: string;
  userId: string;
};

export type ExpandedLineItem = Stripe.LineItem & {
  price: Stripe.Price & {
    product: Stripe.Product & {
      metadata: ProductMetadata;
    };
  };
};
