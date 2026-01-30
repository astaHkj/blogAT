// 服务器配置
export const config = {
  // 服务端口
  port: parseInt(process.env.PORT || '4000'),
  
  // MongoDB 连接
  mongodb: process.env.MONGODB_URI || 'mongodb://localhost:27017/blogat',
  
  // JWT 配置
  jwt: {
    secret: process.env.JWT_SECRET || 'blogat-jwt-secret-key-change-in-production',
    expiresIn: '7d' // Token 有效期 7 天
  },
  
  // Cookie 配置
  cookie: {
    name: 'blogat_token',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 天（毫秒）
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const
  },
  
  // 前端地址（CORS 白名单）
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  
  // 上传文件配置
  upload: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  }
}

export default config
