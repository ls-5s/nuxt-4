export interface Props {
  intent?: "primary" | "neutral" | "danger";
  variant?: "solid" | "soft" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: string;
  label?: string;
  to?: string;
}
