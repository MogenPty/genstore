"use client";

import dynamic from "next/dynamic";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { LinkIcon, StarIcon } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { formatCurrency, generateTenantURL } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { StarRating } from "@/components/star-rating";
import { useTRPC } from "@/trpc/client";
// import { CartButton } from "../components/cart-button";

const CartButton = dynamic(
  () => import("../components/cart-button").then((mod) => mod.CartButton),
  {
    ssr: false,
    loading: () => (
      <Button disabled className="flex-1 bg-primary">
        Loading...
      </Button>
    ),
  }
);

interface Props {
  tenantSlug: string;
  productId: string;
}

export const ProductView = ({ tenantSlug, productId }: Props) => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.products.getOne.queryOptions({ id: productId })
  );

  return (
    <div className="px-4 lg:px-12 py-10">
      <div className="border rounded-sm bg-white overflow-hidden">
        <div className="relative aspect-[3.9] border-b">
          <Image
            src={data.image?.url || "/placeholder.png"}
            alt={data.image?.url ? data.name : "Placeholder product image"}
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-6">
          <div className="col-span-4">
            <div className="p-6">
              <h1 className="text-4xl font-medium mb-4">{data.name}</h1>
            </div>
            <div className="border-y flex">
              <div className="px-6 py-4 flex items-center justify-center border-r">
                <div className="relative px-2 py-1 border bg-accent w-fit">
                  <p className="text-base font-medium">
                    {formatCurrency(data.price)}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 flex items-center justify-center border-r">
                <Link
                  href={`${generateTenantURL(tenantSlug)}/products/${productId}`}
                  className="flex items-center gap-2"
                >
                  {data.tenant.logo?.url && (
                    <Image
                      src={data.tenant.logo.url}
                      alt={data.tenant.name}
                      width={20}
                      height={20}
                      className="rounded-full border shrink-0 size-[20px]"
                    />
                  )}
                  <p className="text-base underline font-medium">
                    {data.tenant.name}
                  </p>
                </Link>
              </div>

              <div className="hidden lg:flex px-6 py-4 items-center justify-center">
                <div className="flex items-center gap-1">
                  <StarRating rating={3} iconClassName="size-4" text="3/5" />
                </div>
              </div>
            </div>

            <div className="block lg:hidden px-6 py-4 items-center justify-center border-b">
              <div className="flex items-center gap-1">
                <StarRating rating={3} iconClassName="size-4" />
                <p className="text-base font-medium">{5} ratings</p>
              </div>
            </div>

            <div className="p-6">
              {data.description ? (
                <p className="text-base text-muted-foreground">
                  {data.description}
                </p>
              ) : (
                <p className="font-medium text-muted-foreground italic">
                  No description available.
                </p>
              )}
            </div>
          </div>

          <div className="col-span-2">
            <div className="border-t h-full lg:border-t-0 border-l">
              <div className="flex flex-col gap-4 p-6 border-b">
                <div className="flex flex-row items-center gap-2">
                  <CartButton tenantSlug={tenantSlug} productId={productId} />
                  <Button
                    variant="elevated"
                    className="size-9"
                    disabled={false}
                    onClick={() => {}}
                  >
                    <LinkIcon />
                  </Button>
                </div>

                <p className="text-center font-medium">
                  {data.refundPolicy === "no-refund"
                    ? "No refund policy"
                    : `${data.refundPolicy} money-back guarantee`}
                </p>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium">Ratings</h3>
                  <div className="flex items-center gap-x-1 font-medium">
                    <StarIcon className="size-4 fill-black" />
                    <p>({5})</p>
                    <p className="text-base">{5} ratings</p>
                  </div>
                </div>
                <div className="grid grid-cols-[auto_1fr_auto] gap-3 mt-4">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <Fragment key={rating}>
                      <div className="font-medium">
                        {rating} star{rating > 1 ? "s" : ""}
                      </div>
                      <Progress value={0} className="h-[1lh]" />
                      <div className="text-right font-medium">{0}%</div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
