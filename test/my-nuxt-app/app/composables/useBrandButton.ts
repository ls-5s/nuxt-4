export type BrandIntent = "primary" | "neutral" | "danger";
export type BrandVariant = "solid" | "soft" | "outline" | "ghost";
export type BrandSize = "sm" | "md" | "lg";

export function brandButtonClasses({
  intent = "primary",
  variant = "solid",
  size = "md",
  loading = false,
}: {
  intent?: BrandIntent;
  variant?: BrandVariant;
  size?: BrandSize;
  loading?: boolean;
}) {
  const sizes: Record<BrandSize, string> = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2",
    lg: "px-4 py-2 text-lg",
  };
  const variants: Record<BrandVariant, Record<BrandIntent, string>> = {
    solid: {
      primary: "bg-brand-600 hover:bg-brand-700 text-white",
      neutral: "bg-gray-100 hover:bg-gray-200 text-gray-800",
      danger: "bg-red-600 hover:bg-red-700 text-white",
    },
    soft: {
      primary: "bg-brand-50 hover:bg-brand-100 text-brand-700",
      neutral: "bg-gray-50 hover:bg-gray-100 text-gray-700",
      danger: "bg-red-50 hover:bg-red-100 text-red-700",
    },
    outline: {
      primary: "ring-1 ring-brand-600 text-brand-700 hover:bg-brand-50",
      neutral: "ring-1 ring-gray-400 text-gray-700 hover:bg-gray-50",
      danger: "ring-1 ring-red-600 text-red-700 hover:bg-red-50",
    },
    ghost: {
      primary: "text-brand-700 hover:bg-brand-50",
      neutral: "text-gray-700 hover:bg-gray-50",
      danger: "text-red-700 hover:bg-red-50",
    },
  };
  const parts = ["border-0", sizes[size], variants[variant][intent]];
  if (variant === "soft" && size === "lg") parts.push("shadow-sm");
  if (loading) parts.push("opacity-75 cursor-not-allowed");
  return parts.join(" ");
}
