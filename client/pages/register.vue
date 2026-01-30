<template>
  <div class="max-w-md mx-auto">
    <h1 class="text-2xl font-bold text-gray-900 mb-6 text-center">注册</h1>
    
    <form @submit.prevent="handleRegister" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
        <input 
          v-model="form.name" 
          type="text" 
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="2-20个字符"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">密码</label>
        <input 
          v-model="form.password" 
          type="password" 
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="至少6个字符"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">确认密码</label>
        <input 
          v-model="form.repassword" 
          type="password" 
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="再次输入密码"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">性别</label>
        <select 
          v-model="form.gender" 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="m">男</option>
          <option value="f">女</option>
          <option value="x">保密</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">个人简介</label>
        <textarea 
          v-model="form.bio" 
          required
          rows="3"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="介绍一下自己（不超过200字）"
        ></textarea>
      </div>
      
      <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
      
      <button 
        type="submit" 
        :disabled="loading"
        class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {{ loading ? '注册中...' : '注册' }}
      </button>
    </form>
    
    <p class="mt-4 text-center text-sm text-gray-600">
      已有账号？
      <NuxtLink to="/login" class="text-blue-600 hover:underline">立即登录</NuxtLink>
    </p>
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
