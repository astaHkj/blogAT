import { Request } from 'express'

// 用户接口
export interface IUser {
  _id: string
  name: string
  password: string
  avatar: string
  gender: 'm' | 'f' | 'x'
  bio: string
  created_at?: string
}

// 用户（不含密码）
export interface IUserPublic {
  _id: string
  name: string
  avatar: string
  gender: 'm' | 'f' | 'x'
  bio: string
  created_at?: string
}

// 文章接口
export interface IPost {
  _id: string
  author: string | IUserPublic
  title: string
  content: string
  pv: number
  created_at?: string
}

// 评论接口
export interface IComment {
  _id: string
  author: string | IUserPublic
  postId: string
  content: string
  created_at?: string
}

// JWT Payload
export interface IJwtPayload {
  userId: string
  name: string
}

// 扩展 Express Request
export interface AuthRequest extends Request {
  user?: IJwtPayload
}

// API 响应格式
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// 分页参数
export interface PaginationParams {
  page?: number
  limit?: number
}

// 注册请求
export interface RegisterRequest {
  name: string
  password: string
  repassword: string
  gender: 'm' | 'f' | 'x'
  bio: string
}

// 登录请求
export interface LoginRequest {
  name: string
  password: string
}

// 创建文章请求
export interface CreatePostRequest {
  title: string
  content: string
}

// 创建评论请求
export interface CreateCommentRequest {
  content: string
}
