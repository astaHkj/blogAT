import { marked } from 'marked'
import mongolass, { Mongolass } from '../lib/mongo'
import { IComment } from '../types'

const Comment = mongolass.model('Comment', {
    author: { type: Mongolass.Types.ObjectId, required: true },
    content: { type: 'string', required: true },
    postId: { type: Mongolass.Types.ObjectId, required: true }
})

Comment.index({ postId: 1, _id: 1 }).exec()

Comment.plugin('contentToHtml', {
    afterFind: function (comments: any[]) {
        return comments.map(function (comment) {
            comment.content = marked.parse(comment.content)
            return comment
        })
    }
})

export const CommentModel = {
    create: function (comment: { author: string; postId: string; content: string }): Promise<any> {
        return Comment.create(comment).exec()
    },

    delCommentById: function (commentId: string): Promise<any> {
        return Comment.deleteOne({ _id: commentId }).exec()
    },

    delCommentsByPostId: function (postId: string): Promise<any> {
        return Comment.deleteMany({ postId }).exec()
    },

    getComments: function (postId: string): Promise<IComment[]> {
        return Comment
            .find({ postId })
            .populate({ path: 'author', model: 'User' })
            .sort({ _id: 1 })
            .addCreatedAt()
            .contentToHtml()
            .exec() as Promise<IComment[]>
    },

    getCommentsCount: function (postId: string): Promise<number> {
        return Comment.countDocuments({ postId }).exec()
    },

    getCommentById: function (commentId: string): Promise<IComment | null> {
        return Comment.findOne({ _id: commentId }).exec() as Promise<IComment | null>
    }
}

export default CommentModel
