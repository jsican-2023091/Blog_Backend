import { Router } from "express"
import { commentSave, getAll, updateComment, deletedComment, getCommentsByPostId } from "./comments.controller.js"

const api = Router()

api.get('/getAll', getAll)

api.post('/save', commentSave)

api.put('/update/:id', updateComment)

api.delete('/deleted/:id', deletedComment)

api.get('/getCommentsByPostId', getCommentsByPostId)

export default api