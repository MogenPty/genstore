import configPromise from "@payload-config";
import { getPayload } from "payload";

export default async function Home() {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
    depth: 1, //load subcategories
    where: {
      parent: {
        exists: false,
      },
    },
  });

  return <div className="p-4 space-y-4">{JSON.stringify(data, null, 2)}</div>;
}
