<script setup lang="ts">
import { computed } from "vue";
import type { ButtonProps } from "~/types/Button";

const props = withDefaults(defineProps<ButtonProps>(), {
  size: "md",
  variant: "solid",
  intent: "primary",
  disabled: false,
  loading: false,
  fullWidth: false,
  type: "button",
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

// 计算样式类
const buttonClasses = computed(() => {
  const classes: string[] = [
    "inline-flex",
    "items-center",
    "justify-center",
    "font-medium",
    "rounded-lg",
    "transition-all",
    "duration-200",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
  ];

  // 尺寸样式
  const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
    xl: "px-6 py-3 text-lg",
  };
  classes.push(sizeClasses[props.size]);

  // 变体样式
  const variantClasses: Record<
    NonNullable<ButtonProps["variant"]>,
    Record<NonNullable<ButtonProps["intent"]>, string>
  > = {
    solid: {
      primary: "bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-500",
      secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
      success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
      warning: "bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      neutral: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    },
    outline: {
      primary:
        "border-2 border-brand-600 text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 focus:ring-brand-500",
      secondary:
        "border-2 border-gray-600 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900/20 focus:ring-gray-500",
      success:
        "border-2 border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 focus:ring-green-500",
      warning:
        "border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 focus:ring-yellow-500",
      danger:
        "border-2 border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 focus:ring-red-500",
      neutral:
        "border-2 border-gray-400 text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/20 focus:ring-gray-400",
    },
    ghost: {
      primary: "text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 focus:ring-brand-500",
      secondary: "text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900/20 focus:ring-gray-500",
      success: "text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 focus:ring-green-500",
      warning:
        "text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 focus:ring-yellow-500",
      danger: "text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 focus:ring-red-500",
      neutral: "text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/20 focus:ring-gray-400",
    },
    soft: {
      primary: "bg-brand-100 text-brand-700 hover:bg-brand-200 dark:bg-brand-900/30 dark:text-brand-300 focus:ring-brand-500",
      secondary:
        "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-900/30 dark:text-gray-300 focus:ring-gray-500",
      success:
        "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 focus:ring-green-500",
      warning:
        "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 focus:ring-yellow-500",
      danger:
        "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 focus:ring-red-500",
      neutral:
        "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-900/30 dark:text-gray-300 focus:ring-gray-400",
    },
    link: {
      primary: "text-brand-600 hover:text-brand-700 underline-offset-4 hover:underline focus:ring-brand-500",
      secondary: "text-gray-600 hover:text-gray-700 underline-offset-4 hover:underline focus:ring-gray-500",
      success: "text-green-600 hover:text-green-700 underline-offset-4 hover:underline focus:ring-green-500",
      warning: "text-yellow-600 hover:text-yellow-700 underline-offset-4 hover:underline focus:ring-yellow-500",
      danger: "text-red-600 hover:text-red-700 underline-offset-4 hover:underline focus:ring-red-500",
      neutral: "text-gray-700 hover:text-gray-800 underline-offset-4 hover:underline focus:ring-gray-400",
    },
  };
  classes.push(variantClasses[props.variant][props.intent]);

  // 全宽
  if (props.fullWidth) {
    classes.push("w-full");
  }

  // 加载状态
  if (props.loading) {
    classes.push("cursor-wait");
  }

  return classes.join(" ");
});

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault();
    return;
  }
  emit("click", event);
  props.onClick?.(event);
};

const isLink = computed(() => Boolean(props.to || props.href));
const Tag = computed(() => {
  if (props.to) return "NuxtLink";
  if (props.href) return "a";
  return "button";
});
</script>

<template>
  <component
    :is="Tag"
    :to="to"
    :href="href"
    :type="isLink ? undefined : type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="handleClick"
  >
    <!-- 加载图标 -->
    <svg
      v-if="loading"
      class="mr-2 h-4 w-4 animate-spin"
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

    <!-- 左侧图标 -->
    <span v-if="icon && !loading" class="mr-2">
      <i :class="icon" />
    </span>

    <!-- 按钮内容 -->
    <span>
      <slot />
    </span>

    <!-- 右侧图标 -->
    <span v-if="iconRight && !loading" class="ml-2">
      <i :class="iconRight" />
    </span>
  </component>
</template>
