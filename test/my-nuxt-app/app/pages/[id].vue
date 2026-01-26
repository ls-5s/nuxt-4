<template>
  <div class="page-container h-screen p-8">
    <UCard class="max-w-xl mx-auto p-6">
      <h2 class="text-xl font-semibold text-gray-900">动态页面</h2>
      <p class="mt-2 text-gray-600">当前 ID：</p>
      <div
        class="mt-3 inline-flex items-center rounded-full bg-brand-50 text-brand-700 px-3 py-1 text-sm font-medium border border-brand-100"
      >
        {{ route.params.id }}
      </div>
      <div class="mt-6">
        <UButton
          to="/"
          icon="i-heroicons-home"
          label="返回首页"
          class="bg-brand-600 hover:bg-brand-700 text-white border-0"
        />
      </div>
    </UCard>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
</script>
