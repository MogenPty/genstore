"use client";
import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "../hooks/use-cart";
import { useEffect } from "react";
import { generateTenantURL } from "@/lib/utils";
import { CheckoutItem } from "../ui/components/checkout-item";
import { CheckoutSidebar } from "../ui/components/checkout-sidebar";
import { InboxIcon, LoaderIcon } from "lucide-react";

interface Props {
  tenantSlug: string;
}

export const CheckoutView = ({ tenantSlug }: Props) => {
  const { productIds, removeProduct, clearAllCarts } = useCart(tenantSlug);

  const trpc = useTRPC();
  const { data, error, isLoading } = useQuery(
    trpc.checkout.getProducts.queryOptions({ ids: productIds })
  );

  useEffect(() => {
    if (error?.data?.code === "NOT_FOUND") {
      clearAllCarts();
      toast.warning(`${error.message}. Cart cleared.`);
    }
  }, [clearAllCarts, error]);

  if (isLoading) {
    return (
      <div className="px-4 pt-4 lg:pt-16 lg:px-12">
        <div className="border border-primary border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full">
          <LoaderIcon className="animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  console.log("Checkout data:", data);

  if (!data || data?.totalDocs === 0) {
    return (
      <div className="px-4 pt-4 lg:pt-16 lg:px-12">
        <div className="border border-primary border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full">
          <InboxIcon className="size-12 text-black" />
          <p className="font-medium text-base">No products found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-4 lg:pt-16 lg:px-12">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="border rounded-md overflow-hidden bg-white">
            {data?.docs.map((product, index) => (
              <CheckoutItem
                key={product.id}
                name={product.name}
                isLast={index === data.docs.length - 1}
                imageUrl={product.image?.url}
                productUrl={`${generateTenantURL(tenantSlug)}/products/${product.id}`}
                price={product.price}
                tenantName={product.tenant.name}
                tenantUrl={generateTenantURL(tenantSlug)}
                onRemove={() => removeProduct(product.id)}
              />
            ))}
          </div>
        </div>
        <div className="lg:col-span-3">
          <CheckoutSidebar
            total={data?.totalPrice || 0}
            onCheckout={() => {}}
            isCancelled={false}
            isPending={false}
          />
        </div>
      </div>
    </div>
  );
};
