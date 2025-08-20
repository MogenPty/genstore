import type { CollectionConfig } from "payload";

import { isSuperAdmin } from "@/lib/access";
import { Tenant } from "@/payload-types";

export const Products: CollectionConfig = {
  slug: "products",
  access: {
    create: ({ req }) => {
      if (isSuperAdmin(req.user)) return true;

      const tenant = req.user?.tenants?.[0]?.tenant as Tenant;

      return Boolean(tenant?.stripeDetailsSubmitted);
    },
  },
  admin: {
    useAsTitle: "name",
    description: "You must verify your account before creating products.",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "price",
      type: "number",
      required: true,
    },
    {
      name: "refundPolicy",
      type: "select",
      options: ["30-days", "14-days", "7-days", "3-days", "1-day", "no-refund"],
    },
    {
      name: "content",
      type: "textarea",
      admin: {
        description:
          "Protected Content only visible to customers after purchase. Add product documentation, downloadable files, getting started guides, Coupon ID, etc. Supports Markdown formatting.",
      },
    },
  ],
};
