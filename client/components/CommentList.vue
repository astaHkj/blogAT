<template>
  <div class="comments-list">
    <div 
      v-for="comment in comments" 
      :key="comment._id" 
      class="comment-item"
    >
      <div class="comment-header">
        <div class="comment-author">
          <div class="author-avatar">
            {{ comment.author.name.charAt(0) }}
          </div>
          <div class="author-info">
            <span class="author-name">{{ comment.author.name }}</span>
            <time class="comment-date">{{ formatDate(comment.created_at) }}</time>
          </div>
        </div>
        
        <button 
          v-if="isCommentAuthor(comment)" 
          @click="handleDelete(comment._id)"
          class="btn-delete"
          title="删除评论"
          aria-label="删除这条评论"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
      
      <!-- XSS 修复：使用文本渲染代替 v-html -->
      <div class="comment-content">{{ comment.content }}</div>
    </div>
    
    <div v-if="comments.length === 0" class="empty-comments">
      <div class="empty-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>
      <p class="empty-text">暂无评论</p>
      <p class="empty-hint">成为第一个评论的人吧～</p>
    </div>
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

// 格式化日期
function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  // 小于1小时显示"x分钟前"
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000)
    return minutes < 1 ? '刚刚' : `${minutes}分钟前`
  }
  
  // 小于24小时显示"x小时前"
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000)
    return `${hours}小时前`
  }
  
  // 否则显示具体日期
  return date.toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.comments-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.comment-item {
  background-color: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  transition: all var(--transition-fast);
}

.comment-item:hover {
  border-color: rgba(196, 167, 125, 0.3);
  box-shadow: 0 2px 8px var(--color-shadow);
}

.comment-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-sm);
}

.comment-author {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.author-avatar {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--color-accent-gold), var(--color-accent-olive));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
}

.author-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.author-name {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.comment-date {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.btn-delete {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all var(--transition-fast);
  opacity: 0;
}

.comment-item:hover .btn-delete {
  opacity: 1;
}

/* 使用 CSS 变量代替硬编码颜色 */
.btn-delete:hover {
  background-color: var(--color-error-bg);
  border-color: var(--color-error-border);
  color: var(--color-error);
}

.comment-content {
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  padding-left: 40px;
  white-space: pre-wrap; /* 保留换行符 */
}

/* Empty State */
.empty-comments {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-xl) 0;
}

.empty-icon {
  color: var(--color-accent-gold);
  opacity: 0.4;
  margin-bottom: var(--space-sm);
}

.empty-text {
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: var(--space-xs);
}

.empty-hint {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

/* Responsive */
@media (max-width: 768px) {
  .btn-delete {
    opacity: 1;
  }
  
  .comment-content {
    padding-left: 0;
    margin-top: var(--space-sm);
  }
}
</style>
