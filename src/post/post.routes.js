import { Router } from "express"
import { postSave, getAll, publicationUpdate, deletePost } from "./post.controller.js"
import { publiValidation } from "../../helpers/validators.js"

const api = Router() 

api.get('/getAll', getAll)

api.post('/save',[ publiValidation], postSave)

api.put('/update/:id', publicationUpdate)

api.delete('/deleted/:id', deletePost)

export default api