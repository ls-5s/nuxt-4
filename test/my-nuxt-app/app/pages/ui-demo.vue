<template>
  <div class="h-screen p-8 space-y-6">
    <h1 class="text-2xl font-bold">Nuxt UI Button Examples</h1>

    <UCard class="space-y-4 p-6">
      <h2 class="text-xl font-semibold">带图标的按钮</h2>
      <div class="flex flex-wrap gap-4 items-center">
        <!-- 基础图标按钮 -->
        <UButton icon="i-heroicons-pencil-square" label="编辑" />

        <!-- 仅图标按钮 -->
        <UButton
          icon="i-heroicons-trash"
          variant="solid"
          aria-label="删除"
          class="bg-brand-600 hover:bg-brand-700 text-white border-0"
        />

        <!-- 图标在右侧 -->
        <UButton
          icon="i-heroicons-arrow-right-20-solid"
          trailing
          label="下一步"
        />

        <!-- 幽灵按钮带图标 -->
        <UButton
          icon="i-heroicons-document-duplicate"
          variant="ghost"
          label="复制"
          class="text-brand-700 hover:text-brand-800"
        />
      </div>
    </UCard>

    <UCard class="space-y-4 p-6">
      <h2 class="text-xl font-semibold">不同颜色和大小</h2>
      <div class="flex flex-wrap gap-4 items-center">
        <UButton
          icon="i-heroicons-check"
          size="sm"
          label="保存"
          class="bg-brand-600 hover:bg-brand-700 text-white border-0"
        />
        <UButton
          icon="i-heroicons-x-mark"
          size="md"
          label="取消"
          class="bg-brand-100 hover:bg-brand-200 text-brand-700 border-0"
        />
        <UButton
          icon="i-heroicons-star"
          size="xl"
          variant="soft"
          label="收藏"
          class="bg-brand-50 hover:bg-brand-100 text-brand-700"
        />
        <UButton
          icon="i-heroicons-paper-airplane"
          size="lg"
          variant="solid"
          label="品牌按键"
          class="bg-brand-600 hover:bg-brand-700 text-white border-0"
        />
      </div>
    </UCard>

    <UCard class="space-y-4 p-6">
      <h2 class="text-xl font-semibold">加载状态</h2>
      <div class="flex flex-wrap gap-4 items-center">
        <UButton loading label="加载中..." />
        <UButton
          :loading="true"
          icon="i-heroicons-cloud-arrow-up"
          label="上传"
        />
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// 无需导入 UButton，Nuxt UI 会自动导入
</script>
