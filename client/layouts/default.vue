<template>
  <div class="art-layout">
    <AppHeader />
    <main class="art-main">
      <slot />
    </main>
    <footer class="art-footer">
      <div class="container-art">
        <div class="divider"></div>
        <div class="footer-content">
          <span class="footer-brand">BlogAT</span>
          <span class="footer-divider">·</span>
          <span class="text-sm text-secondary">艺术写作，诗意生活</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.art-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.art-main {
  flex: 1;
  padding: var(--space-xl) 0;
}

.art-footer {
  padding: var(--space-lg) 0 var(--space-xl);
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  font-family: var(--font-display);
}

.footer-brand {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--color-accent-terracotta);
  letter-spacing: 0.1em;
}

.footer-divider {
  color: var(--color-accent-gold);
}
</style>
