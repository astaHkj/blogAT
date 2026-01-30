<template>
  <div class="space-y-4">
    <div v-for="comment in comments" :key="comment._id" class="bg-gray-50 rounded-lg p-4">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2 text-sm">
          <span class="font-medium text-gray-700">{{ comment.author.name }}</span>
          <span class="text-gray-400">·</span>
          <span class="text-gray-400">{{ comment.created_at }}</span>
        </div>
        <button 
          v-if="isCommentAuthor(comment)" 
          @click="handleDelete(comment._id)"
          class="text-gray-400 hover:text-red-500 text-sm transition-colors"
        >
          删除
        </button>
      </div>
      <div class="text-gray-700" v-html="comment.content"></div>
    </div>
    
    <p v-if="comments.length === 0" class="text-gray-500 text-center py-4">
      暂无评论，来说两句吧～
    </p>
  </div>
</template>

<script setup lang="ts">
import type { IComment } from '~/types'

const props = defineProps<{
  comments: IComment[]
}>()

const emit = defineEmits<{
  delete: []
}>()

const userStore = useUserStore()
const api = useApi()

function isCommentAuthor(comment: IComment): boolean {
  if (!userStore.user) return false
  return comment.author._id === userStore.user._id
}

async function handleDelete(commentId: string) {
  if (!confirm('确定要删除这条评论吗？')) return
  
  const res = await api.delete(`/comments/${commentId}`)
  
  if (res.success) {
    emit('delete')
  } else {
    alert(res.error || '删除失败')
  }
}
</script>
