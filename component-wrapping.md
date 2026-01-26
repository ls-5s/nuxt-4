# Nuxt UI 组件封装指南

本文档详细说明如何在 Nuxt 4 项目中封装和扩展 Nuxt UI 组件，创建符合项目需求的定制化组件。

## 目录

- [前置要求](#前置要求)
- [组件封装的概念](#组件封装的概念)
- [第一步：创建类型定义](#第一步创建类型定义)
- [第二步：封装组件](#第二步封装组件)
- [第三步：配置组件自动导入](#第三步配置组件自动导入)
- [第四步：使用封装组件](#第四步使用封装组件)
- [封装模式](#封装模式)
- [最佳实践](#最佳实践)
- [常见问题](#常见问题)

---

## 前置要求

- Node.js 18+
- pnpm/npm/yarn 包管理器
- 已创建 Nuxt 4 项目
- 已安装并配置 `@nuxt/ui` 模块
- 了解 TypeScript 和 Vue 3 Composition API

---

## 组件封装的概念

### 什么是组件封装？

组件封装是指基于现有组件（如 Nuxt UI 的组件）创建新的组件，添加自定义逻辑、样式或功能，使其更符合项目需求。

### 为什么需要封装组件？

1. **统一设计规范**: 确保整个项目使用一致的样式和交互
2. **简化使用**: 封装常用配置，减少重复代码
3. **扩展功能**: 添加项目特定的功能或样式
4. **类型安全**: 使用 TypeScript 提供完整的类型支持
5. **易于维护**: 集中管理组件逻辑，便于后续修改

### 封装示例：UButton 组件

项目中的 `components/demo/UButton.vue` 就是一个封装示例，它：
- 基于 Nuxt UI 的 `UButton` 组件
- 添加了自定义的 `intent`、`variant`、`size` 属性
- 实现了动态样式类计算
- 保持了原有组件的所有功能

---

## 第一步：创建类型定义

### 1.1 创建类型文件

在 `app/types/` 目录下创建类型定义文件：

```typescript
// app/types/UButton.ts
export interface Props {
  intent?: "primary" | "neutral" | "danger";
  variant?: "solid" | "soft" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: string;
  label?: string;
  to?: string;
}
```

### 1.2 类型说明

- **intent**: 按钮的意图/语义（主要、中性、危险）
- **variant**: 按钮的视觉变体（实心、柔和、轮廓、幽灵）
- **size**: 按钮尺寸（小、中、大）
- **loading**: 加载状态
- **icon**: 图标名称
- **label**: 按钮文本
- **to**: 路由链接（用于导航按钮）

### 1.3 类型文件结构

```
app/
  types/
    UButton.ts      # 按钮组件类型
    UCard.ts        # 卡片组件类型（示例）
    UInput.ts       # 输入框组件类型（示例）
```

---

## 第二步：封装组件

### 2.1 创建封装组件

在 `app/components/demo/` 目录下创建封装组件：

```vue
<!-- app/components/demo/UButton.vue -->
<script setup lang="ts">
import { computed } from "vue";
import type { Props } from "../../types/UButton";

// 定义 props 和默认值
const props = withDefaults(defineProps<Props>(), {
  intent: "primary",
  variant: "solid",
  size: "md",
  loading: false,
  icon: undefined,
  label: undefined,
  to: undefined,
});

// 计算样式类
const classes = computed(() => {
  // 尺寸映射
  const sizes: Record<NonNullable<Props["size"]>, string> = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2",
    lg: "px-4 py-2 text-lg",
  };

  // 变体和意图的组合映射
  const variants: Record<
    NonNullable<Props["variant"]>,
    Record<NonNullable<Props["intent"]>, string>
  > = {
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

  // 基础样式
  const base = "border-0";
  
  // 获取当前值（带默认值）
  const size = props.size || "md";
  const variant = props.variant || "solid";
  const intent = props.intent || "primary";
  
  // 组合样式类
  const cls = [base, sizes[size], variants[variant][intent]];
  
  // 条件样式
  if (variant === "soft" && size === "lg") {
    cls.push("shadow-sm");
  }
  if (props.loading) {
    cls.push("opacity-75 cursor-not-allowed");
  }
  
  return cls.join(" ");
});
</script>

<template>
  <!-- 使用原始 UButton 组件，传递所有 props 和自定义样式 -->
  <UButton
    :icon="props.icon"
    :label="props.label"
    :to="props.to"
    :loading="props.loading"
    :class="classes"
  />
</template>
```

### 2.2 代码说明

#### 2.2.1 Props 定义

```typescript
const props = withDefaults(defineProps<Props>(), {
  intent: "primary",
  variant: "solid",
  size: "md",
  loading: false,
  icon: undefined,
  label: undefined,
  to: undefined,
});
```

- 使用 `defineProps<Props>()` 定义类型化的 props
- 使用 `withDefaults()` 设置默认值
- 所有 props 都是可选的（`?`）

#### 2.2.2 样式类计算

```typescript
const classes = computed(() => {
  // 定义尺寸映射
  const sizes: Record<NonNullable<Props["size"]>, string> = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2",
    lg: "px-4 py-2 text-lg",
  };
  
  // 定义变体和意图的组合映射
  const variants: Record<
    NonNullable<Props["variant"]>,
    Record<NonNullable<Props["intent"]>, string>
  > = {
    // ... 变体定义
  };
  
  // 组合样式类
  const cls = [base, sizes[size], variants[variant][intent]];
  
  // 添加条件样式
  if (variant === "soft" && size === "lg") {
    cls.push("shadow-sm");
  }
  
  return cls.join(" ");
});
```

**关键点：**
- 使用 `computed` 创建响应式计算属性
- 使用 `Record` 类型确保类型安全
- 使用 `NonNullable` 排除 `undefined`
- 支持条件样式（如加载状态、特定组合）

#### 2.2.3 模板渲染

```vue
<template>
  <UButton
    :icon="props.icon"
    :label="props.label"
    :to="props.to"
    :loading="props.loading"
    :class="classes"
  />
</template>
```

- 传递所有原始 props 给底层组件
- 通过 `:class` 绑定计算出的样式类
- 保持原有组件的所有功能

---

## 第三步：配置组件自动导入

### 3.1 配置 Nuxt 组件扫描

在 `nuxt.config.ts` 中配置组件自动导入：

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@nuxt/ui"],
  
  // 组件自动导入配置
  components: {
    dirs: [
      "~/components", // 默认 components 目录
      {
        path: "~/components",
        ignore: ["**/demo/**"], // 排除 demo 目录（如果需要）
      },
    ],
  },
})
```

### 3.2 组件命名规则

Nuxt 会根据文件路径自动生成组件名：

```
components/
  demo/
    UButton.vue    => <DemoUButton />
  base/
    Button.vue     => <BaseButton />
  Button.vue      => <Button />
```

### 3.3 排除特定目录

如果不想自动导入某些组件（如示例组件），可以配置 `ignore`：

```typescript
components: {
  dirs: [
    {
      path: "~/components",
      ignore: ["**/demo/**"], // 排除 demo 目录
    },
  ],
}
```

---

## 第四步：使用封装组件

### 4.1 基本使用

封装后的组件可以像普通组件一样使用：

```vue
<template>
  <div>
    <!-- 使用封装的按钮组件 -->
    <DemoUButton
      label="主要按钮"
      intent="primary"
      variant="solid"
      size="md"
    />
    
    <!-- 使用默认值 -->
    <DemoUButton label="默认按钮" />
    
    <!-- 带图标和加载状态 -->
    <DemoUButton
      icon="i-heroicons-plus"
      label="新增"
      :loading="isLoading"
      intent="primary"
    />
  </div>
</template>
```

### 4.2 传递所有 Props

封装组件支持传递所有原始组件的 props：

```vue
<template>
  <DemoUButton
    label="导航按钮"
    to="/about"
    intent="primary"
    variant="outline"
  />
</template>
```

### 4.3 覆盖样式

可以通过 `class` 属性覆盖或扩展样式：

```vue
<template>
  <DemoUButton
    label="自定义样式"
    intent="primary"
    class="rounded-full px-8"
  />
</template>
```

---

## 封装模式

### 模式 1：样式封装（当前示例）

**适用场景**: 需要统一组件样式，添加自定义样式类

```vue
<script setup lang="ts">
const props = defineProps<Props>()
const classes = computed(() => {
  // 计算自定义样式
  return "custom-class"
})
</script>

<template>
  <UButton :class="classes" v-bind="props" />
</template>
```

### 模式 2：功能扩展

**适用场景**: 需要添加新功能或修改行为

```vue
<script setup lang="ts">
const props = defineProps<Props>()

// 添加自定义功能
const handleClick = (event: Event) => {
  // 自定义逻辑
  console.log('Button clicked')
  // 可以阻止默认行为或添加额外逻辑
}

// 添加自定义数据
const customData = ref('custom value')
</script>

<template>
  <UButton
    v-bind="props"
    @click="handleClick"
  >
    <template #default>
      {{ customData }}
      <slot />
    </template>
  </UButton>
</template>
```

### 模式 3：组合封装

**适用场景**: 组合多个组件创建复合组件

```vue
<script setup lang="ts">
const props = defineProps<{
  title: string
  description?: string
  buttonLabel?: string
}>()
</script>

<template>
  <UCard>
    <template #header>
      <h3>{{ title }}</h3>
    </template>
    
    <p v-if="description">{{ description }}</p>
    <slot />
    
    <template #footer v-if="buttonLabel">
      <DemoUButton :label="buttonLabel" />
    </template>
  </UCard>
</template>
```

### 模式 4：条件渲染封装

**适用场景**: 根据条件渲染不同的组件或样式

```vue
<script setup lang="ts">
const props = defineProps<{
  type: 'primary' | 'secondary'
}>()

const componentClass = computed(() => {
  return props.type === 'primary' 
    ? 'bg-brand-600' 
    : 'bg-gray-600'
})
</script>

<template>
  <UButton
    :class="componentClass"
    v-bind="$attrs"
  >
    <slot />
  </UButton>
</template>
```

---

## 最佳实践

### 1. 类型定义

✅ **推荐**: 在 `types/` 目录中定义类型

```typescript
// app/types/UButton.ts
export interface Props {
  intent?: "primary" | "neutral" | "danger";
  // ...
}
```

❌ **不推荐**: 在组件内直接定义类型

```typescript
// 不推荐：类型定义在组件内
<script setup lang="ts">
interface Props {
  // ...
}
</script>
```

### 2. Props 传递

✅ **推荐**: 使用 `v-bind` 传递所有 props

```vue
<template>
  <UButton v-bind="props" />
</template>
```

❌ **不推荐**: 手动传递每个 prop

```vue
<template>
  <UButton
    :icon="props.icon"
    :label="props.label"
    :to="props.to"
    <!-- 容易遗漏 -->
  />
</template>
```

### 3. 样式计算

✅ **推荐**: 使用 `computed` 计算样式

```typescript
const classes = computed(() => {
  // 响应式计算
  return "dynamic-class"
})
```

❌ **不推荐**: 在模板中直接计算

```vue
<template>
  <UButton :class="variant === 'primary' ? 'bg-blue' : 'bg-gray'" />
</template>
```

### 4. 默认值

✅ **推荐**: 使用 `withDefaults` 设置默认值

```typescript
const props = withDefaults(defineProps<Props>(), {
  intent: "primary",
  variant: "solid",
})
```

❌ **不推荐**: 在计算属性中处理默认值

```typescript
const classes = computed(() => {
  const intent = props.intent || "primary" // 不推荐
})
```

### 5. 组件命名

✅ **推荐**: 使用描述性的组件名

```
components/
  buttons/
    PrimaryButton.vue
    DangerButton.vue
```

❌ **不推荐**: 使用模糊的命名

```
components/
  btn1.vue
  btn2.vue
```

### 6. 目录结构

✅ **推荐**: 按功能或类型组织组件

```
components/
  buttons/
    UButton.vue
  cards/
    UCard.vue
  forms/
    UInput.vue
```

❌ **不推荐**: 所有组件放在一个目录

```
components/
  UButton.vue
  UCard.vue
  UInput.vue
  ...
```

---

## 常见问题

### Q1: 如何传递所有 props 给底层组件？

**A**: 使用 `v-bind` 传递所有 props：

```vue
<template>
  <UButton v-bind="$props" />
</template>
```

或者：

```vue
<template>
  <UButton v-bind="props" />
</template>
```

### Q2: 如何同时传递 props 和自定义属性？

**A**: 使用 `v-bind` 和单独属性：

```vue
<template>
  <UButton
    v-bind="props"
    :class="customClasses"
    @click="handleClick"
  />
</template>
```

### Q3: 如何访问原始组件的插槽？

**A**: 使用 `<slot />` 传递插槽内容：

```vue
<template>
  <UButton v-bind="props">
    <slot />
    <slot name="icon" />
  </UButton>
</template>
```

### Q4: 如何添加新的事件处理？

**A**: 在封装组件中定义事件处理函数：

```vue
<script setup lang="ts">
const emit = defineEmits<{
  custom: [value: string]
}>()

const handleClick = (event: Event) => {
  // 自定义逻辑
  emit('custom', 'value')
  // 可以继续传递原始事件
}
</script>

<template>
  <UButton @click="handleClick" />
</template>
```

### Q5: 如何覆盖底层组件的样式？

**A**: 通过 `:class` 绑定，样式会合并：

```vue
<template>
  <UButton
    :class="[computedClasses, 'custom-override']"
    v-bind="props"
  />
</template>
```

### Q6: 封装组件后如何保持类型提示？

**A**: 确保：
1. 使用 TypeScript 定义 Props 接口
2. 在 `types/` 目录中导出类型
3. 使用 `defineProps<Props>()` 定义 props

### Q7: 如何测试封装组件？

**A**: 可以创建测试页面：

```vue
<!-- app/pages/test-button.vue -->
<template>
  <div class="p-8 space-y-4">
    <h1>按钮测试</h1>
    
    <DemoUButton
      label="测试按钮"
      intent="primary"
      variant="solid"
    />
  </div>
</template>
```

### Q8: 封装组件会影响性能吗？

**A**: 封装组件只是添加了一层包装，性能影响极小。`computed` 属性会缓存计算结果，只有在依赖变化时才会重新计算。

---

## 完整示例

### 示例 1：封装 UButton 组件

```vue
<!-- app/components/demo/UButton.vue -->
<script setup lang="ts">
import { computed } from "vue";
import type { Props } from "../../types/UButton";

const props = withDefaults(defineProps<Props>(), {
  intent: "primary",
  variant: "solid",
  size: "md",
  loading: false,
});

const classes = computed(() => {
  const sizes: Record<NonNullable<Props["size"]>, string> = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2",
    lg: "px-4 py-2 text-lg",
  };

  const variants: Record<
    NonNullable<Props["variant"]>,
    Record<NonNullable<Props["intent"]>, string>
  > = {
    solid: {
      primary: "bg-brand-600 hover:bg-brand-700 text-white",
      neutral: "bg-gray-100 hover:bg-gray-200 text-gray-800",
      danger: "bg-red-600 hover:bg-red-700 text-white",
    },
    // ... 其他变体
  };

  const size = props.size || "md";
  const variant = props.variant || "solid";
  const intent = props.intent || "primary";
  
  const cls = [
    "border-0",
    sizes[size],
    variants[variant][intent],
  ];
  
  if (variant === "soft" && size === "lg") {
    cls.push("shadow-sm");
  }
  if (props.loading) {
    cls.push("opacity-75 cursor-not-allowed");
  }
  
  return cls.join(" ");
});
</script>

<template>
  <UButton
    :icon="props.icon"
    :label="props.label"
    :to="props.to"
    :loading="props.loading"
    :class="classes"
  />
</template>
```

### 示例 2：使用封装组件

```vue
<!-- app/pages/index.vue -->
<template>
  <div class="p-8 space-y-4">
    <h1>按钮示例</h1>
    
    <div class="flex gap-4">
      <DemoUButton
        label="主要按钮"
        intent="primary"
        variant="solid"
      />
      
      <DemoUButton
        label="危险按钮"
        intent="danger"
        variant="outline"
      />
      
      <DemoUButton
        icon="i-heroicons-plus"
        label="新增"
        intent="primary"
        :loading="isLoading"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const isLoading = ref(false)
</script>
```

---

## 总结

通过组件封装，你可以：

1. ✅ 统一项目中的组件样式和行为
2. ✅ 简化组件使用，减少重复代码
3. ✅ 扩展组件功能，添加项目特定逻辑
4. ✅ 保持类型安全，提供完整的 TypeScript 支持
5. ✅ 集中管理组件逻辑，便于维护和更新

组件封装是构建可维护、可扩展的 Nuxt 应用的重要实践。

---

## 参考资源

- [Vue 3 组件文档](https://vuejs.org/guide/components/props.html)
- [Nuxt 组件自动导入](https://nuxt.com/docs/guide/directory-structure/components)
- [TypeScript 类型定义](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [Nuxt UI 官方文档](https://ui.nuxt.com/)

---

**最后更新**: 2025-01-XX
**适用版本**: Nuxt 4.x, Vue 3.x, TypeScript 5.x

