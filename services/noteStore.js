import Datastore from 'nedb-promise'

export class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({ filename: './data/notes.db', autoload: true });
    }

    async add(note) {
        return await this.db.insert(note);
    }

    async delete(id) {
        await this.db.remove({ _id: id });
        return await this.get(id);
    }

    async get(id) {
        return await this.db.findOne({ _id: id });
    }

    async getFinished() {
        return await this.db.find({ finished: true });
    }

    async all() {
        return await this.db.find({});
    }

    async put(id, payload) {
        return await this.db.update({ _id: id }, { $set: { title: payload.title, description: payload.description, importance: payload.importance, duedate: payload.duedate } });
    }

    async patch(id, payload) {
        return await this.db.update({ _id: id }, {$set: { finished: payload.finished }});
    }
}

export const noteStore = new NoteStore();