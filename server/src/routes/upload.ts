import { Router, Request, Response } from 'express'
import multer from 'multer'
import path from 'path'
import { authMiddleware } from '../middlewares/auth'
import config from '../config'
import { ApiResponse } from '../types'

const router = Router()

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../uploads'),
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname)
        cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`)
    }
})

const upload = multer({
    storage,
    limits: { fileSize: config.upload.maxSize },
    fileFilter: (_req, file, cb) => {
        if (config.upload.allowedTypes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('不支持的文件类型'))
        }
    }
})

router.post('/', authMiddleware, upload.single('file'), (req: Request, res: Response<ApiResponse>) => {
    if (!req.file) {
        return res.status(400).json({ success: false, error: '请选择文件' })
    }

    const url = `/uploads/${req.file.filename}`
    res.json({ success: true, data: { url } })
})

export default router
