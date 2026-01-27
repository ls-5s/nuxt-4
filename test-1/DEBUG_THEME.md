# 主题颜色切换调试指南

## 快速验证修复

### 1. 在浏览器控制台执行以下代码

```javascript
// 检查当前状态
const html = document.documentElement;
console.log('HTML classes:', html.className);
console.log('Data color scheme:', html.getAttribute('data-color-scheme'));

// 检查 CSS 变量
const root = getComputedStyle(html);
console.log('Brand 600:', root.getPropertyValue('--color-brand-600').trim());
console.log('Brand 500:', root.getPropertyValue('--color-brand-500').trim());

// 手动切换颜色方案测试
const store = useThemeStore();
console.log('Current scheme:', store.colorScheme);
store.setColorScheme('green');
console.log('Switched to green');
console.log('New Brand 600:', getComputedStyle(html).getPropertyValue('--color-brand-600').trim());
```

### 2. 检查按钮颜色

切换颜色方案后，观察：
- **蓝色方案**：按钮应该是蓝色 (`#2563eb`)
- **绿色方案**：按钮应该是绿色 (`#16a34a`)
- **紫色方案**：按钮应该是紫色 (`#9333ea`)
- **红色方案**：按钮应该是红色 (`#dc2626`)
- **橙色方案**：按钮应该是橙色 (`#ea580c`)

### 3. 检查 CSS 选择器

在开发者工具的 Elements 面板：
1. 选中 `<html>` 元素
2. 查看 Styles 面板
3. 搜索 `--color-brand-600`
4. 应该看到类似：
   ```css
   html[data-color-scheme="blue"] {
     --color-brand-600: #2563eb;
   }
   ```

### 4. 如果颜色仍然不变化

#### 检查 1：清除缓存
```bash
# 清除浏览器缓存，或使用无痕模式
# 清除 .nuxt 缓存
rm -rf .nuxt
pnpm dev
```

#### 检查 2：验证 CSS 文件加载
在 Network 面板检查 `theme.css` 是否正确加载

#### 检查 3：检查 Tailwind 配置
确保 `tailwind.config.ts` 中：
```typescript
colors: {
  brand: {
    600: "var(--color-brand-600)", // ✅ 使用 CSS 变量
  }
}
```

#### 检查 4：强制刷新
按 `Ctrl+Shift+R` (Windows) 或 `Cmd+Shift+R` (Mac) 强制刷新

### 5. 预期行为

切换颜色方案时：
1. ✅ `html` 元素的 `data-color-scheme` 属性应该更新
2. ✅ CSS 变量 `--color-brand-*` 应该更新
3. ✅ 使用 `bg-brand-600` 等 Tailwind 类的元素颜色应该变化
4. ✅ 控制台应该输出调试日志（开发模式）

### 6. 如果问题仍然存在

1. 检查浏览器控制台是否有错误
2. 检查 Vue DevTools 中的 Pinia store 状态
3. 查看 Network 面板，确保所有资源正确加载
4. 尝试在 `app.vue` 中添加 `watch` 监听主题变化
