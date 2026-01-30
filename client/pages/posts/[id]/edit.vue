<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">编辑文章</h1>
    
    <form v-if="post" @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">标题</label>
        <input 
          v-model="form.title" 
          type="text" 
          required
          maxlength="100"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">内容 (支持 Markdown)</label>
        <textarea 
          v-model="form.content" 
          required
          rows="12"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
        ></textarea>
      </div>
      
      <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
      
      <div class="flex gap-4">
        <button 
          type="submit" 
          :disabled="loading"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {{ loading ? '保存中...' : '保存' }}
        </button>
        <NuxtLink :to="`/posts/${postId}`" class="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          取消
        </NuxtLink>
      </div>
    </form>
    
    <div v-else class="text-center py-12">
      <p class="text-gray-500">加载中...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IPost } from '~/types'

definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const router = useRouter()
const api = useApi()

const postId = route.params.id as string

// 加载文章原始数据
const { data: post } = await useAsyncData(`post-raw-${postId}`, async () => {
  const res = await api.get<IPost>(`/posts/${postId}/raw`)
  if (res.success && res.data) {
    return res.data
  }
  return null
})

const form = reactive({
  title: post.value?.title || '',
  content: post.value?.content || ''
})

const loading = ref(false)
const error = ref('')

async function handleSubmit() {
  loading.value = true
  error.value = ''
  
  const res = await api.put(`/posts/${postId}`, form)
  
  if (res.success) {
    router.push(`/posts/${postId}`)
  } else {
    error.value = res.error || '保存失败'
    loading.value = false
  }
}
</script>
