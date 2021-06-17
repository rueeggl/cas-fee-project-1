import {noteStore} from '../services/noteStore.js';

export class NotesController {
    async getNotes(req, res) {
        res.json((await noteStore.all()));
    }

    async getFinishedNotes(req, res) {
        res.json((await noteStore.getFinished()));
    }

    async createNote(req, res) {
        res.json(await noteStore.add(req.body));
    }

    async getNote(req, res) {
        res.json(await noteStore.get(req.params.id));
    }

    async deleteNote(req, res) {
        res.json(await noteStore.delete(req.params.id));
    }

    async updateNote(req, res) {
        res.json(await noteStore.put(req.params.id, req.body));
    }

    async partialUpdateNote(req, res) {
        res.json(await noteStore.patch(req.params.id, req.body));
    }
}

export const notesController = new NotesController();
