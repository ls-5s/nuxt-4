import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      // 主题颜色：将 CSS 变量映射为 Tailwind 的品牌色阶，统一站点配色
      colors: {
        brand: {
          DEFAULT: "var(--color-brand-500)",
          50: "var(--color-brand-50)",
          100: "var(--color-brand-100)",
          200: "var(--color-brand-200)",
          300: "var(--color-brand-300)",
          400: "var(--color-brand-400)",
          500: "var(--color-brand-500)",
          600: "var(--color-brand-600)",
          700: "var(--color-brand-700)",
          800: "var(--color-brand-800)",
          900: "var(--color-brand-900)",
          950: "var(--color-brand-950)",
        },
      },
      // 间距与尺寸：重定义 7（影响 w-7/h-7），并增加图标尺寸别名
      spacing: {
        // 重定义 w-7/h-7 的尺寸（默认 1.75rem），改为 2rem
        7: "2rem",
        // 自定义别名，便于封装图标等尺寸
        "icon-sm": "1rem",
        "icon-md": "1.5rem",
        "icon-lg": "2rem",
      },
      // 响应式断点：新增 xs 到 2xl，用于控制不同屏幕宽度下的样式
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
} satisfies Config;
