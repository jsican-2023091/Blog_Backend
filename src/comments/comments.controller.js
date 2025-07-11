import Comment from './commets.model.js'

export const commentSave = async(req, res) => {
    try {
        let data = req.body
        let comment = new Comment(data)
        await comment.save()

        return res.send(
            {
                success: true,
                message: `The comment was successfully saved`,
                date: comment
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

export const getAll = async(req, res) => {
    const { limit, skip} = req.query
    try {
        const comments = await Comment.find()
        .skip(skip)
        .limit(limit)
        .populate(
            {
                path: 'publication',
                select: 'title'
            }
        )

        if(comments.length === 0){
            return res.send(
                {
                    success: false,
                    message: 'Comment not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Comments found',
                total: comments.length,
                comments
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'Geeneral error',
                err
            }
        )
    }
}

export const updateComment = async(req, res) => {
    const id = req.params.id
    const data = req.body
    
    try {
        const updateComment = await Comment.findByIdAndUpdate(
            id,data, {new: true}
        )
        if(!updateComment) return res.status(404).send(
            {
                success: false,
                message: 'Comment not found, not updated'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Comment updated successfully',
                updateComment
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


export const deletedComment = async(req, res) => {
    try {
        const { id } = req.params
        const deletedComm = await Comment.findByIdAndDelete(id)
        if(!deletedComm)
            return res.status(404).send(
            {
                success: false,
                message: 'Comment not found'
            }
        )
            return res.send(
            {
                success: true,
                message: 'Comment deleted successfully'
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

export const getCommentsByPostId = async (req, res) => {
  try {
    const postId = req.params.id
    const comments = await Comment.find({ post: postId }).sort({ createdAt: -1 })

    if (comments.length === 0) {
      return res.status(404).send({
        success: false,
        message: 'No comments found for this post'
      })
    }

    return res.send({
      success: true,
      message: 'Comments retrieved successfully',
      total: comments.length,
      comments
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({
      success: false,
      message: 'Error comments by post ID',
      err
    })
  }
}

export const getCommentById = async (req, res) => {
  try {
    const commentId = req.params.id
    const comment = await Comment.findById(commentId)
    if (!comment) {
      return res.status(404).send({
        success: false,
        message: 'Comment not found'
      })
    }
    return res.send({
      success: true,
      message: 'Comment retrieved successfully',
      comment
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({
      success: false,
      message: 'Error retrieving comment by ID',
      err
    })
  }
}


