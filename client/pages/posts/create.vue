<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">发表文章</h1>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">标题</label>
        <input 
          v-model="form.title" 
          type="text" 
          required
          maxlength="100"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="请输入文章标题"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">内容 (支持 Markdown)</label>
        <textarea 
          v-model="form.content" 
          required
          rows="12"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
          placeholder="请输入文章内容，支持 Markdown 语法"
        ></textarea>
      </div>
      
      <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
      
      <div class="flex gap-4">
        <button 
          type="submit" 
          :disabled="loading"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {{ loading ? '发表中...' : '发表' }}
        </button>
        <NuxtLink to="/" class="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          取消
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const router = useRouter()
const api = useApi()

const form = reactive({
  title: '',
  content: ''
})

const loading = ref(false)
const error = ref('')

async function handleSubmit() {
  loading.value = true
  error.value = ''
  
  const res = await api.post('/posts', form)
  
  if (res.success && res.data) {
    router.push(`/posts/${res.data._id}`)
  } else {
    error.value = res.error || '发表失败'
    loading.value = false
  }
}
</script>
