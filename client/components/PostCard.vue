<template>
  <article class="post-card" @click="navigateToPost">
    <!-- 装饰线条 -->
    <div class="card-accent"></div>
    
    <div class="card-content">
      <!-- 元信息 -->
      <div class="post-meta">
        <span class="author">{{ post.author.name }}</span>
        <span class="meta-divider"></span>
        <time class="date">{{ formatDate(post.created_at) }}</time>
        <span class="meta-divider"></span>
        <span class="views">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          {{ post.pv }}
        </span>
      </div>
      
      <!-- 标题 -->
      <h2 class="post-title">{{ post.title }}</h2>
      
      <!-- 内容预览 -->
      <div class="post-excerpt" v-html="excerpt"></div>
      
      <!-- 阅读更多 -->
      <div class="post-footer">
        <NuxtLink :to="`/posts/${post._id}`" class="read-more" @click.stop>
          <span>阅读全文</span>
          <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </article>
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

// 格式化日期
function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 提取纯文本并截取
const excerpt = computed(() => {
  // 移除HTML标签
  const text = props.post.content.replace(/<[^>]*>/g, '')
  // 截取前150字符
  return text.slice(0, 150) + (text.length > 150 ? '...' : '')
})
</script>

<style scoped>
.post-card {
  position: relative;
  background-color: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  cursor: pointer;
  transition: all var(--transition-normal);
  overflow: hidden;
}

.post-card:hover {
  box-shadow: 0 12px 32px var(--color-shadow-hover);
  transform: translateY(-3px);
  border-color: rgba(196, 167, 125, 0.3);
}

/* 装饰线条 */
.card-accent {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(
    180deg,
    var(--color-accent-terracotta),
    var(--color-accent-gold)
  );
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.post-card:hover .card-accent {
  opacity: 1;
}

.card-content {
  padding-left: var(--space-md);
}

/* 元信息 */
.post-meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.author {
  font-family: var(--font-display);
  font-weight: 500;
  color: var(--color-accent-terracotta);
}

.meta-divider {
  width: 4px;
  height: 4px;
  background-color: var(--color-accent-gold);
  border-radius: 50%;
}

.views {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 标题 */
.post-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: var(--space-sm);
  line-height: 1.4;
  transition: color var(--transition-fast);
}

.post-card:hover .post-title {
  color: var(--color-accent-olive);
}

/* 内容预览 */
.post-excerpt {
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-md);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 阅读更多 */
.post-footer {
  display: flex;
  justify-content: flex-end;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-accent-terracotta);
  text-decoration: none;
  padding: 0.5rem 0;
  position: relative;
  transition: all var(--transition-fast);
}

.read-more::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--color-accent-terracotta);
  transition: width var(--transition-normal);
}

.read-more:hover {
  color: var(--color-accent-olive);
  gap: var(--space-sm);
}

.read-more:hover::after {
  width: 100%;
  background-color: var(--color-accent-olive);
}

.arrow {
  transition: transform var(--transition-fast);
}

.read-more:hover .arrow {
  transform: translateX(3px);
}

/* Responsive */
@media (max-width: 640px) {
  .post-card {
    padding: var(--space-md);
  }
  
  .card-content {
    padding-left: var(--space-sm);
  }
  
  .post-title {
    font-size: 1.25rem;
  }
  
  .post-meta {
    flex-wrap: wrap;
  }
}
</style>
