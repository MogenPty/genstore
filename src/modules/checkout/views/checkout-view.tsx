"use client";

import { InboxIcon, LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { generateTenantURL } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";

import { CheckoutItem } from "../ui/components/checkout-item";
import { CheckoutSidebar } from "../ui/components/checkout-sidebar";
import { useCart } from "../hooks/use-cart";
import { useCheckoutStates } from "../hooks/use-checkout-states";

interface Props {
  tenantSlug: string;
}

export const CheckoutView = ({ tenantSlug }: Props) => {
  const router = useRouter();
  const [states, setStates] = useCheckoutStates();

  const { productIds, removeProduct, clearAllCarts, clearCart } =
    useCart(tenantSlug);

  const trpc = useTRPC();
  const { data, error, isLoading } = useQuery(
    trpc.checkout.getProducts.queryOptions({ ids: productIds })
  );

  const purchase = useMutation(
    trpc.checkout.purchase.mutationOptions({
      onMutate: () => {
        setStates({ success: false, cancelled: false });
      },
      onSuccess: (data) => {
        if (data?.url) {
          window.location.href = data.url;
        } else {
          toast.error("Failed to create checkout session.");
        }
      },
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          toast.error("You must be logged in to complete the purchase.");
          router.push("/sign-in");
          return;
        }

        toast.error(
          error.message || "An error occurred while processing your request."
        );
      },
    })
  );

  useEffect(() => {
    if (states.success) {
      setStates({ success: false, cancelled: false });
      clearCart();
      router.push("/products");
    }
  }, [states.success, clearCart, router, setStates]);

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
            onPurchase={() => purchase.mutate({ tenantSlug, productIds })}
            isCancelled={states.cancelled}
            disabled={purchase.isPending}
          />
        </div>
      </div>
    </div>
  );
};
