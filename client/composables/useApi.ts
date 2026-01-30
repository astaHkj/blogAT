import type { ApiResponse } from '~/types'

export const useApi = () => {
  const config = useRuntimeConfig()
  
  const apiBase = config.public.apiBase
  
  const get = async <T>(url: string): Promise<ApiResponse<T>> => {
    try {
      const data = await $fetch<ApiResponse<T>>(`${apiBase}${url}`, {
        credentials: 'include'
      })
      return data
    } catch (error: any) {
      return { success: false, error: error.message || '请求失败' }
    }
  }
  
  const post = async <T>(url: string, body: any): Promise<ApiResponse<T>> => {
    try {
      const data = await $fetch<ApiResponse<T>>(`${apiBase}${url}`, {
        method: 'POST',
        body,
        credentials: 'include'
      })
      return data
    } catch (error: any) {
      return { success: false, error: error.message || '请求失败' }
    }
  }
  
  const put = async <T>(url: string, body: any): Promise<ApiResponse<T>> => {
    try {
      const data = await $fetch<ApiResponse<T>>(`${apiBase}${url}`, {
        method: 'PUT',
        body,
        credentials: 'include'
      })
      return data
    } catch (error: any) {
      return { success: false, error: error.message || '请求失败' }
    }
  }
  
  const del = async <T>(url: string): Promise<ApiResponse<T>> => {
    try {
      const data = await $fetch<ApiResponse<T>>(`${apiBase}${url}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      return data
    } catch (error: any) {
      return { success: false, error: error.message || '请求失败' }
    }
  }
  
  return { get, post, put, delete: del }
}
