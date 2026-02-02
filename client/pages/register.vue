<template>
  <div class="auth-page">
    <div class="auth-container">
      <!-- 左侧装饰 -->
      <div class="auth-visual">
        <div class="visual-content">
          <div class="visual-eyebrow">开启旅程</div>
          <h2 class="visual-title">加入<br/>创作社区</h2>
          <div class="visual-line"></div>
          <p class="visual-text">
            每个人都是独一无二的创作者，<br/>
            在这里，你的声音值得被听见。
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
            <h1 class="form-title">注册账号</h1>
            <p class="form-subtitle">填写你的信息加入我们</p>
          </div>
          
          <form @submit.prevent="handleRegister" class="auth-form">
            <div class="form-group">
              <label for="name" class="form-label">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                用户名
              </label>
              <input 
                id="name"
                v-model="form.name" 
                type="text" 
                required
                class="form-input"
                placeholder="2-20个字符"
              />
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="password" class="form-label">
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  密码
                </label>
                <input 
                  id="password"
                  v-model="form.password" 
                  type="password" 
                  required
                  class="form-input"
                  placeholder="至少6个字符"
                />
              </div>
              
              <div class="form-group">
                <label for="repassword" class="form-label">
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  确认密码
                </label>
                <input 
                  id="repassword"
                  v-model="form.repassword" 
                  type="password" 
                  required
                  class="form-input"
                  placeholder="再次输入密码"
                />
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="gender" class="form-label">
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                  性别
                </label>
                <select id="gender" v-model="form.gender" class="form-input form-select">
                  <option value="m">男</option>
                  <option value="f">女</option>
                  <option value="x">保密</option>
                </select>
              </div>
            </div>
            
            <div class="form-group">
              <label for="bio" class="form-label">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="21" y1="10" x2="3" y2="10"></line>
                  <line x1="21" y1="6" x2="3" y2="6"></line>
                  <line x1="21" y1="14" x2="3" y2="14"></line>
                  <line x1="21" y1="18" x2="3" y2="18"></line>
                </svg>
                个人简介
              </label>
              <textarea 
                id="bio"
                v-model="form.bio" 
                required
                rows="3"
                class="form-input"
                placeholder="介绍一下自己（不超过200字）"
              ></textarea>
            </div>
            
            <div v-if="error" class="form-error" role="alert">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
              <span v-if="!loading">创建账号</span>
              <span v-else class="loading-dots" aria-label="正在加载">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </form>
          
          <div class="form-footer">
            <span class="footer-text">已有账号？</span>
            <NuxtLink to="/login" class="footer-link">立即登录</NuxtLink>
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
  password: '',
  repassword: '',
  gender: 'x',
  bio: ''
})

const loading = ref(false)
const error = ref('')

async function handleRegister() {
  if (form.password !== form.repassword) {
    error.value = '两次密码不一致'
    return
  }
  
  loading.value = true
  error.value = ''
  
  const res = await userStore.register({
    name: form.name,
    password: form.password,
    repassword: form.repassword,
    gender: form.gender,
    bio: form.bio
  })
  
  if (res.success) {
    // 注册成功后自动登录
    const loginRes = await userStore.login(form.name, form.password)
    if (loginRes.success) {
      router.push('/')
    } else {
      router.push('/login')
    }
  } else {
    error.value = res.error || '注册失败'
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
  grid-template-columns: 1fr 460px;
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

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
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
  border-radius: var(--radius-sm);
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

.form-select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239B9590' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
}

/* 错误提示 */
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
  
  .form-row {
    grid-template-columns: 1fr;
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
