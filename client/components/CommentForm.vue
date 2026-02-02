<template>
  <div class="comment-form">
    <div class="form-header">
      <div class="avatar">
        {{ userStore.user?.name?.charAt(0) || '?' }}
      </div>
      <span class="form-label">发表评论</span>
    </div>
    
    <textarea 
      v-model="content" 
      rows="4"
      class="comment-input"
      placeholder="写下你的想法..."
    ></textarea>
    
    <div class="form-footer">
      <span class="char-count" :class="{ 'over-limit': content.length > 500 }">
        {{ content.length }}/500
      </span>
      <button 
        @click="handleSubmit" 
        :disabled="loading || !content.trim() || content.length > 500"
        class="btn-submit"
      >
        <span v-if="!loading">发表评论</span>
        <span v-else class="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </span>
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

const userStore = useUserStore()
const api = useApi()

const content = ref('')
const loading = ref(false)

async function handleSubmit() {
  if (!content.value.trim() || content.value.length > 500) return
  
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

<style scoped>
.comment-form {
  background-color: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
}

.form-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
}

.avatar {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, var(--color-accent-terracotta), var(--color-accent-gold));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 500;
  color: white;
}

.form-label {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.comment-input {
  width: 100%;
  padding: var(--space-sm);
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-text-primary);
  resize: vertical;
  transition: all var(--transition-fast);
}

.comment-input:focus {
  outline: none;
  border-color: var(--color-accent-gold);
  box-shadow: 0 0 0 3px rgba(196, 167, 125, 0.1);
}

.comment-input::placeholder {
  color: var(--color-text-muted);
}

.form-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--space-sm);
}

.char-count {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.char-count.over-limit {
  color: #dc2626;
}

.btn-submit {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 0.625rem 1.25rem;
  background-color: var(--color-accent-terracotta);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-submit:hover:not(:disabled) {
  background-color: var(--color-accent-olive);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(185, 125, 96, 0.25);
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Loading Animation */
.loading-dots {
  display: flex;
  align-items: center;
  gap: 3px;
}

.loading-dots span {
  width: 4px;
  height: 4px;
  background-color: white;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.loading-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.loading-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
