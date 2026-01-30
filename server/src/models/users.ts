import mongolass from '../lib/mongo'
import { IUser, IUserPublic } from '../types'

const User = mongolass.model('User', {
  name: { type: 'string', required: true },
  password: { type: 'string', required: true },
  avatar: { type: 'string', required: true },
  gender: { type: 'string', enum: ['m', 'f', 'x'], default: 'x' },
  bio: { type: 'string', required: true }
})

// 创建唯一索引
User.index({ name: 1 }, { unique: true }).exec()

export const UserModel = {
  // 创建用户
  create: function (user: Omit<IUser, '_id' | 'created_at'>): Promise<any> {
    return User.create(user).exec()
  },

  // 通过用户名获取用户（包含密码，用于登录验证）
  getUserByName: function (name: string): Promise<IUser | null> {
    return User
      .findOne({ name })
      .addCreatedAt()
      .exec() as Promise<IUser | null>
  },

  // 通过用户 ID 获取用户（不含密码）
  getUserById: function (userId: string): Promise<IUserPublic | null> {
    return User
      .findOne({ _id: userId })
      .select({ password: 0 })
      .addCreatedAt()
      .exec() as Promise<IUserPublic | null>
  }
}

export default UserModel
