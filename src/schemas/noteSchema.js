import mongoose from 'mongoose'
import * as noteService from '../services/noteService'
import Joi from 'joi'
import validate from '../utils/validate'

const noteSchema = mongoose.Schema({
    title: { type: String, required: true },
    briefContent: { type: String, required: true },
    dateCreated: { type: Date, required: true },
    status: { type: String, required: true },
    sharedNote: { type: [String], required: false },
    // important: { type: Boolean, required: true },
    userId: { type: String, required: true, createIndexs: { unique: false } }
})

const schemaValidation = {
    title: Joi.string().required(),
    briefContent: Joi.string().required(),
    dateCreated: Joi.date().required(),
    status: Joi.string().required(),
    sharedNote: Joi.array(),
    // import: Joi.boolean().required(),
    userId: Joi.string().required()
}

async function noteValidator(req, res, next) {
    try {
        await validate(req.body, schemaValidation)
        return next()
    }
    catch (err) {
        return next(err)
    }
}

function findNote(req, res, next) {
    return noteService
        .getUser(req.params.email)
        .then(() => next())
        .catch(err => next(err));
}
export { noteValidator, findNote }
export default mongoose.model('noteDB', noteSchema)