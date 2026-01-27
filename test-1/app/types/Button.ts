/**
 * 按钮组件类型定义
 */

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ButtonVariant = "solid" | "outline" | "ghost" | "soft" | "link";

export type ButtonIntent =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "neutral";

export interface ButtonProps {
  /**
   * 按钮尺寸
   * @default "md"
   */
  size?: ButtonSize;

  /**
   * 按钮变体
   * @default "solid"
   */
  variant?: ButtonVariant;

  /**
   * 按钮意图/颜色
   * @default "primary"
   */
  intent?: ButtonIntent;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否加载中
   * @default false
   */
  loading?: boolean;

  /**
   * 是否全宽
   * @default false
   */
  fullWidth?: boolean;

  /**
   * 图标（左侧）
   */
  icon?: string;

  /**
   * 右侧图标
   */
  iconRight?: string;

  /**
   * 按钮类型
   * @default "button"
   */
  type?: "button" | "submit" | "reset";

  /**
   * 链接地址（如果提供，按钮将渲染为 NuxtLink）
   */
  to?: string;

  /**
   * 外部链接
   */
  href?: string;

  /**
   * 点击事件
   */
  onClick?: (event: MouseEvent) => void;
}
