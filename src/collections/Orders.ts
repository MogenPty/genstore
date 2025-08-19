import type { CollectionConfig } from "payload";

import { isSuperAdmin } from "@/lib/access";

export const Orders: CollectionConfig = {
  slug: "orders",
  access: {
    read: ({ req }) => {
      if (isSuperAdmin(req.user)) return true;
      // Allow authenticated users to read only their own orders
      return {
        user: {
          equals: req.user?.id,
        },
      };
    },
    update: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  admin: {
    useAsTitle: "name",
    hidden: ({ user }) => !isSuperAdmin(user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
    },
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      required: true,
      hasMany: false,
    },
    {
      name: "stripeSessionId",
      type: "text",
      required: true,
      admin: {
        description: "Stripe Checkout Session associated with the order.",
      },
    },
  ],
};
