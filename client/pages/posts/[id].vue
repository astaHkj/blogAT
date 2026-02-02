<template>
  <div class="post-page">
    <div v-if="post" class="post-container">
      <!-- 文章头部 -->
      <header class="post-header">
        <div class="header-meta">
          <div class="author-info">
            <div class="author-avatar">
              {{ post.author.name.charAt(0) }}
            </div>
            <div class="author-details">
              <span class="author-name">{{ post.author.name }}</span>
              <div class="post-stats">
                <time class="post-date">{{ formatDate(post.created_at) }}</time>
                <span class="stat-separator">·</span>
                <span class="post-views">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  {{ post.pv }} 阅读
                </span>
              </div>
            </div>
          </div>
          
          <!-- 操作按钮 -->
          <div v-if="isAuthor" class="post-actions">
            <NuxtLink :to="`/posts/${post._id}/edit`" class="btn-icon" title="编辑">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              <span>编辑</span>
            </NuxtLink>
            <button @click="handleDelete" class="btn-icon btn-danger" title="删除文章" aria-label="删除这篇文章">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              <span>删除</span>
            </button>
          </div>
        </div>
        
        <h1 class="post-title">{{ post.title }}</h1>
      </header>
      
      <div class="divider"></div>
      
      <!-- 文章内容 -->
      <article class="post-content" v-html="post.content"></article>
      
      <div class="divider"></div>
      
      <!-- 评论区 -->
      <section class="comments-section">
        <div class="comments-header">
          <h2 class="comments-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            评论
            <span class="comments-count">{{ comments.length }}</span>
          </h2>
        </div>
        
        <!-- 评论表单 -->
        <div class="comment-form-wrapper">
          <CommentForm v-if="userStore.isLoggedIn" :post-id="post._id" @submit="loadComments" />
          <div v-else class="login-prompt">
            <p>
              <NuxtLink to="/login" class="login-link">登录</NuxtLink>
              <span>后发表评论</span>
            </p>
          </div>
        </div>
        
        <!-- 评论列表 -->
        <CommentList :comments="comments" @delete="loadComments" />
      </section>
    </div>
    
    <div v-else class="error-state">
      <div class="error-icon">✕</div>
      <h2 class="error-title">文章不存在</h2>
      <p class="error-text">该文章可能已被删除或链接已失效</p>
      <NuxtLink to="/" class="btn-primary mt-lg">返回首页</NuxtLink>
    </div>
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
  if (!confirm('确定要删除这篇文章吗？此操作不可恢复。')) return
  
  const res = await api.delete(`/posts/${postId}`)
  if (res.success) {
    router.push('/')
  } else {
    alert(res.error || '删除失败')
  }
}

// 格式化日期
function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.post-page {
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
}

.post-container {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--space-xl) 0;
}

/* Post Header */
.post-header {
  margin-bottom: var(--space-xl);
}

.header-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-lg);
  flex-wrap: wrap;
  gap: var(--space-md);
}

.author-info {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.author-avatar {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--color-accent-terracotta), var(--color-accent-gold));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 500;
  color: white;
}

.author-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.author-name {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.post-stats {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.post-date {
  font-family: var(--font-body);
}

.stat-separator {
  color: var(--color-accent-gold);
}

.post-views {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Post Actions */
.post-actions {
  display: flex;
  gap: var(--space-xs);
}

.btn-icon {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 0.5rem 1rem;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-icon:hover {
  background-color: var(--color-bg-card);
  border-color: var(--color-accent-gold);
  color: var(--color-accent-olive);
}

.btn-danger:hover {
  background-color: var(--color-error-bg);
  border-color: var(--color-error-border);
  color: var(--color-error);
}

/* Post Title */
.post-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  line-height: 1.3;
  color: var(--color-text-primary);
}

/* Post Content */
.post-content {
  font-family: var(--font-body);
  font-size: 1.05rem;
  line-height: 1.9;
  color: var(--color-text-secondary);
}

.post-content :deep(h1),
.post-content :deep(h2),
.post-content :deep(h3),
.post-content :deep(h4),
.post-content :deep(h5),
.post-content :deep(h6) {
  font-family: var(--font-display);
  color: var(--color-text-primary);
  margin-top: var(--space-xl);
  margin-bottom: var(--space-md);
  font-weight: 500;
}

.post-content :deep(h1) {
  font-size: 1.75rem;
}

.post-content :deep(h2) {
  font-size: 1.5rem;
}

.post-content :deep(h3) {
  font-size: 1.25rem;
}

.post-content :deep(p) {
  margin-bottom: var(--space-md);
}

.post-content :deep(a) {
  color: var(--color-accent-terracotta);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.post-content :deep(a:hover) {
  color: var(--color-accent-olive);
}

.post-content :deep(ul),
.post-content :deep(ol) {
  margin-bottom: var(--space-md);
  padding-left: 1.5rem;
}

.post-content :deep(li) {
  margin-bottom: var(--space-xs);
}

.post-content :deep(blockquote) {
  border-left: 3px solid var(--color-accent-gold);
  padding-left: var(--space-md);
  margin: var(--space-lg) 0;
  font-style: italic;
  color: var(--color-text-muted);
}

.post-content :deep(code) {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.9em;
  background-color: var(--color-bg-secondary);
  padding: 0.2rem 0.4rem;
  border-radius: var(--radius-sm);
  color: var(--color-accent-ink);
}

.post-content :deep(pre) {
  background-color: var(--color-bg-secondary);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  overflow-x: auto;
  margin: var(--space-md) 0;
}

.post-content :deep(pre code) {
  background-color: transparent;
  padding: 0;
}

.post-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  margin: var(--space-md) 0;
}

/* Comments Section */
.comments-section {
  margin-top: var(--space-2xl);
}

.comments-header {
  margin-bottom: var(--space-lg);
}

.comments-title {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--color-text-primary);
}

.comments-title svg {
  color: var(--color-accent-gold);
}

.comments-count {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-muted);
  background-color: var(--color-bg-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
}

.comment-form-wrapper {
  margin-bottom: var(--space-xl);
}

.login-prompt {
  padding: var(--space-lg);
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  text-align: center;
  font-family: var(--font-body);
  color: var(--color-text-secondary);
}

.login-link {
  color: var(--color-accent-terracotta);
  font-weight: 500;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}

/* Error State */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-2xl) 0;
  max-width: 400px;
  margin: 0 auto;
}

.error-icon {
  font-family: var(--font-display);
  font-size: 3rem;
  color: var(--color-error);
  margin-bottom: var(--space-md);
  opacity: 0.6;
}

.error-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: var(--space-xs);
}

.error-text {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-md);
}

/* Responsive */
@media (max-width: 768px) {
  .post-container {
    padding: var(--space-lg) 0;
  }
  
  .header-meta {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .post-actions {
    width: 100%;
  }
  
  .btn-icon {
    flex: 1;
    justify-content: center;
  }
  
  .post-title {
    font-size: 1.75rem;
  }
  
  .post-content {
    font-size: 1rem;
  }
}
</style>
