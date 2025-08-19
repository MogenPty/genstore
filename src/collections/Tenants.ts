import type { CollectionConfig } from "payload";

import { isSuperAdmin } from "@/lib/access";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  admin: {
    useAsTitle: "slug",
  },
  access: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Store Name",
      admin: {
        description: "The name of the store that will be displayed to users.",
      },
    },
    {
      name: "slug",
      type: "text",
      index: true,
      required: true,
      unique: true,
      label: "Store URL",
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
      admin: {
        description:
          "The slug of the store that will be used in the URL. It should be unique. e.g. 'https://YourSlug.genstore.com'.",
      },
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      label: "Store Logo",
      admin: {
        description: "The logo of the store that will be displayed to users.",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Store Description",
    },
    {
      name: "stripeAccountId",
      type: "text",
      required: true,
      admin: {
        description: "The Stripe account ID associated with the store.",
      },
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      label: "Is Active",
      admin: {
        description:
          "Whether the store is active and accessible by users. If false, the store will not be accessible.",
      },
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
    },
    {
      name: "stripeDetailsSubmitted",
      type: "checkbox",
      admin: {
        description:
          "Store cannot add products until they have submitted their Stripe account details.",
      },
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
    },
  ],
};
