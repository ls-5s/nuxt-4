export interface Props {
  /**
   * 按钮意图/颜色
   * @default "primary"
   */
  intent?: "primary" | "secondary" | "success" | "warning" | "danger" | "neutral" | "info";
  
  /**
   * 按钮变体样式
   * @default "solid"
   */
  variant?: "solid" | "soft" | "outline" | "ghost" | "link";
  
  /**
   * 按钮尺寸
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  
  /**
   * 是否加载中
   * @default false
   */
  loading?: boolean;
  
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  
  /**
   * 是否全宽
   * @default false
   */
  block?: boolean;
  
  /**
   * 左侧图标
   */
  icon?: string;
  
  /**
   * 右侧图标
   */
  iconRight?: string;
  
  /**
   * 按钮文本
   */
  label?: string;
  
  /**
   * 路由链接（如果提供，按钮将渲染为 NuxtLink）
   */
  to?: string;
  
  /**
   * 外部链接
   */
  href?: string;
  
  /**
   * 按钮类型
   * @default "button"
   */
  type?: "button" | "submit" | "reset";
  
  /**
   * 点击事件
   */
  onClick?: (event: MouseEvent) => void;
  
  /**
   * 自定义类名
   */
  class?: string;
}
