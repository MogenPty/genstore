import { StarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const MIN_RATING = 0;
const MAX_RATING = 5;

interface Props {
  rating: number;
  className?: string;
  iconClassName?: string;
  text?: string;
}

export const StarRating = ({
  rating,
  className,
  iconClassName,
  text,
}: Props) => {
  // Normalise first to ensure we always end up with a finite number
  const normalised = Number.isFinite(rating) ? rating : MIN_RATING;
  const safeRating = Math.max(MIN_RATING, Math.min(MAX_RATING, normalised));

  return (
    <div className={cn("flex items-center gap-x-1", className)}>
      {Array.from({ length: 5 }, (_, index) => (
        <StarIcon
          key={index}
          className={cn(
            "size-4",
            index < safeRating ? "fill-black" : "",
            iconClassName
          )}
        />
      ))}
      {text && <p className="text-sm">{text}</p>}
    </div>
  );
};
