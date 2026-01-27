<script setup lang="ts">
import MyButton from "../../components/demo/UButton.vue";
const loading = ref(false);
const disabled = ref(false);

const handleClick = () => {
  console.log("Button clicked!");
};
</script>

<template>
  <div class="min-h-screen p-8 space-y-8 bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
        封装按钮组件大全 (demo/UButton.vue)
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        一个功能完整、样式丰富的按钮组件封装，支持多种意图、变体、尺寸和状态。
      </p>

      <!-- 基础颜色 (intent) -->
      <UCard class="space-y-4 p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          基础颜色 (intent)
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          7 种不同的意图颜色，适用于不同的使用场景
        </p>
        <div class="flex flex-wrap gap-4 items-center">
          <MyButton label="Primary" intent="primary" />
          <MyButton label="Secondary" intent="secondary" />
          <MyButton label="Success" intent="success" />
          <MyButton label="Warning" intent="warning" />
          <MyButton label="Danger" intent="danger" />
          <MyButton label="Neutral" intent="neutral" />
          <MyButton label="Info" intent="info" />
        </div>
      </UCard>

      <!-- 变体样式 (variant) -->
      <UCard class="space-y-4 p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          变体样式 (variant)
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          5 种不同的视觉变体，满足不同的设计需求
        </p>
        <div class="space-y-4">
          <div class="flex flex-wrap gap-4 items-center">
            <MyButton label="Solid" variant="solid" />
            <MyButton label="Soft" variant="soft" />
            <MyButton label="Outline" variant="outline" />
            <MyButton label="Ghost" variant="ghost" />
            <MyButton label="Link" variant="link" />
          </div>
          <div class="flex flex-wrap gap-4 items-center">
            <MyButton label="Solid" variant="solid" intent="success" />
            <MyButton label="Soft" variant="soft" intent="success" />
            <MyButton label="Outline" variant="outline" intent="success" />
            <MyButton label="Ghost" variant="ghost" intent="success" />
            <MyButton label="Link" variant="link" intent="success" />
          </div>
        </div>
      </UCard>

      <!-- 不同尺寸 (size) -->
      <UCard class="space-y-4 p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          不同尺寸 (size)
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          5 种尺寸选项，从超小到超大
        </p>
        <div class="flex flex-wrap gap-4 items-center">
          <MyButton label="XS" size="xs" />
          <MyButton label="SM" size="sm" />
          <MyButton label="MD" size="md" />
          <MyButton label="LG" size="lg" />
          <MyButton label="XL" size="xl" />
        </div>
      </UCard>

      <!-- 状态与图标 -->
      <UCard class="space-y-4 p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          状态与图标
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          支持加载状态、禁用状态、左侧图标、右侧图标等
        </p>
        <div class="space-y-4">
          <div class="flex flex-wrap gap-4 items-center">
            <MyButton label="加载中" :loading="loading" @click="loading = !loading" />
            <MyButton label="禁用状态" :disabled="disabled" @click="disabled = !disabled" />
            <MyButton label="带左侧图标" icon="i-heroicons-sparkles" />
            <MyButton label="带右侧图标" icon-right="i-heroicons-arrow-right" />
            <MyButton label="双图标" icon="i-heroicons-heart" icon-right="i-heroicons-arrow-right" />
          </div>
          <div class="flex flex-wrap gap-4 items-center">
            <MyButton label="点击事件" @click="handleClick" />
            <MyButton label="路由链接" to="/" />
            <MyButton label="外部链接" href="https://nuxt.com" target="_blank" />
          </div>
        </div>
      </UCard>

      <!-- 全宽按钮 -->
      <UCard class="space-y-4 p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          全宽按钮 (block)
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          使用 block 属性让按钮占据整个容器宽度
        </p>
        <div class="space-y-3">
          <MyButton label="全宽按钮" block />
          <MyButton label="全宽加载中" block :loading="true" />
          <MyButton label="全宽带图标" block icon="i-heroicons-check" />
        </div>
      </UCard>

      <!-- 组合示例 -->
      <UCard class="space-y-4 p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          组合示例
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          各种属性组合使用的实际场景
        </p>
        <div class="space-y-4">
          <div class="flex flex-wrap gap-4 items-center">
            <MyButton
              label="大号主要按钮"
              size="lg"
              variant="solid"
              intent="primary"
              icon="i-heroicons-rocket-launch"
            />
            <MyButton
              label="小号成功按钮"
              size="sm"
              variant="outline"
              intent="success"
              icon="i-heroicons-check-circle"
            />
            <MyButton
              label="加载警告按钮"
              variant="soft"
              intent="warning"
              :loading="true"
            />
            <MyButton
              label="禁用危险按钮"
              variant="ghost"
              intent="danger"
              disabled
            />
          </div>
          <div class="flex flex-wrap gap-4 items-center">
            <MyButton
              label="提交表单"
              type="submit"
              intent="primary"
              icon="i-heroicons-paper-airplane"
            />
            <MyButton
              label="重置表单"
              type="reset"
              variant="outline"
              intent="neutral"
            />
          </div>
        </div>
      </UCard>

      <!-- 深色模式适配 -->
      <UCard class="space-y-4 p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          深色模式适配
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          所有变体都完美支持深色模式
        </p>
        <div class="flex flex-wrap gap-4 items-center">
          <MyButton label="Solid" variant="solid" intent="primary" />
          <MyButton label="Soft" variant="soft" intent="primary" />
          <MyButton label="Outline" variant="outline" intent="primary" />
          <MyButton label="Ghost" variant="ghost" intent="primary" />
        </div>
      </UCard>

      <!-- 使用插槽 -->
      <UCard class="space-y-4 p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          使用插槽
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          支持使用默认插槽自定义按钮内容
        </p>
        <div class="flex flex-wrap gap-4 items-center">
          <MyButton intent="primary">
            <span class="flex items-center gap-2">
              <span class="i-heroicons-star text-yellow-400"></span>
              <span>自定义内容</span>
            </span>
          </MyButton>
          <MyButton variant="outline" intent="success">
            <span class="flex items-center gap-2">
              <span>👍</span>
              <span>表情按钮</span>
            </span>
          </MyButton>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(false);
</script>
