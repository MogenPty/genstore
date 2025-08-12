import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "lucide-react";

interface Props {
  id: string;
  name: string;
  imageUrl?: string | null;
  tenantSlug: string;
  tenantImageUrl?: string | null;
  reviewRating: number;
  reviewCount: number;
}

export const ProductCard = ({
  id,
  name,
  imageUrl,
  tenantSlug,
  tenantImageUrl,
  reviewRating,
  reviewCount,
}: Props) => {
  return (
    <Link href={`/library/${id}`}>
      <div className="hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transition-shadow border rounded-md bg-white overflow-hidden h-full flex flex-col">
        <div className="relative aspect-square">
          <Image
            src={imageUrl || "/placeholder.png"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4 border-y flex flex-col flex-1 gap-3">
          <h2 className="text-lg font-medium line-clamp-4">{name}</h2>
          <div className="flex items-center gap-2">
            {tenantImageUrl && (
              <Image
                src={tenantImageUrl}
                alt={tenantSlug}
                width={16}
                height={16}
                className="rounded-full border shrink-0 size-[16px]"
              />
            )}
            <p className="text-sm underline font-medium">{tenantSlug}</p>
          </div>
          {reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <StarIcon className="size-3.5 fill-primary" />
              <p className="text-sm font-medium">
                {reviewRating} ({reviewCount})
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="border rounded-md bg-white overflow-hidden h-full flex flex-col">
      <div className="relative aspect-square bg-gray-200 animate-pulse" />
      <div className="p-4 border-y flex flex-col flex-1 gap-3">
        <div className="h-6 bg-gray-200 animate-pulse w-full" />
        <div className="flex items-center gap-2">
          <div className="rounded-full border shrink-0 size-[16px] bg-gray-200 animate-pulse" />
          <div className="h-4 bg-gray-200 animate-pulse w-24" />
        </div>
        <div className="flex items-center gap-1">
          <StarIcon className="size-3.5 fill-primary" />
          <div className="h-4 bg-gray-200 animate-pulse w-16" />
        </div>
      </div>
    </div>
  );
};

export const ProductCardPlaceholder = () => {
  return <div className="w-full aspect-3/4 bg-neutral-200 animate-pulse" />;
};
