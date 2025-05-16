//Controlador de publicación
import Post from './post.model.js'

export const postSave = async(req, res) => {
    try {
        let data = req.body
        let post = new Post(data)
        await post.save()

        return res.send(
            {
                success: true,
                message: `Post saved ${post.title}`
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
        const posts = await Post.find()

        if(posts.length === 0){
            return res.send(
                {
                    success: false,
                    message: 'Posts not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Post found',
                total: posts.length,
                posts
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

        const updatePost = await Post.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
        if(!updatePost) return res.status(404).send(
            {
                success: false,
                message: 'Post not found, not updated'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Post updated succesfully'
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
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params

        const deletedPost = await Post.findByIdAndDelete(id)

        if (!deletedPost) {
            return res.status(404).send( 
                {
                    success: false, 
                    message: 'Post not found'
                } 
            )
        }

        return res.status(200).send(
            { 
                success: true, 
                message: 'Post deleted successfully' 
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                 success: false, 
                 message: 'Error deleting post', 
                 error: err.message 
            }
        )
    }
}


export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id
    const post = await Post.findById(postId)
    if (!post) {
      return res.status(404).send({
        success: false,
        message: 'Post not found'
      })
    }
    return res.send({
      success: true,
      message: 'Post retrieved successfully',
      post
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({
      success: false,
      message: 'Error retrieving post by ID',
      err
    })
  }
}


export const getPostsByCourse = async (req, res) => {
  try {
    const courseQuery = req.params.course
    
    const posts = await Post.find({ course: courseQuery })

    if (posts.length === 0) {
      return res.status(404).send({
        success: false,
        message: `No posts found for course: ${courseQuery}`
      })
    }

    return res.send({
      success: true,
      message: `Posts retrieved successfully for course: ${courseQuery}`,
      total: posts.length,
      posts
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({
      success: false,
      message: 'Error retrieving posts by course',
      err
    })
  }
}
