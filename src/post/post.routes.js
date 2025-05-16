import { Router } from "express"
import { postSave, getAll, publicationUpdate, deletePost, getPostById, getPostsByCourse } from "./post.controller.js"
import { publiValidation } from "../../helpers/validators.js"

const api = Router() 

api.get('/getAll', getAll)

api.post('/save',[ publiValidation], postSave)

api.put('/update/:id', publicationUpdate)

api.delete('/deleted/:id', deletePost)

api.get('/getPostById/:id', getPostById )

api.get('/getCourse/:course', getPostsByCourse)
export default api