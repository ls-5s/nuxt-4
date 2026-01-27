# 主题颜色切换问题排查指南

## 问题：主题切换时颜色没有改变

### 排查步骤

#### 1. 检查 HTML 元素属性

打开浏览器开发者工具（F12），检查 `<html>` 元素：

```javascript
// 在控制台执行
console.log('Dark class:', document.documentElement.classList.contains('dark'));
console.log('Color scheme:', document.documentElement.getAttribute('data-color-scheme'));
```

**应该看到：**
- 浅色模式：`dark` 类不存在，`data-color-scheme` 为当前颜色方案（如 "blue"）
- 深色模式：`dark` 类存在，`data-color-scheme` 为当前颜色方案

#### 2. 检查 CSS 变量值

```javascript
// 在控制台执行
const root = getComputedStyle(document.documentElement);
console.log('Brand 600:', root.getPropertyValue('--color-brand-600'));
```

**应该看到：**
- 蓝色方案：`#2563eb`（浅色）或 `#93c5fd`（深色）
- 绿色方案：`#16a34a`（浅色）或 `#4ade80`（深色）
- 等等...

#### 3. 检查 Tailwind 配置

确保 `tailwind.config.ts` 中：
- `darkMode: "class"` ✅
- `brand` 颜色使用 CSS 变量 ✅

#### 4. 检查 CSS 选择器优先级

在开发者工具的 Elements 面板中：
1. 选中 `<html>` 元素
2. 查看 Computed 样式
3. 检查 `--color-brand-600` 的值
4. 切换颜色方案，观察值是否变化

#### 5. 检查 Store 状态

```javascript
// 在 Vue DevTools 或控制台
const store = useThemeStore();
console.log('Mode:', store.mode);
console.log('Color Scheme:', store.colorScheme);
console.log('Is Dark:', store.isDark);
```

#### 6. 手动触发主题应用

```javascript
// 在控制台执行
const store = useThemeStore();
store.setColorScheme('green'); // 切换到绿色
store.applyTheme(); // 手动应用
```

### 常见问题及解决方案

#### 问题 1：CSS 变量没有更新

**原因：** CSS 选择器优先级不够

**解决：** 确保使用 `html[data-color-scheme="xxx"]` 选择器，优先级高于 `:root`

#### 问题 2：Tailwind 类没有响应变化

**原因：** Tailwind 使用了硬编码的颜色值而不是 CSS 变量

**解决：** 确保 `tailwind.config.ts` 中 brand 颜色使用 `var(--color-brand-xxx)`

#### 问题 3：属性没有正确设置

**原因：** `applyTheme()` 函数没有正确执行

**解决：** 检查插件是否正确初始化，确保在客户端执行

### 调试代码

在 `app.vue` 或组件中添加：

```vue
<script setup lang="ts">
import { useTheme } from "~/composables/useTheme";

const { mode, colorScheme, isDark } = useTheme();

// 调试：监听变化
watch([mode, colorScheme, isDark], ([newMode, newScheme, newIsDark]) => {
  console.log('Theme changed:', {
    mode: newMode,
    colorScheme: newScheme,
    isDark: newIsDark,
    htmlClasses: document.documentElement.className,
    htmlDataScheme: document.documentElement.getAttribute('data-color-scheme'),
  });
});
</script>
```

### 验证修复

1. 切换主题模式（light/dark）→ 背景色应该变化
2. 切换颜色方案（blue/green/purple/red/orange）→ 按钮颜色应该变化
3. 检查浏览器控制台是否有错误
4. 检查 Network 面板，确保 CSS 文件正确加载
