import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateTenantURL(tenantSlug: string) {
  return `/tenants/${tenantSlug}`;
}

// Re-use the formatter and perform strict numeric coercion.
const ZAR_FORMATTER = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
});

export function formatCurrency(value: number | string): string {
  const amount =
    typeof value === "string"
      ? parseFloat(value.replace(/[^0-9.-]+/g, ""))
      : value;

  if (!Number.isFinite(amount)) {
    throw new TypeError(`formatCurrency: invalid numeric value "${value}".`);
  }

  return ZAR_FORMATTER.format(amount);
}
