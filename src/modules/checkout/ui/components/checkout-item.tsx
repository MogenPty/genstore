import Image from "next/image";
import Link from "next/link";

import { cn, formatCurrency } from "@/lib/utils";

interface Props {
  isLast?: boolean;
  name: string;
  imageUrl?: string | null;
  productUrl: string;
  tenantName: string;
  tenantUrl: string;
  price: number;
  onRemove: () => void;
}

export const CheckoutItem = ({
  isLast = false,
  name,
  imageUrl,
  productUrl,
  tenantName,
  tenantUrl,
  price,
  onRemove,
}: Props) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[8.5rem_1fr_auto] gap-4 pr-4 border-b last:border-b-0",
        isLast && "border-b-0"
      )}
    >
      <div className="overflow-hidden border-r">
        <div className="relative aspect-square h-full">
          <Image
            src={imageUrl || "/placeholder.png"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between py-4">
        <div>
          <Link href={productUrl}>
            <h3 className="font-bold underline">{name}</h3>
          </Link>
          <Link href={tenantUrl}>
            <p className="font-medium underline">{tenantName}</p>
          </Link>
        </div>
      </div>

      <div className="flex flex-col py-4 justify-between">
        <p className="font-medium">{formatCurrency(price)}</p>
        <button
          onClick={onRemove}
          className="underline font-medium cursor-pointer"
          type="button"
        >
          Remove
        </button>
      </div>
    </div>
  );
};
