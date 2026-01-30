import { defineStore } from 'pinia'
import type { IUser, ApiResponse } from '~/types'

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser | null>(null)
  const isLoggedIn = computed(() => !!user.value)
  const api = useApi()

  const fetchUser = async () => {
    const res = await api.get<IUser>('/auth/me')
    if (res.success && res.data) {
      user.value = res.data
    }
    return res
  }

  const login = async (name: string, password: string) => {
    const res = await api.post<IUser>('/auth/login', { name, password })
    if (res.success && res.data) {
      user.value = res.data
    }
    return res
  }

  const register = async (data: {
    name: string
    password: string
    repassword: string
    gender: string
    bio: string
  }) => {
    return api.post('/auth/register', data)
  }

  const logout = async () => {
    const res = await api.post('/auth/logout')
    if (res.success) {
      user.value = null
    }
    return res
  }

  return { user, isLoggedIn, fetchUser, login, register, logout }
})
