//Configuracion del servidor

'use strict'

import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"

import PostRoutes from '../src/post/post.routes.js'
import CommentRoutes from '../src/comments/comments.routes.js'

const configs = (app) => {
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    // app.use(limiter)
    app.use(morgan('dev'))
}

const routes = (app) => {
    app.use('/v1/post',PostRoutes)
    app.use('/v1/comment', CommentRoutes)
}

export const initServer = async() => {
    const app = express()
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}` )
    } catch (err) {
        console.error(
            'Server init failed',
            err
        )
    }
}