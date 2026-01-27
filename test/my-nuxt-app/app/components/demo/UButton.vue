<script setup lang="ts">
import { computed } from "vue";
import type { Props } from "../../types/UButton";

const props = withDefaults(defineProps<Props>(), {
  intent: "primary",
  variant: "solid",
  size: "md",
  loading: false,
  disabled: false,
  block: false,
  type: "button",
  icon: undefined,
  iconRight: undefined,
  label: undefined,
  to: undefined,
  href: undefined,
  class: undefined,
});

// 计算样式类
const classes = computed(() => {
  // 尺寸映射
  const sizes: Record<NonNullable<Props["size"]>, string> = {
    xs: "px-2 py-1 text-xs rounded-md",
    sm: "px-2.5 py-1.5 text-sm rounded-lg",
    md: "px-3 py-2 text-base rounded-lg",
    lg: "px-4 py-2.5 text-lg rounded-lg",
    xl: "px-6 py-3 text-xl rounded-xl",
  };

  // 变体和意图的组合映射
  const variants: Record<
    NonNullable<Props["variant"]>,
    Record<NonNullable<Props["intent"]>, string>
  > = {
    solid: {
      primary: "bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white shadow-sm hover:shadow-md transition-all",
      secondary: "bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white shadow-sm hover:shadow-md transition-all",
      success: "bg-green-600 hover:bg-green-700 active:bg-green-800 text-white shadow-sm hover:shadow-md transition-all",
      warning: "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white shadow-sm hover:shadow-md transition-all",
      danger: "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm hover:shadow-md transition-all",
      neutral: "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 shadow-sm hover:shadow-md transition-all",
      info: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm hover:shadow-md transition-all",
    },
    soft: {
      primary: "bg-brand-50 hover:bg-brand-100 active:bg-brand-200 text-brand-700 dark:bg-brand-900/20 dark:hover:bg-brand-900/30 dark:text-brand-400",
      secondary: "bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300",
      success: "bg-green-50 hover:bg-green-100 active:bg-green-200 text-green-700 dark:bg-green-900/20 dark:hover:bg-green-900/30 dark:text-green-400",
      warning: "bg-yellow-50 hover:bg-yellow-100 active:bg-yellow-200 text-yellow-700 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/30 dark:text-yellow-400",
      danger: "bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-700 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400",
      neutral: "bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300",
      info: "bg-blue-50 hover:bg-blue-100 active:bg-blue-200 text-blue-700 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:text-blue-400",
    },
    outline: {
      primary: "ring-1 ring-brand-600 text-brand-700 hover:bg-brand-50 active:bg-brand-100 dark:ring-brand-400 dark:text-brand-400 dark:hover:bg-brand-900/20",
      secondary: "ring-1 ring-gray-400 text-gray-700 hover:bg-gray-50 active:bg-gray-100 dark:ring-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
      success: "ring-1 ring-green-600 text-green-700 hover:bg-green-50 active:bg-green-100 dark:ring-green-400 dark:text-green-400 dark:hover:bg-green-900/20",
      warning: "ring-1 ring-yellow-500 text-yellow-700 hover:bg-yellow-50 active:bg-yellow-100 dark:ring-yellow-400 dark:text-yellow-400 dark:hover:bg-yellow-900/20",
      danger: "ring-1 ring-red-600 text-red-700 hover:bg-red-50 active:bg-red-100 dark:ring-red-400 dark:text-red-400 dark:hover:bg-red-900/20",
      neutral: "ring-1 ring-gray-400 text-gray-700 hover:bg-gray-50 active:bg-gray-100 dark:ring-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
      info: "ring-1 ring-blue-600 text-blue-700 hover:bg-blue-50 active:bg-blue-100 dark:ring-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20",
    },
    ghost: {
      primary: "text-brand-700 hover:bg-brand-50 active:bg-brand-100 dark:text-brand-400 dark:hover:bg-brand-900/20",
      secondary: "text-gray-700 hover:bg-gray-50 active:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
      success: "text-green-700 hover:bg-green-50 active:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/20",
      warning: "text-yellow-700 hover:bg-yellow-50 active:bg-yellow-100 dark:text-yellow-400 dark:hover:bg-yellow-900/20",
      danger: "text-red-700 hover:bg-red-50 active:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/20",
      neutral: "text-gray-700 hover:bg-gray-50 active:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
      info: "text-blue-700 hover:bg-blue-50 active:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/20",
    },
    link: {
      primary: "text-brand-600 hover:text-brand-700 underline-offset-4 hover:underline dark:text-brand-400",
      secondary: "text-gray-600 hover:text-gray-700 underline-offset-4 hover:underline dark:text-gray-400",
      success: "text-green-600 hover:text-green-700 underline-offset-4 hover:underline dark:text-green-400",
      warning: "text-yellow-600 hover:text-yellow-700 underline-offset-4 hover:underline dark:text-yellow-400",
      danger: "text-red-600 hover:text-red-700 underline-offset-4 hover:underline dark:text-red-400",
      neutral: "text-gray-600 hover:text-gray-700 underline-offset-4 hover:underline dark:text-gray-400",
      info: "text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline dark:text-blue-400",
    },
  };

  // 基础样式
  const base = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  // 获取当前值（带默认值）
  const size = props.size || "md";
  const variant = props.variant || "solid";
  const intent = props.intent || "primary";
  
  // 组合样式类
  const cls = [
    base,
    sizes[size],
    variants[variant][intent],
  ];
  
  // 条件样式
  if (props.block) {
    cls.push("w-full");
  }
  
  if (props.loading) {
    cls.push("opacity-75 cursor-wait");
  }
  
  if (props.disabled) {
    cls.push("opacity-50 cursor-not-allowed pointer-events-none");
  }
  
  // 焦点环颜色
  const focusRingColors: Record<NonNullable<Props["intent"]>, string> = {
    primary: "focus:ring-brand-500",
    secondary: "focus:ring-gray-500",
    success: "focus:ring-green-500",
    warning: "focus:ring-yellow-500",
    danger: "focus:ring-red-500",
    neutral: "focus:ring-gray-500",
    info: "focus:ring-blue-500",
  };
  cls.push(focusRingColors[intent]);
  
  // 自定义类名
  if (props.class) {
    cls.push(props.class);
  }
  
  return cls.join(" ");
});

// 处理点击事件
const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault();
    return;
  }
  if (props.onClick) {
    props.onClick(event);
  }
};
</script>

<template>
  <component
    :is="to ? 'NuxtLink' : href ? 'a' : 'button'"
    :to="to"
    :href="href"
    :type="to || href ? undefined : type"
    :disabled="disabled || loading"
    :class="classes"
    @click="handleClick"
  >
    <!-- 加载状态 -->
    <template v-if="loading">
      <svg
        class="animate-spin -ml-1 mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </template>

    <!-- 左侧图标 -->
    <span
      v-if="icon && !loading"
      :class="icon"
      class="mr-2"
    />

    <!-- 按钮文本 -->
    <span v-if="label">{{ label }}</span>
    <slot />

    <!-- 右侧图标 -->
    <span
      v-if="iconRight && !loading"
      :class="iconRight"
      class="ml-2"
    />
  </component>
</template>
