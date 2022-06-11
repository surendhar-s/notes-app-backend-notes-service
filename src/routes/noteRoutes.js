import Router from 'express'
import * as noteController from '../controllers/noteController'
import exjwt from 'express-jwt';

const jwtMW = exjwt({
    secret: 'something something something'
});

const router = Router()

router.get('/', noteController.welcomeGreeting)

router.post('/getNoteByUserId/', jwtMW, noteController.getNoteByUserId)

router.post('/createNote', jwtMW, noteController.createNote)

router.get('/deleteNote/:noteId', jwtMW, noteController.deleteNote)

router.post('/updateNote', jwtMW, noteController.updateNote)

router.get('/toggleImportant/:noteId', jwtMW, noteController.toggleImportant)

router.get('/toggleArichive/:noteId', jwtMW, noteController.toggleArichive)

router.post('/shareNote', jwtMW, noteController.shareNote)

router.get('/getSharedNote/:userId', jwtMW, noteController.getSharedNote)

router.get('/getNotesSharedByMe/:userId', jwtMW, noteController.getNotesSharedByMe)

// router.get('/removeFromImportant/:noteId', jwtMW, noteController.setToImportant)

export default router;