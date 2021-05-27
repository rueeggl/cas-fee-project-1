export class NoteService {
    constructor() {
        this.notes = [];
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


    renderNotes() {
        if (this.notesListElement) {
            this.notesListElement.innerHTML = this.createNotesHTML(this.notes);
        }
    }

    loadData() {
        const request = new XMLHttpRequest();
        request.open('get', 'https://60abe9f55a4de40017ccb2c6.mockapi.io/notes');
        request.onreadystatechange = function (e) {
            if (request.readyState === XMLHttpRequest.DONE) {
                const status = request.status;
                if (status === 0 || (status >= 200 && status < 400)) {
                    this.notes = JSON.parse(e.target.response);
                    console.log(this.notes)
                } else {
                    alert('Ooops something went really wrong!');
                }
            }
        };
        request.send();
    }


    sortByDueDate() {
        const sortedByDueDate = [...notes].sort((a, b) => {
            const dateA = new Date(a.duedate);
            const dateB = new Date(b.duedate);
            return dateA - dateB;
        });
        this.notes = sortedByDueDate;
    }

    sortByCreatedDate() {
        const sortedByCreatedDate = [...notes].sort((a, b) => {
            const dateA = new Date(a.created);
            const dateB = new Date(b.created);
            return dateA - dateB;
        });
        this.notes = sortedByCreatedDate;
    }

    sortByImportance() {
        const sortedByImportance = [...notes].sort((a, b) => {
            const importanceA = a.importance;
            const importanceB = b.importance;
            return importanceA - importanceB;
        });
        this.notes = sortedByImportance;
    }

    editNote(id) {
        const request = new XMLHttpRequest();
        request.open('get', `https://60abe9f55a4de40017ccb2c6.mockapi.io/notes/${id}`);
        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
                const status = request.status;
                if (status === 0 || (status >= 200 && status < 400)) {
                    console.log(request.responseText);
                } else {
                    alert('Ooops something went really wrong!');
                }
            }
        };
        request.send();
    }

    createNote() {
        const request = new XMLHttpRequest();
        request.open('POST', 'https://60abe9f55a4de40017ccb2c6.mockapi.io/notes');
        request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        request.send(JSON.stringify(newNote));
    }

    cancelNoteCreation() {
        alert('Are you sure?');
        window.location.href = '/docs';
    }

    initialize() {
        this.loadData();
        this.renderNotes();
    }



}





/**
 * Create New Note
 */
//  const formElement = document.querySelector('.form');

//  if (formElement) {
//    // this logic is needed because otherwise the event listener would fire twice for input and label
//    let rating = document.getElementById('rate').addEventListener('click', event => {
//      const element = event.path[0];
//      if (element.tagName === 'INPUT') {
//        rating = element.value;
//      }
//    });
//    formElement.onsubmit = async (e) => {
//      e.preventDefault();
//      // initialize formData
//      const formData = new FormData();
//      formData.append('title', document.querySelector('#title').value);
//      formData.append('description', document.querySelector('#description').value);
//      formData.append('importance', rating);
//      formData.append('created', moment().format().split('T')[0]);
//      formData.append('duedate', document.querySelector('#duedate').value);
//      formData.append('finished', false);

//      const newNote = Object.fromEntries(formData);

// function createNote() {
//   const request = new XMLHttpRequest();
//   request.open('POST', 'https://60abe9f55a4de40017ccb2c6.mockapi.io/notes');
//   request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
//   request.send(JSON.stringify(newNote));
// }
// postNote();
//    };
//  }


new NoteService().initialize();