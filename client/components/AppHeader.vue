<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
      <NuxtLink to="/" class="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
        BlogAT
      </NuxtLink>
      
      <nav class="flex items-center gap-4">
        <template v-if="userStore.isLoggedIn">
          <NuxtLink to="/posts/create" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            写文章
          </NuxtLink>
          <div class="flex items-center gap-2">
            <span class="text-gray-700 text-sm">{{ userStore.user?.name }}</span>
            <button @click="handleLogout" class="text-gray-500 hover:text-red-600 transition-colors text-sm">
              退出
            </button>
          </div>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="text-gray-600 hover:text-gray-900 transition-colors text-sm">登录</NuxtLink>
          <NuxtLink to="/register" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            注册
          </NuxtLink>
        </template>
      </nav>
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
