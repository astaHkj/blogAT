<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-6">最新文章</h1>
    
    <div v-if="pending" class="text-center py-12">
      <p class="text-gray-500">加载中...</p>
    </div>
    
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500">加载失败</p>
    </div>
    
    <div v-else-if="posts?.length === 0" class="text-center py-12">
      <p class="text-gray-500 mb-4">暂无文章</p>
      <NuxtLink v-if="userStore.isLoggedIn" to="/posts/create" class="text-blue-600 hover:underline">
        发表第一篇文章
      </NuxtLink>
    </div>
    
    <div v-else class="space-y-6">
      <PostCard v-for="post in posts" :key="post._id" :post="post" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IPost } from '~/types'

const userStore = useUserStore()
const api = useApi()

const { data: posts, pending, error } = await useAsyncData('posts', async () => {
  const res = await api.get<IPost[]>('/posts')
  if (res.success && res.data) {
    return res.data
  }
  return []
})
</script>
