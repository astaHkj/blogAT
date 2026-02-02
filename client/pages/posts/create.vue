<template>
  <div class="editor-page">
    <div class="editor-header">
      <div class="container-art-narrow">
        <div class="header-content">
          <div class="header-eyebrow">创作空间</div>
          <h1 class="header-title">发表文章</h1>
          <p class="header-subtitle">用文字记录你的思考与故事</p>
        </div>
      </div>
    </div>
    
    <div class="divider"></div>
    
    <div class="editor-content">
      <div class="container-art-narrow">
        <form @submit.prevent="handleSubmit" class="editor-form">
          <div class="form-group">
            <label for="create-title" class="form-label">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="4" y1="9" x2="20" y2="9"></line>
                <line x1="4" y1="15" x2="20" y2="15"></line>
                <line x1="10" y1="3" x2="8" y2="21"></line>
                <line x1="16" y1="3" x2="14" y2="21"></line>
              </svg>
              文章标题
            </label>
            <input 
              id="create-title"
              v-model="form.title" 
              type="text" 
              required
              maxlength="100"
              class="form-input form-input-lg"
              placeholder="给你的文章起个标题..."
            />
            <div class="input-hint" aria-live="polite">{{ form.title.length }}/100</div>
          </div>
          
          <div class="form-group">
            <label for="create-content" class="form-label">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              文章内容
              <span class="label-badge">支持 Markdown</span>
            </label>
            <textarea 
              id="create-content"
              v-model="form.content" 
              required
              rows="16"
              class="form-input form-textarea"
              placeholder="开始写作...&#10;&#10;支持 Markdown 语法：&#10;- 标题：# 一级标题&#10;- 列表：- 项目&#10;- 链接：[文字](url)&#10;- 代码：```代码```"
            ></textarea>
          </div>
          
          <div v-if="error" class="form-error" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {{ error }}
          </div>
          
          <div class="form-actions">
            <button 
              type="submit" 
              :disabled="loading"
              class="btn-primary btn-lg"
            >
              <span v-if="!loading">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                发表文章
              </span>
              <span v-else class="loading-dots" aria-label="发表中">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
            
            <NuxtLink to="/" class="btn-secondary btn-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              取消
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const router = useRouter()
const api = useApi()

const form = reactive({
  title: '',
  content: ''
})

const loading = ref(false)
const error = ref('')

async function handleSubmit() {
  loading.value = true
  error.value = ''
  
  const res = await api.post('/posts', form)
  
  if (res.success && res.data) {
    router.push(`/posts/${res.data._id}`)
  } else {
    error.value = res.error || '发表失败'
    loading.value = false
  }
}
</script>

<style scoped>
.editor-page {
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
}

.editor-header {
  padding: var(--space-2xl) 0 var(--space-xl);
  text-align: center;
}

.header-content {
  max-width: 600px;
  margin: 0 auto;
}

.header-eyebrow {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-accent-terracotta);
  margin-bottom: var(--space-sm);
}

.header-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 300;
  color: var(--color-text-primary);
  margin-bottom: var(--space-sm);
}

.header-subtitle {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-text-secondary);
}

.editor-content {
  padding-bottom: var(--space-2xl);
}

/* Form Styles */
.editor-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.form-label {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.form-label svg {
  color: var(--color-accent-gold);
}

.label-badge {
  margin-left: auto;
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--color-text-muted);
  background-color: var(--color-bg-secondary);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
}

.form-input {
  width: 100%;
  padding: 1rem;
  background-color: var(--color-bg-card);
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
  box-shadow: 0 0 0 4px rgba(196, 167, 125, 0.1);
}

.form-input::placeholder {
  color: var(--color-text-muted);
}

.form-input-lg {
  font-size: 1.25rem;
  font-family: var(--font-display);
  padding: 1.25rem;
}

.form-textarea {
  resize: vertical;
  min-height: 400px;
  line-height: 1.8;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.95rem;
}

.input-hint {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-text-muted);
  text-align: right;
}

/* Error - 使用 CSS 变量 */
.form-error {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  background-color: var(--color-error-bg);
  border: 1px solid var(--color-error-border);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-error);
}

/* Actions */
.form-actions {
  display: flex;
  gap: var(--space-md);
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-border);
}

.btn-lg {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 1rem 2rem;
  font-size: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .editor-header {
    padding: var(--space-xl) 0 var(--space-lg);
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn-lg {
    width: 100%;
    justify-content: center;
  }
  
  .form-textarea {
    min-height: 300px;
  }
}
</style>
