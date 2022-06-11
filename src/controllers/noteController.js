import * as noteService from "../services/noteService";

export async function welcomeGreeting(req, res, next) {
    try {
        const data = await noteService.welcomeGreeting();
        res.json({ message: data })
    }
    catch (err) {
        next(err)
    }
}

export async function getNoteByUserId(req, res, next) {
    const userId = req.body.userId;
    const type = req.body.type
    try {
        const data = await noteService.getNoteByUserId(userId, type);
        data.sort((a, b) => a.dateCreated - b.dateCreated)
        res.json({ message: data })
    }
    catch (err) {
        next(err)
    }
}

export async function createNote(req, res, next) {
    let date = Date.now()
    const note = {
        title: req.body.title,
        briefContent: req.body.briefContent,
        dateCreated: date,
        status: "NOR",
        userId: req.body.userId
    }
    try {
        const data = await noteService.createNote(note);
        res.json({ message: data })
    }
    catch (err) {
        next(err)
    }
}

export async function deleteNote(req, res, next) {
    const noteId = req.params.noteId
    try {
        const data = await noteService.deleteNote(noteId);
        res.json({ message: data })
    }
    catch (err) {
        next(err)
    }
}

export async function updateNote(req, res, next) {
    const noteId = req.body.noteId
    const noteTitle = req.body.noteTitle
    const noteDescription = req.body.noteDescription
    try {
        const data = await noteService.updateNote(noteId, noteTitle, noteDescription);
        res.json({ message: data })
    }
    catch (err) {
        next(err)
    }
}

export async function toggleImportant(req, res, next) {
    const noteId = req.params.noteId
    try {
        const data = await noteService.toggleImportant(noteId)
        res.json({ message: data })
    }
    catch (err) {
        next(err)
    }
}

export async function removeFromImportant(req, res, next) {
    const noteId = req.params.noteId
    try {
        const data = await noteService.removeFromImportant(noteId)
        res.json({ message: data })
    }
    catch (err) {
        next(err)
    }
}

export async function toggleArichive(req, res, next) {
    const noteId = req.params.noteId
    try {
        const data = await noteService.toggleArichive(noteId)
        res.json({ message: data })
    }
    catch (err) {
        next(err)
    }
}

export async function shareNote(req, res, next) {
    const currentNoteId = req.body.currentNoteId
    const shareUserId = req.body.shareUserId
    const senderName = req.body.senderName
    try {
        const data = await noteService.shareNote(currentNoteId, shareUserId, senderName)
        res.json({ message: data })
    } catch (err) {
        next(err)
    }
}

export async function getSharedNote(req, res, next) {
    const userId = req.params.userId
    try {
        const data = await noteService.getSharedNote(userId)
        res.json({ message: data })
    }
    catch (err) {
        nect(err)
    }
}

export async function getNotesSharedByMe(req, res, next) {
    const userId = req.params.userId
    try {
        const data = await noteService.getNotesSharedByMe(userId)
        res.json({ message: data })
    } catch (err) {
        next(err)
    }
}