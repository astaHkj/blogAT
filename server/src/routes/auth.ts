import { Router, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config'
import { UserModel } from '../models'
import { authMiddleware } from '../middlewares/auth'
import { AuthRequest, ApiResponse, RegisterRequest, LoginRequest } from '../types'

const router = Router()

router.post('/register', async (req: Request<{}, ApiResponse, RegisterRequest>, res: Response<ApiResponse>) => {
    const { name, password, repassword, gender, bio } = req.body

    if (!name || name.length < 2 || name.length > 20) {
        return res.status(400).json({ success: false, error: '用户名需2-20个字符' })
    }
    if (!password || password.length < 6) {
        return res.status(400).json({ success: false, error: '密码至少6个字符' })
    }
    if (password !== repassword) {
        return res.status(400).json({ success: false, error: '两次密码不一致' })
    }
    if (!['m', 'f', 'x'].includes(gender)) {
        return res.status(400).json({ success: false, error: '性别无效' })
    }
    if (!bio || bio.length > 200) {
        return res.status(400).json({ success: false, error: '个人简介不超过200字符' })
    }

    try {
        const existingUser = await UserModel.getUserByName(name)
        if (existingUser) {
            return res.status(400).json({ success: false, error: '用户名已被占用' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const avatar = `/img/avatar_${gender}.png`

        await UserModel.create({
            name,
            password: hashedPassword,
            avatar,
            gender,
            bio
        })

        res.status(201).json({ success: true, message: '注册成功' })
    } catch (err) {
        res.status(500).json({ success: false, error: '注册失败' })
    }
})

router.post('/login', async (req: Request<{}, ApiResponse, LoginRequest>, res: Response<ApiResponse>) => {
    const { name, password } = req.body

    if (!name || !password) {
        return res.status(400).json({ success: false, error: '请填写用户名和密码' })
    }

    try {
        const user = await UserModel.getUserByName(name)
        if (!user) {
            return res.status(401).json({ success: false, error: '用户名或密码错误' })
        }

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return res.status(401).json({ success: false, error: '用户名或密码错误' })
        }

        const token = jwt.sign(
            { userId: user._id, name: user.name },
            config.jwt.secret,
            { expiresIn: config.jwt.expiresIn }
        )

        res.cookie(config.cookie.name, token, {
            maxAge: config.cookie.maxAge,
            httpOnly: config.cookie.httpOnly,
            secure: config.cookie.secure,
            sameSite: config.cookie.sameSite
        })

        res.json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                avatar: user.avatar,
                gender: user.gender,
                bio: user.bio
            }
        })
    } catch (err) {
        res.status(500).json({ success: false, error: '登录失败' })
    }
})

router.post('/logout', (_req: Request, res: Response<ApiResponse>) => {
    res.clearCookie(config.cookie.name)
    res.json({ success: true, message: '已退出登录' })
})

router.get('/me', authMiddleware, async (req: AuthRequest, res: Response<ApiResponse>) => {
    try {
        const user = await UserModel.getUserById(req.user!.userId)
        if (!user) {
            return res.status(404).json({ success: false, error: '用户不存在' })
        }
        res.json({ success: true, data: user })
    } catch (err) {
        res.status(500).json({ success: false, error: '获取用户信息失败' })
    }
})

export default router
