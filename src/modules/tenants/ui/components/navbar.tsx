"use client";

import Image from "next/image";
import Link from "next/link";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { generateTenantURL } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";

const CheckoutButtonSkeleton = () => (
  <Button disabled className="bg-accent text-accent-foreground">
    <ShoppingCartIcon className="text-accent-foreground" />
  </Button>
);

const CheckoutButton = dynamic(
  () =>
    import("@/modules/checkout/ui/components/checkout-button").then(
      (mod) => mod.CheckoutButton
    ),
  {
    ssr: false,
    loading: () => CheckoutButtonSkeleton(),
  }
);

interface Props {
  slug: string;
}

export const Navbar = ({ slug }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.tenants.getOne.queryOptions({
      slug,
    })
  );
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <Link
          href={generateTenantURL(slug)}
          className="flex items-center gap-2"
        >
          {data.logo?.url && (
            <Image
              src={data.logo.url}
              width={32}
              height={32}
              alt={data.name}
              className="rounded-full shrink-0 border size-[32px]"
            />
          )}
          <p className="text-xl">{data?.name}</p>
        </Link>
        <CheckoutButton
          hideIfEmpty
          tenantSlug={slug}
          className="bg-primary text-primary-foreground"
        />
      </div>
    </nav>
  );
};

export const NavbarSkeleton = () => {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <div className="w-32 h-6 bg-gray-200 animate-pulse" />
        <CheckoutButtonSkeleton />
      </div>
    </nav>
  );
};
