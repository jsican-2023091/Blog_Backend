import { Router } from "express"
import { commentSave, getAll, updateComment, deletedComment, getCommentsByPostId, getCommentById } from "./comments.controller.js"

const api = Router()

api.get('/getAll', getAll)

api.post('/save', commentSave)

api.put('/update/:id', updateComment)

api.delete('/deleted/:id', deletedComment)

api.get('/getCommentsById/:id', getCommentById)

api.get('/getCommentByPostId/:id', getCommentsByPostId)

export default api