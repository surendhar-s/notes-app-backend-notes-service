import noteSchema from "../schemas/noteSchema";
import { getSocket } from '../utils/socket'

export async function welcomeGreeting() {
    return "Greetings from notes service"
}

export async function getNoteByUserId(userId, type) {
    if (type === "Notes") {
        const data1 = await noteSchema.find({ userId: userId, status: "NOR" })
        const data2 = await noteSchema.find({ userId: userId, status: "IMP" })
        return data1.concat(data2)
    }
    else if (type === "Favourites") {
        return await noteSchema.find({ userId: userId, status: "IMP" })
    }
    else if (type === "Archived") {
        return await noteSchema.find({ userId: userId, status: "ACR" })
    }
}

export async function createNote(note) {
    const data = await noteSchema.create(note);
    if (data) {
        return {
            success: true,
            noteDetails: data,
            err: null
        }
    }
    return {
        success: false,
        noteDetails: null,
        message: "Error creating notes"
    }
}

export async function deleteNote(noteId) {
    await noteSchema.deleteOne({ _id: noteId })
    return {
        success: true,
        message: "Note deleted successfully",
        err: null
    }
}

export async function updateNote(noteId, noteTitle, noteDescription) {
    const data = await noteSchema.findOne({ _id: noteId }, function (err, doc) {
        doc.title = noteTitle;
        doc.briefContent = noteDescription;
        doc.save();
    });
    if (data) {
        return {
            success: true,
            err: null,
            note: data
        }
    }
    else {
        return {
            success: false,
            err: "Error while updating notes",
            note: null
        }
    }
}

export async function toggleImportant(noteId) {
    const data = await noteSchema.findOne({ _id: noteId })
    if (data.status === "IMP") {
        await noteSchema.updateOne({ _id: noteId }, { $set: { status: "NOR" } })
        return {
            success: true,
            err: null,
            message: "Note is marked as important"
        }
    }
    else if (data.status === "NOR") {
        await noteSchema.updateOne({ _id: noteId }, { $set: { status: "IMP" } })
        return {
            success: true,
            err: null,
            message: "Note is marked as normal"
        }
    }
}

export async function removeFromImportant(noteId) {
    const data = await noteSchema.updateOne({ _id: noteId }, { $set: { important: "NOR" } })
    if (data.important === false) {
        return {
            success: true,
            err: null,
            message: "Note is marked as not-important"
        }
    }
    else {
        return {
            success: false,
            err: "Error while set the note as not-important",
            message: null
        }
    }
}

export async function toggleArichive(noteId) {
    const data = await noteSchema.findOne({ _id: noteId })
    if (data.status === "ACR") {
        await noteSchema.updateOne({ _id: noteId }, { $set: { status: "NOR" } })
        return {
            success: true,
            err: null,
            message: "Note is marked as archive"
        }
    }
    else {
        await noteSchema.updateOne({ _id: noteId }, { $set: { status: "ACR" } })
        return {
            success: true,
            err: null,
            message: "Note is marked as not an archive"
        }

    }
}

export async function shareNote(currentNoteId, shareUserId, senderName) {
    const data = await noteSchema.findOne({ _id: currentNoteId })
    const sharedNote = data.sharedNote
    if (data.sharedNote.indexOf(shareUserId) !== -1) {
        return {
            success: false,
            err: "This note is already shared with this user",
        }
    }
    else {
        sharedNote.push(shareUserId)
        await noteSchema.updateOne({ _id: currentNoteId }, { $set: { sharedNote: sharedNote } })
        const data1 = await noteSchema.findOne({ _id: currentNoteId })
        getSocket().emit(shareUserId, { data: data1, senderName: senderName })
        return {
            success: true,
            err: null,
        }
    }
}

export async function getSharedNote(userId) {
    const data = await noteSchema.find({ sharedNote: userId })
    if (data) {
        return {
            success: true,
            data: data,
            err: null
        }
    }
    else {
        return {
            success: false,
            data: null,
            err: "No user shared a note with you"
        }
    }
}

export async function getNotesSharedByMe(userId) {
    const data = await getNoteByUserId(userId, "Notes")
    if (data) {
        let dataArr = []
        data.map((note) => {
            if (note.sharedNote.length >= 1)
                dataArr.push(note)
        })
        return {
            success: true,
            data: dataArr,
            err: null
        }

    }
    else {
        return {
            success: false,
            data: null,
            err: "No notes shared"
        }
    }
}