import { Router } from 'express'
import authRouter from './auth'
import postsRouter from './posts'
import commentsRouter from './comments'
import uploadRouter from './upload'

const router = Router()

router.use('/auth', authRouter)
router.use('/posts', postsRouter)
router.use('/comments', commentsRouter)
router.use('/upload', uploadRouter)

export default router
