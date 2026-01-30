import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import { AuthRequest, IJwtPayload, ApiResponse } from '../types'

export const authMiddleware = (req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) => {
    const token = req.cookies[config.cookie.name]

    if (!token) {
        return res.status(401).json({ success: false, error: '请先登录' })
    }

    try {
        const decoded = jwt.verify(token, config.jwt.secret) as IJwtPayload
        req.user = decoded
        next()
    } catch {
        res.clearCookie(config.cookie.name)
        return res.status(401).json({ success: false, error: '登录已过期，请重新登录' })
    }
}

export const optionalAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies[config.cookie.name]

    if (token) {
        try {
            const decoded = jwt.verify(token, config.jwt.secret) as IJwtPayload
            req.user = decoded
        } catch { }
    }
    next()
}

export default authMiddleware
