import { Schema, model } from "mongoose"

const commentSchema = Schema(
    {
        name:{
            type: String,
            maxLength: [12, `Can't be overcome 12 characters`],
            required: [true, `Name is required`]
        },
        content:{
            type: String,
            maxLength: [100, `Can't be overcome 100 characters`],
            required: [true, `Content is required`]
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Publication',
            required: [true, 'Publication is required']
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
)

export default model('Comment', commentSchema)