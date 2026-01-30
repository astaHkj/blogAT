import { Router, Request, Response } from 'express'
import { PostModel } from '../models'
import { authMiddleware, optionalAuth } from '../middlewares/auth'
import { AuthRequest, ApiResponse, CreatePostRequest, IPost } from '../types'

const router = Router()

// 辅助函数：从文章数据中移除作者密码
function sanitizePost(post: any): any {
    if (!post) return post
    const sanitized = { ...post }
    if (sanitized.author && typeof sanitized.author === 'object') {
        const { password, ...authorWithoutPassword } = sanitized.author
        sanitized.author = authorWithoutPassword
    }
    return sanitized
}

function sanitizePosts(posts: any[]): any[] {
    return posts.map(sanitizePost)
}

router.get('/', optionalAuth, async (req: AuthRequest, res: Response<ApiResponse>) => {
    try {
        const author = req.query.author as string | undefined
        const posts = await PostModel.getPosts(author)
        res.json({ success: true, data: sanitizePosts(posts) })
    } catch (err) {
        res.status(500).json({ success: false, error: '获取文章列表失败' })
    }
})

router.get('/:postId', optionalAuth, async (req: Request, res: Response<ApiResponse>) => {
    const { postId } = req.params

    try {
        const post = await PostModel.getPostById(postId)
        if (!post) {
            return res.status(404).json({ success: false, error: '文章不存在' })
        }
        await PostModel.incPv(postId)
        res.json({ success: true, data: sanitizePost(post) })
    } catch (err) {
        res.status(500).json({ success: false, error: '获取文章失败' })
    }
})

router.get('/:postId/raw', authMiddleware, async (req: AuthRequest, res: Response<ApiResponse>) => {
    const { postId } = req.params

    try {
        const post = await PostModel.getRawPostById(postId)
        if (!post) {
            return res.status(404).json({ success: false, error: '文章不存在' })
        }

        const authorId = typeof post.author === 'object' ? post.author._id : post.author
        if (authorId.toString() !== req.user!.userId) {
            return res.status(403).json({ success: false, error: '无权限编辑此文章' })
        }

        res.json({ success: true, data: sanitizePost(post) })
    } catch (err) {
        res.status(500).json({ success: false, error: '获取文章失败' })
    }
})

router.post('/', authMiddleware, async (req: AuthRequest, res: Response<ApiResponse>) => {
    const { title, content } = req.body as CreatePostRequest

    if (!title || title.length > 100) {
        return res.status(400).json({ success: false, error: '标题不能为空且不超过100字符' })
    }
    if (!content) {
        return res.status(400).json({ success: false, error: '内容不能为空' })
    }

    try {
        const result = await PostModel.create({
            author: req.user!.userId,
            title,
            content
        })
        res.status(201).json({ success: true, data: { _id: result._id }, message: '发表成功' })
    } catch (err) {
        res.status(500).json({ success: false, error: '发表文章失败' })
    }
})

router.put('/:postId', authMiddleware, async (req: AuthRequest, res: Response<ApiResponse>) => {
    const { postId } = req.params
    const { title, content } = req.body as CreatePostRequest

    if (!title || title.length > 100) {
        return res.status(400).json({ success: false, error: '标题不能为空且不超过100字符' })
    }
    if (!content) {
        return res.status(400).json({ success: false, error: '内容不能为空' })
    }

    try {
        const post = await PostModel.getRawPostById(postId)
        if (!post) {
            return res.status(404).json({ success: false, error: '文章不存在' })
        }

        const authorId = typeof post.author === 'object' ? post.author._id : post.author
        if (authorId.toString() !== req.user!.userId) {
            return res.status(403).json({ success: false, error: '无权限编辑此文章' })
        }

        await PostModel.updatePostById(postId, { title, content })
        res.json({ success: true, message: '更新成功' })
    } catch (err) {
        res.status(500).json({ success: false, error: '更新文章失败' })
    }
})

router.delete('/:postId', authMiddleware, async (req: AuthRequest, res: Response<ApiResponse>) => {
    const { postId } = req.params

    try {
        const post = await PostModel.getRawPostById(postId)
        if (!post) {
            return res.status(404).json({ success: false, error: '文章不存在' })
        }

        const authorId = typeof post.author === 'object' ? post.author._id : post.author
        if (authorId.toString() !== req.user!.userId) {
            return res.status(403).json({ success: false, error: '无权限删除此文章' })
        }

        await PostModel.delPostById(postId)
        res.json({ success: true, message: '删除成功' })
    } catch (err) {
        res.status(500).json({ success: false, error: '删除文章失败' })
    }
})

export default router
