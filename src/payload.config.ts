// storage-adapter-import-placeholder
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { multiTenantPlugin } from "@payloadcms/plugin-multi-tenant";
import path from "path";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import sharp from "sharp";

import { Categories } from "./collections/Categories";
import { Media } from "./collections/Media";
import { Products } from "./collections/Products";
import { Tags } from "./collections/Tags";
import { Tenants } from "./collections/Tenants";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Categories, Media, Products, Tags, Tenants],
  cookiePrefix: "genstore", //default value is "payload"
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    multiTenantPlugin({
      collections: {
        products: {},
      },
      tenantsArrayField: {
        includeDefaultField: false,
      },
      userHasAccessToAllTenants: (user) =>
        Boolean(user?.roles?.includes("super-admin")),
    }),
    // storage-adapter-placeholder
  ],
});
