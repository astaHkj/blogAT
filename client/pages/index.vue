<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-eyebrow">文学与思考</div>
        <h1 class="hero-title">
          <span class="title-line">记录</span>
          <span class="title-line accent">思想的</span>
          <span class="title-line">痕迹</span>
        </h1>
        <p class="hero-subtitle">
          在这个安静的角落，用文字编织故事，用思考点亮时光。
        </p>
        <div class="hero-stats" v-if="posts && posts.length > 0">
          <div class="stat-item">
            <span class="stat-number">{{ posts.length }}</span>
            <span class="stat-label">篇文章</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">{{ totalViews }}</span>
            <span class="stat-label">次阅读</span>
          </div>
        </div>
      </div>
      <div class="hero-decoration">
        <div class="deco-circle"></div>
        <div class="deco-line"></div>
      </div>
    </section>

    <div class="divider"></div>

    <!-- Posts Section -->
    <section class="posts-section">
      <div class="section-header">
        <h2 class="section-title">最新文章</h2>
        <NuxtLink v-if="userStore.isLoggedIn" to="/posts/create" class="btn-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          写文章
        </NuxtLink>
      </div>
      
      <!-- Loading State -->
      <div v-if="pending" class="loading-state">
        <div class="loading-spinner"></div>
        <p class="loading-text">正在加载文章...</p>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="empty-state">
        <div class="empty-icon">✕</div>
        <h3 class="empty-title">加载失败</h3>
        <p class="empty-text">请稍后重试</p>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="posts?.length === 0" class="empty-state">
        <div class="empty-icon">✎</div>
        <h3 class="empty-title">暂无文章</h3>
        <p class="empty-text">成为第一个在这里留下文字的人</p>
        <NuxtLink v-if="userStore.isLoggedIn" to="/posts/create" class="btn-primary mt-lg">
          发表第一篇文章
        </NuxtLink>
      </div>
      
      <!-- Posts Grid -->
      <div v-else class="posts-grid">
        <PostCard 
          v-for="(post, index) in posts" 
          :key="post._id" 
          :post="post"
          :style="{ animationDelay: `${index * 100}ms` }"
          class="animate-fade-in-up"
        />
      </div>
    </section>
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

// 计算总阅读量
const totalViews = computed(() => {
  if (!posts.value) return 0
  return posts.value.reduce((sum, post) => sum + (post.pv || 0), 0)
})
</script>

<style scoped>
.home-page {
  position: relative;
}

/* Hero Section */
.hero-section {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--space-2xl);
  align-items: center;
  padding: var(--space-2xl) 0;
}

.hero-content {
  max-width: 600px;
}

.hero-eyebrow {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-accent-terracotta);
  margin-bottom: var(--space-md);
}

.hero-title {
  font-family: var(--font-display);
  font-weight: 300;
  line-height: 1.2;
  margin-bottom: var(--space-lg);
}

.title-line {
  display: block;
  font-size: clamp(2.5rem, 5vw, 4rem);
}

.title-line.accent {
  color: var(--color-accent-terracotta);
  font-style: italic;
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin-bottom: var(--space-xl);
  max-width: 480px;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.stat-item {
  display: flex;
  align-items: baseline;
  gap: var(--space-xs);
}

.stat-number {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 500;
  color: var(--color-accent-ink);
}

.stat-label {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.stat-divider {
  width: 1px;
  height: 24px;
  background: linear-gradient(
    180deg,
    transparent,
    var(--color-accent-gold),
    transparent
  );
}

/* Hero Decoration */
.hero-decoration {
  position: relative;
  width: 200px;
  height: 200px;
}

.deco-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 160px;
  height: 160px;
  border: 1px solid var(--color-accent-gold);
  border-radius: 50%;
  opacity: 0.5;
}

.deco-circle::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  border: 1px solid var(--color-accent-terracotta);
  border-radius: 50%;
  opacity: 0.3;
}

.deco-line {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-accent-gold),
    transparent
  );
}

.deco-line::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(90deg);
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-accent-gold),
    transparent
  );
}

/* Posts Section */
.posts-section {
  padding: var(--space-xl) 0;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-xl);
}

.section-title {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 400;
  color: var(--color-text-primary);
}

/* Posts Grid */
.posts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-2xl) 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-accent-terracotta);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-2xl) 0;
}

.empty-icon {
  font-family: var(--font-display);
  font-size: 3rem;
  color: var(--color-accent-gold);
  margin-bottom: var(--space-md);
  opacity: 0.6;
}

.empty-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: var(--space-xs);
}

.empty-text {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-text-secondary);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
    text-align: center;
  }
  
  .hero-content {
    max-width: 100%;
  }
  
  .hero-stats {
    justify-content: center;
  }
  
  .hero-decoration {
    display: none;
  }
  
  .section-header {
    flex-direction: column;
    gap: var(--space-md);
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .title-line {
    font-size: 2rem;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: var(--space-md);
  }
  
  .stat-divider {
    width: 40px;
    height: 1px;
  }
}
</style>
