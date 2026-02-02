<template>
  <div class="auth-page">
    <div class="auth-container">
      <!-- 左侧装饰 -->
      <div class="auth-visual">
        <div class="visual-content">
          <div class="visual-eyebrow">欢迎回来</div>
          <h2 class="visual-title">继续你的<br/>创作之旅</h2>
          <div class="visual-line"></div>
          <p class="visual-text">
            每一篇文字都是一次心灵的对话，<br/>
            每一次登录都是与自己的重逢。
          </p>
        </div>
        <div class="visual-decoration">
          <div class="deco-shape shape-1"></div>
          <div class="deco-shape shape-2"></div>
          <div class="deco-shape shape-3"></div>
        </div>
      </div>
      
      <!-- 右侧表单 -->
      <div class="auth-form-wrapper">
        <div class="form-card">
          <div class="form-header">
            <h1 class="form-title">登录</h1>
            <p class="form-subtitle">输入你的账号信息</p>
          </div>
          
          <form @submit.prevent="handleLogin" class="auth-form">
            <div class="form-group">
              <label for="login-name" class="form-label">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                用户名
              </label>
              <input 
                id="login-name"
                v-model="form.name" 
                type="text" 
                required
                class="form-input"
                placeholder="请输入用户名"
              />
            </div>
            
            <div class="form-group">
              <label for="login-password" class="form-label">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                密码
              </label>
              <input 
                id="login-password"
                v-model="form.password" 
                type="password" 
                required
                class="form-input"
                placeholder="请输入密码"
              />
            </div>
            
            <div v-if="error" class="form-error" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {{ error }}
            </div>
            
            <button 
              type="submit" 
              :disabled="loading"
              class="btn-submit"
            >
              <span v-if="!loading">登录</span>
              <span v-else class="loading-dots" aria-label="登录中">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </form>
          
          <div class="form-footer">
            <span class="footer-text">还没有账号？</span>
            <NuxtLink to="/register" class="footer-link">立即注册</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const router = useRouter()

const form = reactive({
  name: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

async function handleLogin() {
  loading.value = true
  error.value = ''
  
  const res = await userStore.login(form.name, form.password)
  
  if (res.success) {
    router.push('/')
  } else {
    error.value = res.error || '登录失败'
  }
  
  loading.value = false
}
</script>

<style scoped>
.auth-page {
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-xl) 0;
}

.auth-container {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: var(--space-2xl);
  max-width: 1000px;
  width: 100%;
  align-items: center;
}

/* 左侧视觉区域 */
.auth-visual {
  position: relative;
  padding: var(--space-xl);
}

.visual-content {
  position: relative;
  z-index: 2;
}

.visual-eyebrow {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-accent-terracotta);
  margin-bottom: var(--space-md);
}

.visual-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 300;
  line-height: 1.3;
  color: var(--color-text-primary);
  margin-bottom: var(--space-lg);
}

.visual-line {
  width: 60px;
  height: 2px;
  background: linear-gradient(
    90deg,
    var(--color-accent-terracotta),
    var(--color-accent-gold)
  );
  margin-bottom: var(--space-lg);
}

.visual-text {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
}

/* 装饰形状 */
.visual-decoration {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 300px;
  z-index: 1;
}

.deco-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
}

.shape-1 {
  width: 200px;
  height: 200px;
  background-color: var(--color-accent-terracotta);
  top: 20px;
  right: 40px;
}

.shape-2 {
  width: 120px;
  height: 120px;
  background-color: var(--color-accent-gold);
  top: 100px;
  right: 120px;
}

.shape-3 {
  width: 80px;
  height: 80px;
  background-color: var(--color-accent-olive);
  top: 180px;
  right: 60px;
}

/* 右侧表单区域 */
.auth-form-wrapper {
  display: flex;
  justify-content: center;
}

.form-card {
  background-color: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  width: 100%;
  box-shadow: 0 4px 20px var(--color-shadow);
}

.form-header {
  text-align: center;
  margin-bottom: var(--space-lg);
}

.form-title {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 400;
  color: var(--color-text-primary);
  margin-bottom: var(--space-xs);
}

.form-subtitle {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

/* 表单 */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.form-label {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.form-label svg {
  color: var(--color-accent-gold);
}

.form-input {
  width: 100%;
  padding: 0.875rem 1rem;
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-text-primary);
  transition: all var(--transition-fast);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-accent-gold);
  background-color: var(--color-bg-card);
  box-shadow: 0 0 0 3px rgba(196, 167, 125, 0.1);
}

.form-input::placeholder {
  color: var(--color-text-muted);
}

/* 错误提示 - 使用 CSS 变量 */
.form-error {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm);
  background-color: var(--color-error-bg);
  border: 1px solid var(--color-error-border);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--color-error);
}

/* 提交按钮 */
.btn-submit {
  width: 100%;
  padding: 1rem;
  background-color: var(--color-accent-terracotta);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);
  margin-top: var(--space-xs);
}

.btn-submit:hover:not(:disabled) {
  background-color: var(--color-accent-olive);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(185, 125, 96, 0.3);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* 表单底部 */
.form-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  margin-top: var(--space-lg);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--color-border);
}

.footer-text {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.footer-link {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-accent-terracotta);
  text-decoration: none;
  position: relative;
}

.footer-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--color-accent-terracotta);
  transition: width var(--transition-fast);
}

.footer-link:hover::after {
  width: 100%;
}

/* Responsive */
@media (max-width: 900px) {
  .auth-container {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }
  
  .auth-visual {
    text-align: center;
    padding: var(--space-md);
  }
  
  .visual-line {
    margin-left: auto;
    margin-right: auto;
  }
  
  .visual-decoration {
    display: none;
  }
}

@media (max-width: 480px) {
  .form-card {
    padding: var(--space-lg);
  }
  
  .auth-page {
    padding: var(--space-md) 0;
  }
}
</style>
