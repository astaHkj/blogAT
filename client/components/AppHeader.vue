<template>
  <header class="art-header">
    <div class="container-art">
      <div class="header-inner">
        <!-- Logo -->
        <NuxtLink to="/" class="logo">
          <span class="logo-text">BlogAT</span>
          <span class="logo-accent"></span>
        </NuxtLink>
        
        <!-- Navigation -->
        <nav class="header-nav">
          <template v-if="userStore.isLoggedIn">
            <NuxtLink to="/posts/create" class="btn-create">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>写文章</span>
            </NuxtLink>
            
            <div class="user-menu">
              <span class="user-name">{{ userStore.user?.name }}</span>
              <button @click="handleLogout" class="btn-logout" title="退出登录" aria-label="退出登录">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            </div>
          </template>
          
          <template v-else>
            <NuxtLink to="/login" class="nav-link">登录</NuxtLink>
            <span class="nav-divider"></span>
            <NuxtLink to="/register" class="btn-primary">注册</NuxtLink>
          </template>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const router = useRouter()

async function handleLogout() {
  await userStore.logout()
  router.push('/')
}
</script>

<style scoped>
.art-header {
  background-color: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background-color: rgba(247, 244, 240, 0.9);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  text-decoration: none;
  position: relative;
}

.logo-text {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 500;
  color: var(--color-accent-ink);
  letter-spacing: 0.15em;
  transition: color var(--transition-fast);
}

.logo:hover .logo-text {
  color: var(--color-accent-terracotta);
}

.logo-accent {
  width: 6px;
  height: 6px;
  background-color: var(--color-accent-terracotta);
  border-radius: 50%;
  margin-top: 8px;
}

/* Navigation */
.header-nav {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.nav-link {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: 0.5rem 0;
  position: relative;
  transition: color var(--transition-fast);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--color-accent-terracotta);
  transition: width var(--transition-normal);
}

.nav-link:hover {
  color: var(--color-text-primary);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-divider {
  width: 1px;
  height: 16px;
  background-color: var(--color-border);
}

/* Create Button */
.btn-create {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 0.625rem 1.25rem;
  background-color: transparent;
  border: 1px solid var(--color-accent-terracotta);
  color: var(--color-accent-terracotta);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all var(--transition-normal);
}

.btn-create:hover {
  background-color: var(--color-accent-terracotta);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(185, 125, 96, 0.25);
}

/* User Menu */
.user-menu {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.user-name {
  font-family: var(--font-display);
  font-size: 1rem;
  color: var(--color-text-primary);
  font-weight: 500;
}

.btn-logout {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-logout:hover {
  background-color: rgba(220, 38, 38, 0.05);
  border-color: rgba(220, 38, 38, 0.2);
  color: #dc2626;
}

/* Responsive */
@media (max-width: 640px) {
  .header-inner {
    height: 64px;
  }
  
  .logo-text {
    font-size: 1.5rem;
  }
  
  .btn-create span {
    display: none;
  }
  
  .btn-create {
    padding: 0.5rem;
  }
  
  .user-name {
    display: none;
  }
  
  .header-nav {
    gap: var(--space-sm);
  }
}
</style>
