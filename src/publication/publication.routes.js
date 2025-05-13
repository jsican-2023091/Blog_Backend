import { Router } from "express"
import { publicationSave, getAll, publicationUpdate, deletePubli } from "./publication.controller.js"
import { publiValidation } from "../../helpers/validators.js"

const api = Router() 

api.get('/getAll', getAll)

api.post('/save',[ publiValidation], publicationSave)

api.put('/update/:id', publicationUpdate)

api.delete('/deleted/:id', deletePubli)

export default api