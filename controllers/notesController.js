import {noteStore} from '../services/noteStore.js'

export class NotesController {

    async getNotes(req, res) {
        res.json((await noteStore.all() || []))
    };

    async createNote(req, res) {
        res.json(await noteStore.add(req.body.name));
    };

    async getNote(req, res) {
        res.json(await noteStore.get(req.params.id));
    };

    async deleteNote(req, res) {
        res.json(await noteStore.delete(req.params.id));
    };
}

export const notesController = new NotesController();