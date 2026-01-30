import { Router, Response } from 'express'
import { CommentModel, PostModel } from '../models'
import { authMiddleware } from '../middlewares/auth'
import { AuthRequest, ApiResponse, CreateCommentRequest } from '../types'

const router = Router()

// 辅助函数：从评论数据中移除作者密码
function sanitizeComment(comment: any): any {
    if (!comment) return comment
    const sanitized = { ...comment }
    if (sanitized.author && typeof sanitized.author === 'object') {
        const { password, ...authorWithoutPassword } = sanitized.author
        sanitized.author = authorWithoutPassword
    }
    return sanitized
}

function sanitizeComments(comments: any[]): any[] {
    return comments.map(sanitizeComment)
}

router.get('/:postId', async (req: AuthRequest, res: Response<ApiResponse>) => {
    const { postId } = req.params

    try {
        const comments = await CommentModel.getComments(postId)
        res.json({ success: true, data: sanitizeComments(comments) })
    } catch (err) {
        res.status(500).json({ success: false, error: '获取评论失败' })
    }
})

router.post('/:postId', authMiddleware, async (req: AuthRequest, res: Response<ApiResponse>) => {
    const { postId } = req.params
    const { content } = req.body as CreateCommentRequest

    if (!content || content.length > 500) {
        return res.status(400).json({ success: false, error: '评论内容不能为空且不超过500字符' })
    }

    try {
        const post = await PostModel.getPostById(postId)
        if (!post) {
            return res.status(404).json({ success: false, error: '文章不存在' })
        }

        const result = await CommentModel.create({
            author: req.user!.userId,
            postId,
            content
        })
        res.status(201).json({ success: true, data: { _id: result._id }, message: '评论成功' })
    } catch (err) {
        res.status(500).json({ success: false, error: '评论失败' })
    }
})

router.delete('/:commentId', authMiddleware, async (req: AuthRequest, res: Response<ApiResponse>) => {
    const { commentId } = req.params

    try {
        const comment = await CommentModel.getCommentById(commentId)
        if (!comment) {
            return res.status(404).json({ success: false, error: '评论不存在' })
        }

        const authorId = typeof comment.author === 'object' ? comment.author._id : comment.author
        if (authorId.toString() !== req.user!.userId) {
            return res.status(403).json({ success: false, error: '无权限删除此评论' })
        }

        await CommentModel.delCommentById(commentId)
        res.json({ success: true, message: '删除成功' })
    } catch (err) {
        res.status(500).json({ success: false, error: '删除评论失败' })
    }
})

export default router
