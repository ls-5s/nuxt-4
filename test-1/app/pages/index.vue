<template>

    <button @click="goToDemo" class="bg-blue-500 text-white p-2 rounded-md">go to demo</button>
    <div class = "flex flex-col gap-2 w-96">
      <input type="text" v-model="name" placeholder="name" class="border border-gray-300 rounded-md p-2" />
      <input type="password" v-model="password" placeholder="password" class="border border-gray-300 rounded-md p-2" />
      <button @click="login" class="bg-blue-500 text-white p-2 rounded-md">login</button>
      <button @click="getUserInfo" class="bg-blue-500 text-white p-2 rounded-md">getUserInfo</button>
    </div>
    <div v-if="res && res.code === 200">
      <p>登录成功</p>
    </div>
    <div v-else-if="res && res.code !== 200">
      <p>登录失败</p>
    </div>
</template>

<script setup lang="ts">
import type { LoginResponse, UserInfo } from '@/types/index'

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
