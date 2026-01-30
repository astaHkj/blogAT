<template>
  <div class="mb-6">
    <textarea 
      v-model="content" 
      rows="3"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="写下你的评论..."
    ></textarea>
    <div class="mt-2 flex justify-end">
      <button 
        @click="handleSubmit" 
        :disabled="loading || !content.trim()"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm"
      >
        {{ loading ? '提交中...' : '发表评论' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  postId: string
}>()

const emit = defineEmits<{
  submit: []
}>()

const api = useApi()

const content = ref('')
const loading = ref(false)

async function handleSubmit() {
  if (!content.value.trim()) return
  
  loading.value = true
  
  const res = await api.post(`/posts/${props.postId}/comments`, {
    content: content.value
  })
  
  if (res.success) {
    content.value = ''
    emit('submit')
  } else {
    alert(res.error || '评论失败')
  }
  
  loading.value = false
}
</script>
