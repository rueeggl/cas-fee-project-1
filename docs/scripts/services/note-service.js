export class NoteService {
    constructor() {
        this.notes = [];
        this.note = {};
    }

    async loadData() {
      const response = await(fetch('https://60abe9f55a4de40017ccb2c6.mockapi.io/notes'));
      const data = await response.json();
      data.forEach((note) => this.notes.push(note))
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
      fetch(`https://60abe9f55a4de40017ccb2c6.mockapi.io/notes/${id}`, {
            method: 'PUT',
            body: JSON.stringify({finished: checked}),
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
        });
    }

    async getNote(id) {
        const response = await (fetch(`https://60abe9f55a4de40017ccb2c6.mockapi.io/notes/${id}`));
        this.note = await response.json();
        window.location.href = 'edit.html'
    }
    
    createNote(newNote) {
        fetch('https://60abe9f55a4de40017ccb2c6.mockapi.io/notes', {
            method: 'POST',
            body: JSON.stringify(newNote),
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
        });
    }

    cancelNoteCreation() {
        alert('Are you sure?');
        this.redirectToOverview();
    }

    redirectToOverview() {
      window.location.href = '/docs';
    }
}

export const noteService = new NoteService();
