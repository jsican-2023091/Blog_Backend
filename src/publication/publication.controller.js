//Controlador de publicación
import Publication from './publication.model.js'

export const publicationSave = async(req, res) => {
    try {
        let data = req.body
        let publication = new Publication(data)
        await publication.save()

        return res.send(
            {
                success: true,
                message: `Publication saved ${publication.title}`
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                message: 'Genereal error',
                err
            }
        )
    }
}

export const getAll = async(req, res) => {
    try {
        const publications = await Publication.find()

        if(publications.length === 0){
            return res.send(
                {
                    success: false,
                    message: 'Publications not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Publications found',
                total: publications.length,
                publications
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}
export const publicationUpdate = async(req, res) => {
    try {
        const id = req.params.id
        const data = req.body

        const updatePubli = await Publication.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
        if(!updatePubli) return res.status(404).send(
            {
                success: false,
                message: 'Publication not found, not updated'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Publication updated succesfully'
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}


// Eliminar una publicación
export const deletePubli = async (req, res) => {
    try {
        const { id } = req.params

        const deletedPost = await Publication.findByIdAndDelete(id)

        if (!deletedPost) {
            return res.status(404).json({ success: false, message: 'Post not found' })
        }

        return res.status(200).json({ success: true, message: 'Post deleted successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Error deleting post', error: err.message })
    }
}

