import { body } from "express-validator"
import { validateErrors } from "./validate.error.js"

export const publiValidation = [
    body('title', 'Title cannot be empty')
    .notEmpty(),
    body('description', 'Description cannot be empty')
    .notEmpty(),
    body('course', 'Course cannot be empty')
    .notEmpty(),
    body('publicationDate', 'The publication date cannot be emtpy')
    .notEmpty(),

    validateErrors
]


export const commentValidation = [
    body('content', 'Content cannot be empty')
    .notEmpty(),
    body('publication', 'Publication cannot be empty')
    .notEmpty(),

    validateErrors
]