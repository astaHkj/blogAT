import { marked } from 'marked'
import mongolass, { Mongolass } from '../lib/mongo'
import { IPost } from '../types'
import CommentModel from './comments'

const Post = mongolass.model('Post', {
    author: { type: Mongolass.Types.ObjectId, required: true },
    title: { type: 'string', required: true },
    content: { type: 'string', required: true },
    pv: { type: 'number', default: 0 }
})

Post.index({ author: 1, _id: -1 }).exec()

Post.plugin('contentToHtml', {
    afterFind: function (posts: any[]) {
        return posts.map(function (post) {
            post.content = marked.parse(post.content)
            return post
        })
    },
    afterFindOne: function (post: any) {
        if (post) {
            post.content = marked.parse(post.content)
        }
        return post
    }
})

export const PostModel = {
    create: function (post: { author: string; title: string; content: string }): Promise<any> {
        return Post.create(post).exec()
    },

    getPostById: function (postId: string): Promise<IPost | null> {
        return Post
            .findOne({ _id: postId })
            .populate({ path: 'author', model: 'User' })
            .addCreatedAt()
            .contentToHtml()
            .exec() as Promise<IPost | null>
    },

    getPosts: function (author?: string): Promise<IPost[]> {
        const query: any = {}
        if (author) {
            query.author = author
        }
        return Post
            .find(query)
            .populate({ path: 'author', model: 'User' })
            .sort({ _id: -1 })
            .addCreatedAt()
            .contentToHtml()
            .exec() as Promise<IPost[]>
    },

    getRawPostById: function (postId: string): Promise<IPost | null> {
        return Post
            .findOne({ _id: postId })
            .populate({ path: 'author', model: 'User' })
            .addCreatedAt()
            .exec() as Promise<IPost | null>
    },

    incPv: function (postId: string): Promise<any> {
        return Post
            .updateOne({ _id: postId }, { $inc: { pv: 1 } })
            .exec()
    },

    updatePostById: function (postId: string, data: { title?: string; content?: string }): Promise<any> {
        return Post
            .updateOne({ _id: postId }, { $set: data })
            .exec()
    },

    delPostById: async function (postId: string): Promise<any> {
        const res = await Post.deleteOne({ _id: postId }).exec()
        if (res.deletedCount > 0) {
            await CommentModel.delCommentsByPostId(postId)
        }
        return res
    }
}

export default PostModel
