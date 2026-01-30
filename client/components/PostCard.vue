<template>
  <div class="card p-6 hover:shadow-lg transition-shadow cursor-pointer" @click="navigateToPost">
    <div class="flex items-center gap-2 mb-3 text-sm text-gray-500">
      <span class="font-medium text-gray-700">{{ post.author.name }}</span>
      <span>·</span>
      <span>{{ post.created_at }}</span>
      <span>·</span>
      <span>阅读 {{ post.pv }}</span>
    </div>
    
    <h2 class="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
      {{ post.title }}
    </h2>
    
    <div class="text-gray-600 line-clamp-3" v-html="post.content.slice(0, 200) + '...'"></div>
    
    <div class="mt-4 flex items-center justify-between">
      <NuxtLink :to="`/posts/${post._id}`" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
        阅读全文 →
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IPost } from '~/types'

const props = defineProps<{
  post: IPost
}>()

const router = useRouter()

function navigateToPost() {
  router.push(`/posts/${props.post._id}`)
}
</script>

<style scoped>
.card {
  @apply bg-white rounded-xl shadow-sm border border-gray-100;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
