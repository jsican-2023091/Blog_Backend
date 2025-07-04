//Modelo de publicación
import { Schema, model } from "mongoose"

const postSchema = Schema(
    {
        title:{
            type: String,
            maxLength: [50, `Can't be overcome 50 characters`],
            required: [true, `Title is required`]
        },
        description:{
            type: String,
            maxLength: [100, `Can't be overcome 100 characters`],
            required: [true, `Content is required`]
        },
        course:{
            type: String,
            required: [true, `Course is required`]
        },
        publicationDate:{
            type: Date,
            required: [true, `Publication Date is required`]
        },
        repository: {
            type: String,
            required: [true, `Repository is required`]
        }
    }
)

export default model('Post', postSchema)