"use client";

import { StarIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface Props {
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

export const StarPicker = ({
  value = 0,
  onChange,
  disabled,
  className,
}: Props) => {
  const [hoveredStar, setHoveredStar] = useState(0);

  return (
    <div
      className={cn(
        "flex items-center",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          title={`Rate ${star} star${star > 1 ? "s" : ""}`}
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          type="button"
          disabled={disabled}
          className={cn(
            "p-0.5 hover:scale-110 transition",
            !disabled && "cursor-pointer hover:scale-none transition-none"
          )}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(0)}
        >
          <StarIcon
            className={cn(
              "size-5",
              (hoveredStar || value) >= star
                ? "fill-black stroke-black"
                : "stroke-black"
            )}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
};
