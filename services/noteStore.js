import Datastore from 'nedb-promise'

export class Note {
    constructor(title, description, importance, duedate) {
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.duedate = duedate;
        this.created = new Date();
        this.finished = this.finished;
    }
}

export class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/orders.db', autoload: true});
    }

    async add(title, description, importance, duedate) {
        let note = new Note(title, description, importance, duedate);
        return await this.db.insert(note);
    }

    async delete(id) {
        await this.db.update({_id: id}, {$set: {"state": "DELETED"}});
        return await this.get(id);
    }

    async get(id) {
        return await this.db.findOne({_id: id});
    }

    async all() {
        console.log('here')
        return await this.db.find({});
    }
}

export const noteStore = new NoteStore();