<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">帖子广场 (多表查询演示)</h1>
        <NuxtLink to="/login" class="text-blue-600 hover:underline">去登录/注册</NuxtLink>
      </div>

      <!-- 发布帖子表单 -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">发布新帖子</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">标题</label>
            <input 
              v-model="form.title" 
              type="text" 
              placeholder="请输入标题" 
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">内容</label>
            <textarea 
              v-model="form.content" 
              placeholder="请输入内容" 
              rows="3"
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">用户ID (模拟当前登录用户)</label>
            <div class="flex gap-2">
              <input 
                v-model="form.userId" 
                type="number" 
                placeholder="输入已注册的用户ID" 
                class="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button 
                @click="createPost" 
                :disabled="isSubmitting"
                class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
              >
                {{ isSubmitting ? '发布中...' : '发布' }}
              </button>
            </div>
            <p class="text-xs text-gray-500 mt-1">* 请确保输入的 ID 对应数据库中存在的用户，否则外键约束可能导致失败</p>
          </div>
        </div>
      </div>

      <!-- 帖子列表 -->
      <div class="space-y-4">
        <h2 class="text-xl font-semibold text-gray-700 mb-2">最新帖子</h2>
        
        <div v-if="pending" class="text-center py-8 text-gray-500">加载中...</div>
        
        <div v-else-if="!posts.length" class="text-center py-8 bg-white rounded shadow text-gray-500">
          暂无帖子，快来抢沙发吧！
        </div>

        <div v-else v-for="post in posts" :key="post.id" class="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-xl font-bold text-gray-800">{{ post.title }}</h3>
            <span class="text-sm text-gray-400">{{ formatDate(post.createdAt) }}</span>
          </div>
          <p class="text-gray-600 mb-4 whitespace-pre-wrap">{{ post.content }}</p>
          <div class="flex items-center text-sm text-gray-500 border-t pt-3">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                {{ post.author?.username?.charAt(0).toUpperCase() || '?' }}
              </div>
              <span>
                作者: <span class="font-medium text-gray-700">{{ post.author?.username || '未知用户' }}</span>
                (ID: {{ post.author?.id }})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  title: '',
  content: '',
  userId: ''
})
const isSubmitting = ref(false)

// 获取帖子列表
const { data: res, refresh, pending } = await useFetch('/api/posts')
const posts = computed(() => res.value?.data || [])

// 格式化日期
function formatDate(dateStr: string | Date | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleString()
}

// 创建帖子
async function createPost() {
  if (!form.title || !form.content || !form.userId) {
    alert('请填写完整信息')
    return
  }
  
  isSubmitting.value = true
  try {
    const { data, error } = await useFetch('/api/posts', {
      method: 'POST',
      body: {
        title: form.title,
        content: form.content,
        userId: Number(form.userId)
      }
    })

    if (error.value) {
      alert(error.value.statusMessage || '发布失败')
    } else {
      alert('发布成功')
      // 重置表单
      form.title = ''
      form.content = ''
      // 刷新列表
      refresh()
    }
  } catch (e) {
    alert('系统错误')
  } finally {
    isSubmitting.value = false
  }
}
</script>
