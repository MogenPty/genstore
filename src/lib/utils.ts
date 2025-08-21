import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateTenantURL(tenantSlug: string) {
  const isDevelopment = process.env.NODE_ENV === "development";
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN?.trim();
  const isSubdomainEnabled = ["1", "true", "yes", "on"].includes(
    (process.env.NEXT_PUBLIC_SUBDOMAIN_ENABLED ?? "").toLowerCase()
  );

  if (!isSubdomainEnabled || !rootDomain) {
    return `/tenants/${tenantSlug}`;
  }

  let protocol = "https://";

  if (isDevelopment) {
    protocol = "http://";
  }

  return `${protocol}${tenantSlug}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`; // Use the public root domain
}

// Re-use the formatter and perform strict numeric coercion.
const ZAR_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "ZAR",
  numberingSystem: "latn",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  currencyDisplay: "narrowSymbol",
  useGrouping: true,
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
