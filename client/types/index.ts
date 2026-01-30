// 用户类型
export interface IUser {
  _id: string
  name: string
  avatar: string
  gender: 'm' | 'f' | 'x'
  bio: string
  created_at?: string
}

// 文章类型
export interface IPost {
  _id: string
  author: IUser
  title: string
  content: string
  pv: number
  created_at?: string
}

// 评论类型
export interface IComment {
  _id: string
  author: IUser
  postId: string
  content: string
  created_at?: string
}

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// 登录请求
export interface LoginRequest {
  name: string
  password: string
}

// 注册请求
export interface RegisterRequest {
  name: string
  password: string
  repassword: string
  gender: 'm' | 'f' | 'x'
  bio: string
}

// 创建文章请求
export interface CreatePostRequest {
  title: string
  content: string
}
