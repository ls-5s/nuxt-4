<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md dark:bg-gray-800">
      <h1 class="text-2xl font-bold text-center text-gray-900 dark:text-white">登录</h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300">用户名</label>
          <input
            v-model="form.username"
            type="text"
            id="username"
            required
            class="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">密码</label>
          <input
            v-model="form.password"
            type="password"
            id="password"
            required
            class="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full px-4 py-2 text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
      <div class="text-sm text-center">
        <button @click="handleRegister" class="text-primary-600 hover:text-primary-500 dark:text-primary-400">
          没有账号？点击注册
        </button>
      </div>
      <div v-if="message" :class="['p-3 rounded text-center text-sm', isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  username: '',
  password: ''
});

const loading = ref(false);
const message = ref('');
const isError = ref(false);

const handleLogin = async () => {
  loading.value = true;
  message.value = '';
  isError.value = false;

  try {
    const res = await $fetch('/api/login', {
      method: 'POST',
      body: form
    });

    if (res.code === 200) {
      message.value = '登录成功！';
      // 保存 token 或跳转
      console.log('User info:', res.data);
    } else {
      isError.value = true;
      message.value = res.message;
    }
  } catch (error: any) {
    isError.value = true;
    message.value = error.message || '登录请求失败';
  } finally {
    loading.value = false;
  }
};

const handleRegister = async () => {
  loading.value = true;
  message.value = '';
  isError.value = false;

  try {
    const res = await $fetch('/api/register', {
      method: 'POST',
      body: form
    });

    if (res.code === 200) {
      message.value = '注册成功，请登录！';
    } else {
      isError.value = true;
      message.value = res.message;
    }
  } catch (error: any) {
    isError.value = true;
    message.value = error.message || '注册请求失败';
  } finally {
    loading.value = false;
  }
};
</script>
