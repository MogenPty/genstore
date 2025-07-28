import type { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  admin: {
    useAsTitle: "slug",
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
      admin: {
        description:
          "The slug of the store that will be used in the URL. It should be unique. e.g. 'https://slug.genstore.com'.",
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
        readOnly: true,
        description: "The Stripe account ID associated with the store.",
      },
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      label: "Is Active",
      admin: {
        description:
          "Whether the store is active and can be used by users. If false, the store will not be accessible.",
      },
    },
    {
      name: "stripeDetailsSubmitted",
      type: "checkbox",
      admin: {
        readOnly: true,
        description:
          "Store cannot add products until they have submitted their Stripe account details.",
      },
    },
  ],
};
