<template>
  <div v-if="post" class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
    <!-- 文章头部 -->
    <div class="mb-6">
      <div class="flex items-center gap-2 mb-4 text-sm text-gray-500">
        <span class="font-medium text-gray-700">{{ post.author.name }}</span>
        <span>·</span>
        <span>{{ post.created_at }}</span>
        <span>·</span>
        <span>阅读 {{ post.pv }}</span>
      </div>
      
      <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ post.title }}</h1>
      
      <!-- 操作按钮 -->
      <div v-if="isAuthor" class="flex gap-2">
        <NuxtLink :to="`/posts/${post._id}/edit`" class="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors">
          编辑
        </NuxtLink>
        <button @click="handleDelete" class="px-3 py-1 text-sm bg-red-100 text-red-600 hover:bg-red-200 rounded transition-colors">
          删除
        </button>
      </div>
    </div>
    
    <!-- 文章内容 -->
    <div class="prose prose-lg max-w-none" v-html="post.content"></div>
    
    <!-- 评论区 -->
    <div class="mt-12 pt-8 border-t border-gray-200">
      <h2 class="text-xl font-bold text-gray-900 mb-6">评论 ({{ comments.length }})</h2>
      
      <!-- 评论表单 -->
      <CommentForm v-if="userStore.isLoggedIn" :post-id="post._id" @submit="loadComments" />
      <p v-else class="text-gray-500 mb-6">
        <NuxtLink to="/login" class="text-blue-600 hover:underline">登录</NuxtLink> 后发表评论
      </p>
      
      <!-- 评论列表 -->
      <CommentList :comments="comments" @delete="loadComments" />
    </div>
  </div>
  
  <div v-else class="text-center py-12">
    <p class="text-gray-500">文章不存在</p>
  </div>
</template>

<script setup lang="ts">
import type { IPost, IComment } from '~/types'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const api = useApi()

const postId = route.params.id as string

// 加载文章
const { data: post } = await useAsyncData(`post-${postId}`, async () => {
  const res = await api.get<IPost>(`/posts/${postId}`)
  if (res.success && res.data) {
    return res.data
  }
  return null
})

// 加载评论
const comments = ref<IComment[]>([])
async function loadComments() {
  const res = await api.get<IComment[]>(`/posts/${postId}/comments`)
  if (res.success && res.data) {
    comments.value = res.data
  }
}
await loadComments()

// 判断是否是作者
const isAuthor = computed(() => {
  if (!post.value || !userStore.user) return false
  return post.value.author._id === userStore.user._id
})

// 删除文章
async function handleDelete() {
  if (!confirm('确定要删除这篇文章吗？')) return
  
  const res = await api.delete(`/posts/${postId}`)
  if (res.success) {
    router.push('/')
  } else {
    alert(res.error || '删除失败')
  }
}
</script>
