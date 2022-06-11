import * as noteModel from '../models/noteModel';

export async function welcomeGreeting() {
    return await noteModel.welcomeGreeting();
}

export async function getNoteByUserId(userId, type) {
    return await noteModel.getNoteByUserId(userId, type);
}

export async function createNote(note) {
    return await noteModel.createNote(note);
}

export async function deleteNote(noteId) {
    return await noteModel.deleteNote(noteId);
}

export async function updateNote(noteId, noteTitle, noteDescription) {
    return await noteModel.updateNote(noteId, noteTitle, noteDescription);
}

export async function toggleImportant(noteId) {
    return await noteModel.toggleImportant(noteId)
}

export async function removeFromImportant(noteId) {
    return await noteModel.removeFromImportant(noteId)
}

export async function toggleArichive(noteId) {
    return await noteModel.toggleArichive(noteId)
}

export async function shareNote(currentNoteId, shareUserId, senderName) {
    return await noteModel.shareNote(currentNoteId, shareUserId, senderName)
}

export async function getSharedNote(userId) {
    return await noteModel.getSharedNote(userId)
}

export async function getNotesSharedByMe(userId) {
    return await noteModel.getNotesSharedByMe(userId)
}