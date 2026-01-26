<script setup lang="ts">
const { login } = useUserStore()
const router = useRouter()
const toast = useToast()

const state = reactive({
  account: '',
  password: ''
})

const loading = ref(false)

async function onSubmit() {
  loading.value = true
  try {
    const success = await login(state.account, state.password)
    if (success) {
      toast.add({
        title: '登录成功',
        description: '欢迎回来！',
        color: 'success'
      })
      router.push('/')
    } else {
      toast.add({
        title: '登录失败',
        description: '账号或密码错误',
        color: 'error'
      })
    }
  } catch (error) {
    toast.add({
      title: '错误',
      description: '登录过程中发生错误',
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-[80vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <UCard class="w-full max-w-md p-8 shadow-xl">
      <div class="mb-8 text-center">
        <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white">
          用户登录
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          请输入您的账号和密码
        </p>
      </div>

      <UForm :state="state" class="space-y-6" @submit="onSubmit">
        <UFormGroup label="账号" name="account">
          <UInput
            v-model="state.account"
            icon="i-heroicons-user"
            placeholder="请输入账号 (admin/user)"
            size="lg"
            class="w-full"
          />
        </UFormGroup>

        <UFormGroup label="密码" name="password">
          <UInput
            v-model="state.password"
            type="password"
            icon="i-heroicons-lock-closed"
            placeholder="请输入密码 (123456)"
            size="lg"
            class="w-full"
          />
        </UFormGroup>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <UCheckbox id="remember-me" name="remember-me" label="记住我" />
          </div>
          <div class="text-sm">
            <a href="#" class="font-medium text-brand-600 hover:text-brand-500">
              忘记密码？
            </a>
          </div>
        </div>

        <UButton
          type="submit"
          :loading="loading"
          block
          size="lg"
          label="立即登录"
          class="bg-brand-600 hover:bg-brand-700 text-white"
        />
      </UForm>

      <div class="mt-6 text-center text-sm">
        <span class="text-gray-600 dark:text-gray-400">还没有账号？</span>
        <a href="#" class="ml-1 font-medium text-brand-600 hover:text-brand-500">
          立即注册
        </a>
      </div>
    </UCard>
  </div>
</template>
