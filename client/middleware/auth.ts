import type { IUser } from '~/types'

export default defineNuxtRouteMiddleware(async (to, from) => {
  // 只在客户端执行
  if (process.server) return
  
  const userStore = useUserStore()
  
  // 如果还没有获取用户信息，先获取
  if (!userStore.user) {
    await userStore.fetchUser()
  }
  
  // 需要登录的页面
  if (!userStore.isLoggedIn) {
    return navigateTo('/login')
  }
})
