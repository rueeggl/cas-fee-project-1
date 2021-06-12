import { httpService } from './http-service.js'

export class NoteService {
    constructor() {
        this.notes = [];
        this.note = {};
    }

    async loadData() {
        const response = await (httpService.ajax("GET", "/", undefined));
        const data = await response.json();
        data.forEach((note) => this.notes.push(note));
    }

    sortByDueDate() {
        const sortedByDueDate = [...this.notes].sort((a, b) => {
            const dateA = new Date(a.duedate);
            const dateB = new Date(b.duedate);
            return dateA - dateB;
        });
        this.notes = sortedByDueDate;
    }

    sortByCreatedDate() {
        const sortedByCreatedDate = [...this.notes].sort((a, b) => {
            const dateA = new Date(a.created);
            const dateB = new Date(b.created);
            return dateA - dateB;
        });
        this.notes = sortedByCreatedDate;
    }

    sortByImportance() {
        const sortedByImportance = [...this.notes].sort((a, b) => {
            const importanceA = a.importance;
            const importanceB = b.importance;
            return importanceB - importanceA;
        });
        this.notes = sortedByImportance;
    }

    checkAsFinished(id, checked) {
        fetch(`/notes/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ finished: checked }),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        });
    }

    async getNote(id) {
        const response = await (fetch(`/notes/${id}`));
        this.note = await response.json();
    }

    async deleteNote(id) {
        const alert = confirm('Are you sure you want to delete the note?');
        if (alert === true) {
            fetch(`/notes/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json());
        } else {
            this.redirectToOverview();
        }
    }

    createNote(newNote) {
        fetch('/notes/', {
            method: 'POST',
            body: JSON.stringify(newNote),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        });
    }

    editNote(id, payload) {
        fetch(`/notes/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        });
    }

    cancelRequest() {
        const alert = confirm('Cancel note creation?');
        if (alert === true) {
            this.redirectToOverview();
        } else {
            window.location.href = '/docs/create.html';
        }
    }

    redirectToOverview() {
        window.location.href = '/docs';
    }
}

export const noteService = new NoteService();
