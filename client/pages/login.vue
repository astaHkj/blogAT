<template>
  <div class="max-w-md mx-auto">
    <h1 class="text-2xl font-bold text-gray-900 mb-6 text-center">登录</h1>
    
    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
        <input 
          v-model="form.name" 
          type="text" 
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="请输入用户名"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">密码</label>
        <input 
          v-model="form.password" 
          type="password" 
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="请输入密码"
        />
      </div>
      
      <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
      
      <button 
        type="submit" 
        :disabled="loading"
        class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {{ loading ? '登录中...' : '登录' }}
      </button>
    </form>
    
    <p class="mt-4 text-center text-sm text-gray-600">
      还没有账号？
      <NuxtLink to="/register" class="text-blue-600 hover:underline">立即注册</NuxtLink>
    </p>
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
