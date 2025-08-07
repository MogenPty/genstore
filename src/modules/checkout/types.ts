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
