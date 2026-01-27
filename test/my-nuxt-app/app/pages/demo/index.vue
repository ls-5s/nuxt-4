<template>
  <div class="h-screen p-8 space-y-6">
    <h1 class="text-2xl font-bold">按钮大全</h1>

    <UCard class="space-y-4 p-6">
      <h2 class="text-xl font-semibold">基础颜色</h2>
      <div class="flex flex-wrap gap-4 items-center">
        <UButton label="默认" />
        <UButton label="Primary" color="primary" />
        <UButton label="Gray" color="gray" />
        <UButton label="Success" color="green" />
        <UButton label="Warning" color="yellow" />
        <UButton label="Danger" color="red" />
        <UButton
          label="Brand"
          class="bg-brand-600 hover:bg-brand-700 text-white border-0"
        />
      </div>
    </UCard>

    <UCard class="space-y-4 p-6">
      <h2 class="text-xl font-semibold">变体样式</h2>
      <div class="flex flex-wrap gap-4 items-center">
        <UButton label="Solid" color="primary" variant="solid" />
        <UButton label="Soft" color="primary" variant="soft" />
        <UButton label="Outline" color="primary" variant="outline" />
        <UButton label="Ghost" color="primary" variant="ghost" />
        <UButton label="Link" color="primary" variant="link" />
      </div>
    </UCard>

    <UCard class="space-y-4 p-6">
      <h2 class="text-xl font-semibold">不同尺寸</h2>
      <div class="flex flex-wrap gap-4 items-center">
        <UButton label="XS" size="xs" />
        <UButton label="SM" size="sm" />
        <UButton label="MD" size="md" />
        <UButton label="LG" size="lg" />
        <UButton label="XL" size="xl" />
      </div>
    </UCard>

    <UCard class="space-y-4 p-6">
      <h2 class="text-xl font-semibold">图标按钮</h2>
      <div class="flex flex-wrap gap-4 items-center">
        <UButton icon="i-heroicons-plus" label="新增" />
        <UButton
          icon="i-heroicons-arrow-right-20-solid"
          trailing
          label="下一步"
        />
        <UButton
          icon="i-heroicons-magnifying-glass"
          aria-label="搜索"
          class="bg-brand-600 hover:bg-brand-700 text-white border-0"
        />
      </div>
    </UCard>

    <UCard class="space-y-4 p-6">
      <h2 class="text-xl font-semibold">状态</h2>
      <div class="flex flex-wrap gap-4 items-center">
        <UButton
          :loading="loading"
          label="加载中"
          @click="loading = !loading"
        />
        <UButton disabled label="不可用" />
      </div>
    </UCard>

    <UCard class="space-y-4 p-6">
      <h2 class="text-xl font-semibold">布局与链接</h2>
      <div class="space-y-4">
        <UButton label="块级按钮" class="w-full" />
        <div class="flex flex-wrap gap-4 items-center">
          <UButton
            to="/"
            icon="i-heroicons-home"
            label="返回首页"
            class="bg-brand-600 hover:bg-brand-700 text-white border-0"
          />
          <UButton
            to="/ui-demo"
            icon="i-heroicons-command-line"
            variant="soft"
            label="UI 示例"
            class="bg-brand-100 hover:bg-brand-200 text-brand-700 border-0"
          />
        </div>
      </div>
    </UCard>

    <UCard class="space-y-4 p-6">
      <h2 class="text-xl font-semibold">自定义样式</h2>
      <div class="flex flex-wrap gap-4 items-center">
        <UButton
          label="圆角加粗"
          color="primary"
          variant="outline"
          class="rounded-full py-3 px-8 font-bold"
        />
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const loading = ref(false);
</script>
