export class NoteService {
    constructor() {
        this.notes = [
            {
              "id": "1",
              "title": "CAS FEE Selbststudium / Projekt Aufgabe erledigen",
              "description": "test",
              "importance": "3",
              "created": "2010-03-03",
              "duedate": "1990-05-03",
              "finished": false
            },
            {
              "id": "2",
              "title": "Einkaufen",
              "description": "Eier, Milch, Mehl, Brot, Butter",
              "importance": "2",
              "created": "1990-01-03",
              "duedate": "2000-04-12",
              "finished": false
            },
            {
              "id": "3",
              "title": "Für Ferien packen",
              "description": "Badetuch, Badehose, Sonnencreme, Sonnenbrille",
              "importance": "1",
              "created": "2000-02-03",
              "duedate": "2010-03-22",
              "finished": true
            }
          ]
        this.notesListElement = document.querySelector('.content-wrapper');

    }

    createNotesHTML(notes) {
        return notes.map(note => `
        <div class="todo-card">
                <div class="todo-due-date">
                  <div class="todo-title">
                    <p>Duedate: ${note.duedate}</p>
                  </div>
                  <div class="todo-title">
                    <p>Created: ${note.created}</p>
                  </div>
                  <div class="checkbox">
                    <input type="checkbox" name="checkbox" id="checkbox-${note.id}">
                    <label for="checkbox-${note.id}">Finished</label>
                  </div>
                </div>
                <div class="todo-content">
                  <div class="todo-title">
                    <p class="bold">${note.title}</p>
                  </div>
                  <div class="todo-content-txtarea">
                    <textarea class="textarea-readonly" readonly>${note.description}</textarea>
                  </div>
                </div>
                <div class="todo-edit-btn">
                  <a href="#">
                    <i class="fas fa-edit fa-lg" onclick="editNote(${note.id})"></i>
                  </a>
                </div>
              </div>`).join('');
    }

    // async loadData() {
    //    await fetch('https://60abe9f55a4de40017ccb2c6.mockapi.io/notes')
    //     .then(response => response.json())
    //     .then(json => json.forEach((note)=> this.notes.push(note)))
    //     .catch(err => console.log('Request failed', err))
    // }
    
    renderNotes() {
        this.notesListElement ? this.notesListElement.innerHTML = this.createNotesHTML(this.notes) : false
    }


    sortByDueDate() {
        const sortedByDueDate = [...this.notes].sort((a, b) => {
            const dateA = new Date(a.duedate);
            const dateB = new Date(b.duedate);
            return dateA - dateB;
        });
        this.notes = sortedByDueDate;
        this.renderNotes()
    }

    sortByCreatedDate() {
        const sortedByCreatedDate = [...this.notes].sort((a, b) => {
            const dateA = new Date(a.created);
            const dateB = new Date(b.created);
            return dateA - dateB;
        });
        this.notes = sortedByCreatedDate;
        this.renderNotes()
    }

    sortByImportance() {
        const sortedByImportance = [...this.notes].sort((a, b) => {
            const importanceA = a.importance;
            const importanceB = b.importance;
            return importanceA - importanceB;
        });
        this.notes = sortedByImportance;
        this.renderNotes()
    }

    editNote(id) {
        fetch(`https://60abe9f55a4de40017ccb2c6.mockapi.io/notes/${id}`)
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(alert('Ooops something went really wrong!'))
    }

    createNote(newNote) {
        fetch('https://60abe9f55a4de40017ccb2c6.mockapi.io/notes', {
            method: 'POST', 
            body: JSON.stringify(newNote), 
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
        })
    }

    cancelNoteCreation() {
        alert('Are you sure?');
        window.location.href = '/docs';
    }

}

export const noteService = new NoteService();