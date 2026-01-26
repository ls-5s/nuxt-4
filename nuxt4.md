# Nuxt 4安装目录

## pages

### 路由

在 Nuxt 4 中，路由是基于文件系统自动生成的。每个位于 `pages` 目录中的 Vue 组件都会自动成为一个路由。
创建 `pages/index.vue` 文件，并添加以下内容：

```vue
<template>
  <h1>欢迎来到 Nuxt 4!</h1>
  <p>这是默认页面。</p>
</template>
```

运行 `npm run dev` 命令启动开发服务器，然后访问 `http://localhost:3000`。
你将看到 "欢迎来到 Nuxt 4!" 的消息。
创建 `pages/about.vue` 文件，并添加以下内容：

```vue
<template>
  <h1>关于 Nuxt 4</h1>
  <p>这是关于 Nuxt 4 的页面。</p>
</template>
```

访问 `http://localhost:3000/about`，你将看到 "关于 Nuxt 4" 的消息。

#### 页面传参方式

1.字符串格式（直接拼接 URL）

```vue
<template>
  <!-- 固定参数：跳转到 /users-admin/123 -->
  <NuxtLink to="/users-admin/123">查看用户123（admin分组）</NuxtLink>

  <!-- 动态参数：用变量拼接 -->
  <NuxtLink :to="`/users-${group}/${id}`">查看动态用户</NuxtLink>
</template>

<script setup>
// 定义动态变量
const group = "editor";
const id = "456";
</script>
```

2.对象格式（用对象传递参数）

```vue
<template>
  <NuxtLink
    :to="{
      path: '/users-admin/123', // 直接写完整路径
    }"
    >查看用户123</NuxtLink
  >

  <!-- 动态参数（更灵活） -->
  <NuxtLink
    :to="{
      params: { group: 'admin', id: '123' }, // 明确传参数名和值
      path: '/users-[group]/[id]', // 对应 pages 下的路由路径
    }"
    >查看用户123</NuxtLink
  >
</template>

<script setup>
// 定义动态变量
const group = "editor";
const id = "456";
</script>
```

3. 编程式导航传参（按钮点击 / 逻辑触发）

```vue
<template>
  <button @click="goToUser">跳转到用户页面</button>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goToUser() {
  router.push({
    name: "user",
    params: { group: "admin", id: "123" },
  });
}
</script>
```

如果是在脚本使用// 引入路由钩子，获取当前路由信息
const route = useRoute()

4. 编程式导航

```vue
<script setup lang="ts">
const name = ref("");
const type = ref(1);

function navigate() {
  return navigateTo({
    path: "/search",
    query: {
      name: name.value,
      type: type.value,
    },
  });
}
</script>
```

#### 动态路由

动态路由允许在路由中添加参数。例如，创建 `pages/posts/[id].vue` 文件，并添加以下内容：
<template>

<h1>文章 {{ $route.params.id }}</h1>
<p>这是文章 {{ $route.params.id }} 的内容。</p>
</template>
访问 `http://localhost:3000/posts/1`，你将看到 "文章 1" 的消息。-

- 如果是根目录，路由路径为 `/`。
  app.vue

```vue
<template>
  <NuxtPage />
</template>
```

#### 捕获所有路由

捕获所有路由允许匹配任何未定义的路由路径。例如，创建 `pages/[...slug].vue` 文件，并添加以下内容：

```vue
<template>
  <h1>捕获所有路由</h1>
  <p>你访问的路由路径为：{{ $route.params.slug.join("/") }}</p>
</template>
```

访问 `http://localhost:3000/any/undefined/path`，你将看到 "捕获所有路由" 的消息，并且路径参数为 "any/undefined/path"。

#### 嵌套路由

```vue
-| pages/ ---| parent/ -----| child.vue ---| parent.vue
```

```vue
[ { path: '/parent', component: '~/pages/parent.vue', name: 'parent', children:
[ { path: 'child', component: '~/pages/parent/child.vue', name: 'parent-child',
}, ], }, ]
```

要显示 child.vue 组件，您必须将 <NuxtPage> 组件插入到 app/pages/parent.vue 中

```vue
<template>
  <div>
    <h1>父组件</h1>
    <NuxtPage />
  </div>
</template>
```

#### 子路由键

如果您想更好地控制 <NuxtPage> 组件的重新渲染时机（例如，为了实现过渡），您可以通过 pageKey prop 传递字符串或函数，或者您可以通过 definePageMeta 定义一个 key 值

```vue
<template>
  <div>
    <h1>I am the parent view</h1>
    <NuxtPage :page-key="(route) => route.fullPath" />
  </div>
</template>
```

#### 路由组

在某些情况下，您可能希望以不影响基于文件路由的方式将一组路由分组。为此，您可以将文件放在一个用括号括起来的文件夹中——( 和 )。

```vue
-| pages/ ---| index.vue ---| (marketing)/ -----| about.vue -----| contact.vue
```

这将在你的应用中生成 /、/about 和 /contact 页面。 marketing 组在 URL 结构中会被忽略。
有括号的 (marketing)/ 文件夹 → URL 完全忽略 marketing，和直接放在 pages 根目录的效果一样。

#### 页面元数据

就是定义页面数据，例如标题、描述、关键词等。
在所有的地方都可以访问

```vue
<script setup lang="ts">
definePageMeta({
  title: "My home page",
});
</script>
```

然后，可以在整个应用程序的 route.meta 对象中访问此数据

```ts
<script setup lang="ts">
const route = useRoute()

console.log(route.meta.title) // My home page
</script>
```

##### 特殊元数据(后面遇到具体再看)

- alias: 指定页面的别名。默认值为空数组。
- keepAlive: 指定页面是否需要缓存。默认值为 true。
- key: 指定页面的唯一键。默认值为页面组件的文件名（驼峰式转换）。
- layout: 指定页面使用的布局。默认值为 default。
- middleware: 运行在页面加载之前。默认值为空数组。
- name: 指定页面的名称。默认值为页面组件的文件名（驼峰式转换）。
- path: 指定页面的路径。默认值为页面组件的文件名（驼峰式转换）。
- props: 允许页面组件接收 props。默认值为 true。

##### 自定义元数据

自定义元数据允许您定义自己的数据，并访问它们。

```vue
你的项目/ ├── types/ # 自定义类型文件夹 │ └── index.d.ts #
类型扩展文件（放在这里） ├── nuxt.config.ts ├── package.json └── tsconfig.json
```

```ts
declare mudule '#app' {
    interface PageMeta {
        title?: string
        description?: string
        keywords?: string
    }
}

```

使用它

```vue
<script setup lang="ts">
definePageMeta({
  title: "个人中心",
  pageType: "user",
  requiresAuth: true, // ✅ 布尔类型，有类型提示
  pageDesc: "用户的个人资料和订单管理页面",
});
</script>
```

## composables

而 Nuxt 4 的 composables/ 目录，就是给这些函数提供了一个 “自动导入” 的约定 —— 放在这个目录里的函数，不用手动 import，直接就能用。
写函数的
使用方法

1.  创建 composables/useCounter.ts 文件，并添加以下内容：
    // 封装用户登录状态的复用逻辑

```ts
export const useUser = () = > {
    const user = ref(null)
    const login = (userData) => {
        user.value = userData
    }
    const logout = () => {
        user.value = null
    }
    return {
        user,
        login,
        logout
    }
}
```

怎么去使用它呢？

```vue
<!-- pages/index.vue -->
<script setup>
// 自动导入，直接使用
const { user, login, logout } = useUser();

// 测试登录
const handleLogin = () => {
  login({ name: "张三", id: 123 });
};
</script>

<template>
  <div>
    <h1>用户状态：{{ user ? "已登录" : "未登录" }}</h1>
    <button @click="handleLogin">登录</button>
    <button @click="logout">退出</button>
  </div>
</template>
```

### 示例

#### 嵌套可组合项

您可以使用自动导入在一个可组合项中再使用另一个可组合项

```vue
你的项目/ ├── app/ │ └── composables/ # 可组合项目录（Nuxt 4 推荐放在 app
下，根目录的 composables 也兼容） │ ├── bar.ts # 被嵌套的可组合项（useBar） │
└── test.ts # 主可组合项（useFoo，嵌套使用 useBar） └── pages/ └── index.vue #
页面中使用 useFoo
```

步骤 2：创建被嵌套的可组合项 bar.ts

```ts
// app/composables/bar.ts
// 封装一个基础逻辑（比如处理数字累加），供其他可组合项复用
export const useBar = () => {
  // 定义响应式数据
  const count = ref(0);
  // 定义方法
  const increment = () => {
    count.value++;
  };

  // 返回需要暴露的变量/方法
  return { count, increment };
};
```

步骤 3：创建主可组合项 test.ts
// app/composables/test.ts

```ts
export const useFoo = () => {
  // 1. useNuxtApp()：Nuxt 内置的可组合项，获取 Nuxt 应用实例（自动导入）
  const nuxtApp = useNuxtApp();
  // 2. useBar()：自定义的可组合项，无需 import，直接使用（自动导入）
  const { count, increment } = useBar();

  // 基于 useBar 的逻辑扩展新功能
  const doubleIncrement = () => {
    increment(); // 复用 useBar 的 increment 方法
    increment(); // 调用两次，实现“加2”
    // 用 nuxtApp 打印日志（示例）
    nuxtApp.hook("app:mounted", () => {
      console.log("count 已更新为：", count.value);
    });
  };

  // 暴露扩展后的逻辑
  return { count, doubleIncrement };
};
```

步骤 4：在页面中使用 useFoo

```vue
<!-- pages/index.vue -->
<script setup lang="ts">
// 无需 import，直接使用 useFoo（自动导入）
const { count, doubleIncrement } = useFoo();
</script>

<template>
  <div>
    <h1>嵌套可组合项示例</h1>
    <p>当前计数：{{ count }}</p>
    <button @click="doubleIncrement">点击加2</button>
  </div>
</template>
```

#### 访问插件注入(后面遇见在学习)

#### 文件如何被扫描

默认情况下，Nuxt 4 会自动扫描 composables/ 目录下的所有 .ts 文件，并自动导入。

```vue
-| composables/ ---| index.ts // scanned ---| useFoo.ts // scanned ---| nested/
-----| utils.ts // not scanned
```

只有 app/composables/index.ts 和 app/composables/useFoo.ts 会被搜索导入。

为了使嵌套模块的自动导入工作，您可以重新导出它们（推荐）或配置扫描器以包含嵌套目录配置同一导出的文件。

```vue
你的项目/ ├── app/ │ └── composables/ │ ├── index.ts # 重新导出的统一入口 │ └──
nested/ # 嵌套目录 │ └── utils.ts # 嵌套的可组合项文件 └── pages/ └── index.vue
# 页面中使用
```

步骤 2：编写嵌套的可组合项 nested/utils.ts

```ts
// app/composables/nested/utils.ts
// 封装一些工具类可组合项（内部逻辑）
export const useFormatDate = () => {
  // 格式化日期的逻辑
  const format = (date: Date) => {
    return date.toLocaleDateString("zh-CN");
  };
  return { format };
};

export const useCalculate = () => {
  // 简单的计算逻辑
  const add = (a: number, b: number) => a + b;
  return { add };
};

// 内部辅助函数（不想对外暴露）
const internalHelper = () => {
  return "内部逻辑，不对外暴露";
};
```

步骤 3：在 index.ts 中重新导出（核心步骤）

```ts
// app/composables/index.ts
// 只导出需要对外暴露的可组合项，内部函数（如 internalHelper）不会被暴露
export { useFormatDate, useCalculate } from "./nested/utils.ts";

// 若有多个嵌套目录，可统一在这里导出
// export { useUser } from './user/useUser.ts'
// export { useCart } from './cart/useCart.ts'
```

步骤 4：在页面中直接使用（自动导入生效）
无需手动导入，直接调用重新导出的函数：

```vue
<!-- pages/index.vue -->
<script setup lang="ts">
// 自动导入 useFormatDate、useCalculate（来自嵌套目录，但像根目录函数一样使用）
const { format } = useFormatDate();
const { add } = useCalculate();

console.log(format(new Date())); // 输出：2026/1/12（当前日期）
console.log(add(1, 2)); // 输出：3
</script>
```

## components

components/ 目录用于存放你所有的 Vue 组件。
Nuxt 会自动导入此目录中的任何组件（以及你可能正在使用的任何模块注册的组件）
目录结构

```vue
-| components/ ---| AppHeader.vue ---| AppFooter.vue
```

组件文件名应该与组件名称匹配，例如 AppHeader.vue 组件应该被定义为 <AppHeader />。

```vue
<template>
  <div>
    <AppHeader />
    <NuxtPage />
    <AppFooter />
  </div>
</template>
```

### 组件名称

如果你在嵌套目录中有一个组件，例如

```vue
-| components/ ---| base/ -----| foo/ -------| Button.vue
```

则组件名称将是 BaseFooButton。

### 动态组件

方式 1：从 #components 虚拟路径导入（最推荐）
##components 是 Nuxt 提供的虚拟导入路径，会自动映射到 components/ 目录下的所有组件，导入后可直接传给 :is 属性，支持响应式切换，且类型安全（TS 友好）

```vue
components/ ├── PrimaryButton.vue // 主按钮组件（内容：
<button class="primary">{{ label }}</button>
） └── SecondaryButton.vue // 次要按钮组件（内容：
<button class="secondary">{{ label }}</button>
）
```

在 pages/index.vue 中实现 “切换动态按钮”：

```vue
<template>
  <!-- 切换按钮类型的触发器 -->
  <button @click="toggleButtonType">切换按钮样式</button>

  <!-- 动态组件核心：根据计算属性渲染不同按钮 -->
  <component :is="currentButtonComponent" label="我是动态按钮" />
</template>

<script setup lang="ts">
// 从 #components 虚拟路径导入组件（Nuxt 自动映射，无需关心实际路径）
import { PrimaryButton, SecondaryButton } from "#components";
import { ref, computed } from "vue";

// 响应式变量：控制当前按钮类型
const isPrimary = ref(true);

// 计算属性：返回当前要渲染的组件对象
const currentButtonComponent = computed(() => {
  return isPrimary.value ? PrimaryButton : SecondaryButton;
});

// 切换按钮类型的方法
const toggleButtonType = () => {
  isPrimary.value = !isPrimary.value;
};
</script>

<style scoped>
.primary {
  background: blue;
  color: white;
}
.secondary {
  background: gray;
  color: white;
}
</style>
```

### 动态导入

要动态导入组件（也称为组件的惰性加载），你只需在组件名称前添加 Lazy 前缀。如果组件并非总是需要，这尤其有用。

通过使用 Lazy 前缀，你可以将组件代码的加载推迟到恰当的时机，这有助于优化你的 JavaScript 包大小。

```vue
要动态导入组件（也称为组件的惰性加载），你只需在组件名称前添加 Lazy
前缀。如果组件并非总是需要，这尤其有用。 通过使用 Lazy
前缀，你可以将组件代码的加载推迟到恰当的时机，这有助于优化你的 JavaScript
包大小。 app/pages/index.vue

<script setup lang="ts">
const show = ref(false);
</script>

<template>
  <div>
    <h1>Mountains</h1>
    <LazyMountainsList v-if="show" />
    <button v-if="!show" @click="show = true">Show List</button>
  </div>
</template>
```

### Hydration 策略

### 直接导入

如果你想或需要绕过 Nuxt 的自动导入功能，你还可以从 #components 显式导入组件。

```vue
<script setup lang="ts">
import { LazyMountainsList, NuxtLink } from "#components";

const show = ref(false);
</script>

<template>
  <div>
    <h1>Mountains</h1>
    <LazyMountainsList v-if="show" />
    <button v-if="!show" @click="show = true">Show List</button>
    <NuxtLink to="/">Home</NuxtLink>
  </div>
</template>
```

### 自定义目录

默认情况下，只扫描 ~/components 目录。如果你想添加其他目录，或者更改此目录子文件夹中组件的扫描方式，你可以向配置中添加其他目录
在 nuxt.config.ts 中添加如下代码：

```ts
export default defineNuxtConfig({
  components: [
    // ~/calendar-module/components/event/Update.vue => <EventUpdate />
    { path: "~/calendar-module/components" },

    // ~/user-module/components/account/UserDeleteDialog.vue => <UserDeleteDialog />
    { path: "~/user-module/components", pathPrefix: false },

    // ~/components/special-components/Btn.vue => <SpecialBtn />
    { path: "~/components/special-components", prefix: "Special" },

    // It's important that this comes last if you have overrides you wish to apply
    // to sub-directories of `~/components`.
    //
    // ~/components/Btn.vue => <Btn />
    // ~/components/base/Btn.vue => <BaseBtn />
    "~/components",
  ],
});
```

### npm 包

如果你想从 npm 包中自动导入组件，你可以在本地模块中使用 addComponent 来注册它们。

```ts
~/modules/eegirrst - component.ts;

app / app.vue;

import { addComponent, defineNuxtModule } from "@nuxt/kit";

export default defineNuxtModule({
  setup() {
    // import { MyComponent as MyAutoImportedComponent } from 'my-npm-package'
    addComponent({
      name: "MyAutoImportedComponent",
      export: "MyComponent",
      filePath: "my-npm-package",
    });
  },
});
```

### 组件扩展

默认情况下，任何具有 nuxt.config.ts 的 extensions 键中指定扩展名的文件都被视为组件。如果你需要限制应注册为组件的文件扩展名，你可以使用组件目录声明的扩展形式及其 extensions 键

```nuxt.config.ts

export default defineNuxtConfig({
  components: [
    {
      path: '~/components',
      extensions: ['.vue'],
    },
  ],
})
```

## 导航

### NuxtLink(后面详细看)

\*\*要在应用程序页面之间导航，您应该使用 <NuxtLink> 组件。

此组件包含在 Nuxt 中，因此您无需像其他组件一样导入它。

一个指向 app/pages 文件夹中 index.vue 页面的简单链接

```vue
<template>
  <NuxtLink to="/">Home page</NuxtLink>
</template>
**
```

#### 将参数传递给动态路由

在此示例中，我们将 `id` 参数传递到路由 `~/pages/posts/[id].vue` 进行链接。

app/pages/index.vue

(渲染为) index.html

```vue
<template>
  <NuxtLink :to="{ name: 'posts-id', params: { id: 123 } }">
    Post 123
  </NuxtLink>
</template>
```

使用它

```vue
<template>
  <div class="page-container">
    222222222222222
    <!-- 增加可选链和默认值，避免显示 undefined -->
    <div>{{ route.params.id ?? "暂无ID" }}</div>
  </div>
</template>

<!-- 修复 script 标签语法错误，补充 lang="ts" 规范写法 -->
<script setup lang="ts">
// 显式导入 useRoute（Nuxt4 自动导入，但显式导入更规范）
import { useRoute } from "vue-router";

// 扩展路由参数类型，为 id 添加 TS 类型定义
interface RouteParams {
  id?: string | number;
}

// 获取路由实例，并指定参数类型
const route = useRoute<{ params: RouteParams }>();
</script>
```

div>

#### 链接到跨应用 URL

当指向同一域上的不同应用程序时，使用 `external` 属性可确保正确行为。
app/pages/index.vue

```vue
<template>
  <NuxtLink to="/another-app" external> Go to Another App </NuxtLink>
</template>
```

## layouts

Nuxt 提供了一个布局框架，用于将常见的 UI 模式提取到可重用的布局中。

### 启用布局

通过将 <NuxtLayout> 添加到你的 app.vue 来启用布局。

```vue
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
NuxtLayout 组件是一个 Nuxt 特有的组件，用于在页面之间共享布局。
```

使用布局

- 使用 definePageMeta 在你的页面中设置 layout 属性。
- 设置 <NuxtLayout> 的 name 属性。
- 布局名称会规范化为 kebab-case，因此 someLayout 会变成 some-layout。
- 如果未指定布局，将使用 app/layouts/default.vue。
- 如果你的应用程序中只有一个布局，我们建议改用 app.vue。
- 与其他组件不同，你的布局必须有一个单一的根元素，以允许 Nuxt 在布局更改之间- 应用过渡——并且此根元素不能是 <slot />。

### 默认布局

~layouts/default.vue

```vue
<template>
  <div>
    <p>Some default layout content shared across all pages</p>
    <slot />
  </div>
  <template></template>
</template>
```

在布局文件中，页面的内容将显示在 <slot /> 组件中。

### 命名布局

目录结构

-| layouts/
---| default.vue
---| custom.vue

然后你可以在你的页面中使用 custom 布局

pages/about.vue

```vue
<script setup lang="ts">
definePageMeta({
  layout: "custom",
});
</script>
```

definePageMeta({
layout: false
})
// 关闭布局
===============
如果你的布局位于嵌套目录中，布局的名称将基于其自身的路径目录和文件名，并移除重复的片段。

文件 布局名称
~/layouts/desktop/default.vue desktop-default
~/layouts/desktop-base/base.vue desktop-base
~/layouts/desktop/index.vue desktop
为清晰起见，我们建议布局的文件名与其名称匹配

文件 布局名称
~/layouts/desktop/DesktopDefault.vue desktop-default
~/layouts/desktop-base/DesktopBase.vue desktop-base
~/layouts/desktop/Desktop.vue

================

### 动态更改布局

你还可以使用 setPageLayout 辅助函数动态更改布局。

```vue
<script setup lang="ts">
function enableCustomLayout() {
  setPageLayout("custom");
}
definePageMeta({
  layout: false,
});
</script>

<template>
  <div>
    <button @click="enableCustomLayout">Update layout</button>
  </div>
</template>
```

### 逐页覆盖布局

如果你正在使用页面，你可以通过设置 layout: false 然后在页面内使用 <NuxtLayout> 组件来

```vue
<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <div>
    <NuxtLayout name="custom">
      <template #header> Some header template content. </template>

      The rest of the page
    </NuxtLayout>
  </div>
</template>
```

```vue
<!-- layouts/custom.vue -->
<template>
  <div class="custom-layout">
    <!-- 页眉：固定内容，不再用插槽 -->
    <header class="layout-header">布局固定页眉（不再接收页面传值）</header>

    <!-- 主体：左侧侧边栏 + 右侧内容 -->
    <div class="layout-body">
      <!-- ✅ header插槽放到侧边栏 -->
      <aside class="layout-sidebar">
        <slot name="header"> 默认侧边栏内容（页面没传header时显示） </slot>
      </aside>

      <!-- 默认插槽：页面核心内容 -->
      <main class="layout-main">
        <slot />
      </main>
    </div>

    <footer class="layout-footer">custom布局的固定页脚</footer>
  </div>
</template>

<style scoped>
.custom-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-header {
  padding: 20px;
  background: #9f7aea;
  color: white;
}

.layout-body {
  flex: 1;
  display: flex;
}

.layout-sidebar {
  width: 200px;
  padding: 20px;
  background: #f7f3e9;
}

.layout-main {
  flex: 1;
  padding: 20px;
}

.layout-footer {
  padding: 10px;
  background: #9f7aea;
  color: white;
  text-align: center;
}
</style>
```

## utils

Nuxt 3 提供了多个工具函数，用于处理路由、数据、配置等。

app/utils/ 目录的主要目的是为了在 Vue 可组合函数（composables）和其他自动导入的工具函数之间进行语义区分。

使用
方法一： 使用命名导出

utils/index.ts

```typescript
export const { format: formatNumber } = Intl.NumberFormat("en-GB", {
  notation: "compact",
  maximumFractionDigits: 1,
});
```

方法二： 使用默认导出

utils/random-entry.ts 或 utils/randomEntry.ts

```typescript
// It will be available as randomEntry() (camelCase of file name without extension)
export default function (arr: Array<any>) {
  return arr[Math.floor(Math.random() * arr.length)];
}
```

现在你可以在 .js、.ts 和 .vue 文件中使用自动导入的工具函数了。

app/app.vue

```vue
<template>
  <p>{{ formatNumber(1234) }}</p>
</template>
```

## middleware

Nuxt 提供中间件，用于在导航到特定路由之前运行代码。
Nuxt 提供了一个可定制的路由中间件框架，你可以在整个应用程序中使用它，非常适合提取要在导航到特定路由之前运行的代码。

路由中间件有三种类型：

匿名（或内联）路由中间件直接在页面中定义。
命名路由中间件，放置在 app/middleware/ 目录中，并在页面中使用时通过异步导入自动加载。
全局路由中间件，放置在 app/middleware/ 目录中，并带有 .global 后缀，并在每次路由更改时运行。
前两种路由中间件可以在 definePageMeta 中定义。
// app/middleware/auth.ts

```typescript
import type { RouteLocationNormalized } from "vue-router";

// 定义路由中间件：指定 to/from 的类型为 RouteLocationNormalized
export default defineNuxtRouteMiddleware(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    // 1. 用泛型指定 useState 的类型为 boolean（登录状态是布尔值）
    const isLogin = useState<boolean>("isLogin", () => false);

    // 模拟异步校验 token（TS 版：指定返回值类型为 Promise<boolean>）
    const checkTokenValid = async (): Promise<boolean> => {
      // 模拟接口请求延迟
      await new Promise<void>((resolve) => setTimeout(resolve, 500));
      // 模拟 token 无效（未登录）
      return false;
    };

    // 执行异步校验（TS 自动推导 isTokenValid 为 boolean 类型）
    const isTokenValid = await checkTokenValid();

    // 未登录：跳登录页并携带回跳参数
    if (!isTokenValid) {
      // 编码目标路径（TS 自动推导 redirect 为 string 类型）
      const redirect = encodeURIComponent(to.fullPath);
      // navigateTo 返回路由跳转指令（Nuxt 内置类型）
      return navigateTo(`/login?redirect=${redirect}`);
    }

    // 已登录：放行（无需返回值）
  },
);
```

// app/pages/protected.vue

```vue
<script setup>
// 引入 auth 中间件（TS 自动推导类型为 NuxtRouteMiddleware）
import authMiddleware from "~/middleware/auth";

// 注册中间件（TS 自动推导类型为 NuxtRouteMiddleware）
definePageMeta({
  middleware: authMiddleware,
});
</script>

<template>
  <h1>受保护的页面</h1>
</template>
```

### 中间件顺序

中间件按以下顺序运行：

全局中间件
页9面定义的中间件顺序（如果使用数组语法声明了多个中间件）
例如，假设您有以下中间件和组件：

app/middleware/ 目录

-| middleware/
---| analytics.global.ts
---| setup.global.ts
---| auth.ts
pages/profile.vue

```vue
<script setup lang="ts">
definePageMeta({
  middleware: [
    function (to, from) {
      // Custom inline middleware
    },
    "auth",
  ],
});
</script>
您可以期望中间件按以下顺序运行： analytics.global.ts setup.global.ts
自定义内联中间件 auth.ts
```

### 全局中间件排序

默认情况下，全局中间件按文件名按字母顺序执行。

但是，有时您可能希望定义一个特定的顺序。例如，在最后一个场景中，setup.global.ts 可能需要在 analytics.global.ts 之前运行。在这种情况下，我们建议为全局中间件添加“字母数字”编号前缀。

目录结构

-| middleware/
---| 01.setup.global.ts
---| 02.analytics.global.ts
---| auth.ts

### 在中间件中访问路由

在中间件中始终使用 to 和 from 参数来访问下一个和上一个路由。在此上下文中应完全避免使用 useRoute() 可组合项。在中间件中没有“当前路由”的概念，因为中间件可以中止导航或重定向到不同的路由。useRoute() 可组合项在此上下文中将始终不准确。

````

# 核心概念

## 自动导入(自己手动导入吧，除了vue.api)
Nuxt 自动导入组件、可组合函数、辅助函数和 Vue API。
Nuxt 自动导入组件、可组合函数和Vue.js API供您的应用程序使用，而无需显式导入它们。
```app/app.vue

<script setup lang="ts">
const count = ref(1) // ref is auto-imported
</script>
````

得益于其固定的目录结构，Nuxt 可以自动导入您的 app/components/、app/composables/ 和 app/utils/。

与经典的全局声明不同，Nuxt 保留了类型、IDE 补全和提示，并且**只包含您生产代码中使用的内容**。

### 内置自动导入

Nuxt 自动导入函数和可组合函数，用于执行数据获取、访问应用程序上下文和运行时配置、管理状态或定义组件和插件。

```vue
<script setup lang="ts">
/* useFetch() is auto-imported */
const { data, refresh, status } = await useFetch('/api/hello')
useFetch他是一个异步函数query，返回一个对象，对象中有data、refresh、status三个属性
</script>
Vue 暴露了响应式 API，如 ref 或 computed，以及生命周期钩子和辅助函数，这些都由
Nuxt 自动导入。

<script setup lang="ts">
/* ref() and computed() are auto-imported */
const count = ref(1);
const double = computed(() => count.value * 2);
</script>
```

### 基于目录的自动导入

Nuxt 直接自动导入在定义目录中创建的文件

app/components/ 用于 Vue 组件。
app/composables/ 用于 Vue 可组合函数。
app/utils/ 用于辅助函数和其他工具。

### 显式导入

Nuxt 通过 #imports 别名暴露每个自动导入，如果需要，可以使用该别名使导入显式化

```vue
<script setup lang="ts">
import { computed, ref } from "#imports";

const count = ref(1);
const double = computed(() => count.value * 2);
</script>
```

### 禁用自动导入

如果您想禁用可组合函数和工具的自动导入，可以在 nuxt.config 文件中将 imports.autoImport 设置为 false。

```nuxt.config.ts

export default defineNuxtConfig({
  imports: {
    autoImport: false,
  },
})
```

这将完全禁用自动导入，但仍然可以使用 从 #imports 显式导入。

部分禁用自动导入
如果您希望像 ref 这样的框架特定函数保持自动导入，但希望禁用您自己代码（例如，自定义可组合函数）的自动导入，您可以在 nuxt.config.ts 文件中将 imports.scan 选项设置为 false

```nuxt.config.ts
export default defineNuxtConfig({
  imports: {
    scan: false,
  },
})
```

通过此配置

像 ref、computed 或 watch 这样的框架函数仍然可以工作，无需手动导入。
自定义代码（例如可组合函数）将需要在您的文件中手动导入。

## Nuxt 生命周期

### 服务器（后面在学）

### 客户端（浏览器）

- onNuxtReady(砍掉)
- onMounted
- onBeforeUpdate（更新前记录状态）
  记录滚动 / 光标位置 仅记录状态，不修改 DOM
- onUpdated（更新后应用状态）
  刷新图表 / 列表样式 DOM 已更新后再操作
- onBeforeUnmount（卸载前清理状态）
  清理滚动 / 光标位置 状态改变时记录
- onUnmounted（卸载后清理状态）
  删除图表 / 列表样式 DOM 删除后操作

## Vue.js 开发

Nuxt 4 基于 Vue 3 构建，因此您可以使用 Vue 3 提供的所有功能和 API。

## 代码风格

https://eslint.nuxtjs.org.cn/packages/module

## error.vue

# vueUse

- 安装 VueUse 核心包

```bash
# npm 安装（推荐）
npm install @vueuse/core
yarn add @vueuse/core
pnpm add @vueuse/core
```

安装完成后，直接在 .vue 页面 / 组件中写： vue

```vue
<script setup>
// 无需 import，直接用
const { y: scrollY } = useScroll(); // 监听滚动
const userInfo = useLocalStorage("user-info", { name: "张三" }); // 响应式本地存储
</script>
```

2. 非 Vue 文件也能便捷使用 即使在 composables/、utils/ 等 .ts
   文件中，也只需简单导入（无需配置）：

```ts
// composables/useScrollPosition.ts
import { useScroll } from "@vueuse/core"; // 仅需这行导入 export const
useScrollPosition = () => {
  const { x, y } = useScroll();
  return { x, y };
};
```

你想要一份完整且易上手的 Nuxt UI 使用教程，我会从**环境准备**、**安装配置**、**核心使用**到**高级定制**，一步步带你掌握 Nuxt UI 的核心用法，所有示例都能直接复制使用。

# Nuxt UI

### 前置条件

在开始前，请确保你的环境满足：

- Node.js ≥ 18.0.0（Nuxt 3 的要求）
- 已初始化一个 Nuxt 3 项目（如果没有，先执行 `npx nuxi@latest init my-nuxt-app` 创建）

---

## 第一步：安装 Nuxt UI

### 1. 进入你的 Nuxt 项目目录

```bash
cd my-nuxt-app
```

### 2. 安装 Nuxt UI 依赖

Nuxt UI 会自动安装依赖（如 Tailwind CSS），无需手动配置：

```bash
# npm
npm install @nuxt/ui

# yarn
yarn add @nuxt/ui

# pnpm（推荐）
pnpm add @nuxt/ui
```

### 3. 配置 Nuxt 模块

修改项目根目录的 `nuxt.config.ts`，将 `@nuxt/ui` 加入 `modules` 数组：

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  // 注册 Nuxt UI 模块
  modules: ["@nuxt/ui"],

  // 可选：配置 Nuxt UI 全局选项（比如默认主题、暗黑模式）
  ui: {
    global: true, // 全局注册组件（无需手动导入）
    icons: ["heroicons", "simple-icons"], // 启用图标库（后续讲）
    theme: "default", // 默认主题
  },
});
```

### 4. 验证安装

启动项目，检查是否无报错：

```bash
npm run dev
```

如果终端无报错，访问 `http://localhost:3000` 能看到 Nuxt 默认页面，说明 Nuxt UI 已成功集成。

---

## 第二步：基础使用（核心组件）

Nuxt UI 所有组件都支持**自动导入**（无需 `import`），直接在 `.vue` 文件中使用即可。

### 示例 1：使用按钮（UButton）

按钮是最基础的组件，支持颜色、尺寸、状态、图标等配置：

```vue
<!-- app.vue -->
<template>
  <div class="p-10">
    <!-- 基础按钮 -->
    <UButton label="基础按钮" />

    <!-- 带颜色的按钮 -->
    <UButton label="主要按钮" color="primary" class="ml-4" />
    <UButton label="危险按钮" color="danger" class="ml-4" />

    <!-- 不同尺寸 -->
    <UButton label="小尺寸" size="sm" class="ml-4" />
    <UButton label="大尺寸" size="lg" class="ml-4" />

    <!-- 带图标 + 加载状态 -->
    <UButton
      label="提交"
      icon="i-heroicons-check"
      :loading="loading"
      class="ml-4"
      @click="loading = !loading"
    />
  </div>
</template>

<script setup>
const loading = ref(false); // 控制加载状态
</script>
```

**效果**：页面会显示多个样式不同的按钮，点击“提交”按钮会切换加载状态。

### 示例 2：使用表单（UForm + UInput）

表单是高频使用场景，Nuxt UI 内置表单验证、联动等能力：

```vue
<template>
  <div class="p-10 max-w-md">
    <!-- 表单组件 -->
    <UForm @submit="handleSubmit" class="space-y-4">
      <!-- 输入框 -->
      <UInput
        v-model="form.username"
        label="用户名"
        placeholder="请输入用户名"
        required
        icon="i-heroicons-user"
      />

      <!-- 密码框 -->
      <UInput
        v-model="form.password"
        label="密码"
        type="password"
        placeholder="请输入密码"
        required
        icon="i-heroicons-lock"
      />

      <!-- 单选框组 -->
      <URadioGroup
        v-model="form.role"
        label="用户角色"
        :options="[
          { label: '普通用户', value: 'user' },
          { label: '管理员', value: 'admin' },
        ]"
      />

      <!-- 提交按钮 -->
      <UButton type="submit" color="primary" label="提交" />
    </UForm>

    <!-- 展示表单数据 -->
    <div class="mt-6 p-4 border rounded">
      <h4 class="font-bold">表单数据：</h4>
      <pre>{{ form }}</pre>
    </div>
  </div>
</template>

<script setup>
// 表单数据
const form = ref({
  username: "",
  password: "",
  role: "user",
});

// 表单提交逻辑
const handleSubmit = (data) => {
  alert(`提交成功！用户名：${data.username}，角色：${data.role}`);
  console.log("表单数据：", data);
};
</script>
```

**核心说明**：

- `UForm` 会自动收集子组件的 `v-model` 数据，提交时触发 `submit` 事件；
- 内置必填校验（`required`），无需手动写验证逻辑；
- `icon` 属性支持直接使用 Heroicons 图标（需在 `nuxt.config.ts` 中启用）。

### 示例 3：使用卡片（UCard）+ 表格（UTable）

适合展示列表/数据场景：

```vue
<template>
  <div class="p-10 max-w-3xl">
    <!-- 卡片容器 -->
    <UCard header="用户列表" class="space-y-4">
      <!-- 表格组件 -->
      <UTable :columns="columns" :rows="users" striped hover />
    </UCard>
  </div>
</template>

<script setup>
// 表格列配置
const columns = [
  { key: "id", label: "ID", width: "80px" },
  { key: "name", label: "姓名" },
  { key: "email", label: "邮箱" },
  {
    key: "role",
    label: "角色",
    cell: (row) =>
      `<UChip label="${row.role}" color="${row.role === "admin" ? "primary" : "secondary"}" />`,
  },
];

// 模拟数据
const users = [
  { id: 1, name: "张三", email: "zhangsan@example.com", role: "admin" },
  { id: 2, name: "李四", email: "lisi@example.com", role: "user" },
  { id: 3, name: "王五", email: "wangwu@example.com", role: "user" },
];
</script>
```

**核心说明**：

- `UCard` 提供带头部、边框的卡片容器；
- `UTable` 通过 `columns` 配置列，`rows` 配置数据，支持条纹（`striped`）、悬浮高亮（`hover`）；
- 列的 `cell` 属性支持自定义渲染（比如用 `UChip` 标签展示角色）。

---

## 第三步：高级定制（主题/样式）

Nuxt UI 基于 Tailwind CSS，支持自定义主题、颜色、样式，无需修改组件源码。

### 1. 自定义全局主题颜色

修改 `nuxt.config.ts`，覆盖默认颜色：

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@nuxt/ui"],
  ui: {
    colors: {
      // 自定义主色调（替换默认的蓝色）
      primary: {
        50: "#f0f9ff",
        500: "#165DFF", // 主色
        600: "#0D47A1",
      },
    },
  },
});
```

配置后，所有使用 `color="primary"` 的组件（按钮、表单等）都会变成你定义的蓝色。

### 2. 局部修改组件样式

通过 `class` 或 Nuxt UI 提供的 `variant`（变体）自定义：

```vue
<template>
  <!-- 自定义按钮样式 -->
  <UButton
    label="自定义样式按钮"
    color="primary"
    class="rounded-full py-3 px-8 font-bold" // 自定义圆角、内边距、字体
    variant="outline" // 轮廓样式（内置变体：solid/outline/ghost等）
  />
</template>
```

### 3. 启用暗黑模式

Nuxt UI 内置暗黑模式，只需添加一个切换按钮：

```vue
<template>
  <div class="p-10">
    <!-- 暗黑模式切换按钮 -->
    <UButton
      @click="toggleDarkMode"
      :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
      label="切换主题"
    />

    <!-- 测试暗黑模式的卡片 -->
    <UCard header="暗黑模式测试" class="mt-4">
      <p>切换按钮后，页面会自动适配暗黑/浅色模式</p>
    </UCard>
  </div>
</template>

<script setup>
// 使用 Nuxt UI 内置的暗黑模式工具
const { isDark, toggle: toggleDarkMode } = useDark();
</script>
```

---

## 第四步：常用技巧 & 避坑指南

### 1. 查找组件文档

Nuxt UI 官方文档是最好的参考：

- 地址：https://ui.nuxt.com/components
- 每个组件都有完整的属性、事件、示例，可直接复制使用。

### 2. 图标使用

Nuxt UI 支持 Heroicons、Simple Icons 等图标库，使用格式：`i-图标库-图标名`：

```vue
<!-- 使用 Heroicons 的搜索图标 -->
<UButton icon="i-heroicons-magnifying-glass" label="搜索" />

<!-- 使用 Simple Icons 的 Vue 图标 -->
<UButton icon="i-simple-icons-vuejs" label="Vue" />
```

### 3. 避坑点

- 确保 Node.js 版本 ≥ 18，否则可能安装失败；
- 组件名必须大写开头（如 `UButton`，不是 `u-button`）；
- 自动导入仅支持 Nuxt 3 项目，Nuxt 2 需手动导入（不推荐）。

---

### 总结

1. **核心流程**：安装依赖 → 配置 `nuxt.config.ts` → 直接使用组件（自动导入）；
2. **基础用法**：掌握 `UButton`/`UForm`/`UTable` 等高频组件，通过属性配置样式/行为；
3. **定制化**：通过 `nuxt.config.ts` 改全局主题，通过 `class`/`variant` 改局部样式，内置暗黑模式可一键切换。

按照这个教程，你可以快速用 Nuxt UI 搭建出美观、适配性强的 Nuxt 应用界面，结合之前讲的 VueUse 处理逻辑，能大幅提升开发效率。

# server(nuxt4)
## api
基本框架搭建
```ts
export default defineEventHandler(async (event) => {
  // 1. 获取请求参数（查询参数/请求体/动态参数）
  // 2. 处理业务逻辑（数据库操作/数据校验/第三方接口调用）
  // 3. 返回响应数据（Nuxt 自动转为 JSON 格式）
})

export default defineEventHandler(async (event) => {
  // 1. 获取请求参数（查询参数/请求体/动态参数）
  // 2. 处理业务逻辑（数据库操作/数据校验/第三方接口调用）
  // 3. 返回响应数据（Nuxt 自动转为 JSON 格式）
})

```
=====================

读取 POST 请求体	await readBody(event)	const body = await readBody(event)
获取 URL 查询参数	getQuery(event)	const { page, size } = getQuery(event)
获取动态路由参数	event.context.params	const { id } = event.context.params（对应 [id].ts）
获取请求头	getHeader(event, '键名')	const token = getHeader(event, 'Authorization')
设置 HTTP 状态码	setResponseStatus(event, 码)	setResponseStatus(event, 404)
设置响应头	setResponseHeader(event, k, v)	setResponseHeader(event, 'Access-Control-Allow-Origin', '*')
抛出异常	throw createError({...})	throw createError({ statusCode: 401, message: '未授权' })

## 服务器中间件
Nuxt 会自动读取 ~/server/middleware 中的任何文件，为您的项目创建服务器中间件。

中间件处理程序将在每个请求上在任何其他服务器路由之前运行，用于添加或检查头、记录请求或扩展事件的请求对象。

中间件处理程序不应返回任何内容（也不应关闭或响应请求），仅应检查或扩展请求上下文或抛出错误。
示例：
```server/middleware/log.ts

export default defineEventHandler((event) => {
  console.log('新请求: ' + getRequestURL(event))
})
server/middleware/auth.ts

export default defineEventHandler((event) => {
  event.context.auth = { user: 123 }
})
```