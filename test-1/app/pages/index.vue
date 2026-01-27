<template>
  <div class="flex flex-col items-center justify-center min-h-screen gap-4">
    <button @click="goToDemo" class="bg-blue-500 text-white p-2 rounded-md">{{ $t('index.goToDemo') }}</button>
    <div class="flex flex-col gap-2 w-96">
      <input type="text" v-model="name" :placeholder="$t('index.namePlaceholder')" class="border border-gray-300 rounded-md p-2" />
      <input type="password" v-model="password" :placeholder="$t('index.passwordPlaceholder')" class="border border-gray-300 rounded-md p-2" />
      <button @click="login" class="bg-blue-500 text-white p-2 rounded-md">{{ $t('index.login') }}</button>
      <button @click="getUserInfo" class="bg-blue-500 text-white p-2 rounded-md">{{ $t('index.getUserInfo') }}</button>
    </div>
    <div v-if="res && res.code === 200">
      <p>{{ $t('index.loginSuccess') }}</p>
    </div>
    <div v-else-if="res && res.code !== 200">
      <p>{{ $t('index.loginFailed') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LoginResponse, UserInfo } from '@/types/index'
import { useI18n } from '#imports';

const { t } = useI18n();

const goToDemo = () => {
    navigateTo('/demo')
}
const name = ref('')
const password = ref('')
const res = ref<LoginResponse | null>(null)

const login = async () => {
  const response = await $fetch<LoginResponse>('/api/login', {
    method: 'POST',
    body: {
      name: name.value,
      password: password.value
    }
  })
  res.value = response
  if(response.code === 200) {
    console.log(response.data)
  } else {
    console.log(response.message)
  }
}
const getUserInfo = async () => {
  const res1 = await $fetch<UserInfo>('/api/login', {
    method: 'GET',
    query: {
      name: name.value,
      password: password.value
    }
  })
  console.log(res1)
}
</script>
