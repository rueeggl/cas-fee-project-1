import { noteService } from '../services/note-service.js';

/**
 * Click Event Listeners
 */
if (document.querySelector('#sort-by-create-date-btn')) {
  document.querySelector('#sort-by-create-date-btn').addEventListener('click', () => {
    noteService.sortByCreatedDate();
    renderNotes();
  })
}
if (document.querySelector('#sort-by-importance-btn')) {
  document.querySelector('#sort-by-importance-btn').addEventListener('click', () => {
    noteService.sortByImportance();
    renderNotes();
  })
}
if (document.querySelector('#sort-by-duedate-btn')) {
  document.querySelector('#sort-by-duedate-btn').addEventListener('click', () => {
    noteService.sortByDueDate();
    renderNotes();
  })
}
if (document.querySelector('#cancel-note-creation-btn')) {
  document.querySelector('#cancel-note-creation-btn').addEventListener('click', () => {
    noteService.cancelNoteCreation();
  })
}
if (document.querySelector('#show-finished-btn')) {
  document.querySelector('#show-finished-btn').addEventListener('click', () => {
    renderFinished();
  })
}


/**
 * Form
 */
const formElement = document.querySelector('.form');
if (formElement) {
  // this logic is needed because otherwise the eventlistener would fire twice for input and label
  let rating = document.getElementById('rate').addEventListener('click', event => {
    const element = event.path[0];
    if (element.tagName === 'INPUT') {
      rating = element.value;
    }
  });
  formElement.onsubmit = async (e) => {
    e.preventDefault();
    // initialize formData
    const formData = new FormData();
    formData.append('title', document.querySelector('#title').value);
    formData.append('description', document.querySelector('#description').value);
    formData.append('importance', rating);
    formData.append('created', moment().format().split('T')[0]);
    formData.append('duedate', document.querySelector('#duedate').value);
    formData.append('finished', false);
    const newNote = Object.fromEntries(formData);
    noteService.createNote(newNote);
    await noteService.loadData();
    noteService.redirectToOverview();
  };
}

/**
 * Note Template
 */
function renderNotes() {
  const notesListElement = document.querySelector('.content-wrapper');
  notesListElement.innerHTML = "";
  if (!noteService.notes.length) {
    notesListElement.innerHTML = `
    <div class="empty-inbox">
      <div>
        <img src="assets/emptyinbox.jpeg" alt="empty-inbox">
      </div>
      <p>You're done for the day! Enjoy!</p>
    </div>`;
  }
  else {
    notesListElement.innerHTML = createNotesHTML(noteService.notes);
    let checkboxElement = document.querySelectorAll('#checkbox')
    for (let i = 0; i < checkbox.length; i++) {
      checkboxElement[i].addEventListener('change', (e) => {
        let selectedCheckbox = document.getElementById(`${e.target.id}`)
        selectedCheckbox.setAttribute('checked', 'checked')
        selectedCheckbox.closest('.todo-card').classList.add('finished')
        noteService.checkAsFinished(e.target.id);
      });
  }
  }
}

function createNotesHTML(notes) {
  return notes.map(note => `
  <div class="todo-card">
          <div class="todo-due-date">
            <div class="todo-title">
              <p>Duedate: ${note.duedate}</p>
            </div>
            <div class="todo-title">
              <p>Created: ${note.created}</p>
            </div>
            <div class="checkbox" id='checkbox'>
              <input type="checkbox" name="checkbox" id="${note.id}">
              <label for="checkbox-${note.id}">Finished</label>
            </div>
          </div>
          <div class="todo-content">
            <div class="todo-title">
              <p class="bold">${note.title}</p>
              <p class="bold">${note.importance}</p>
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

function renderFinished() {
  let todoCard = document.querySelectorAll('.todo-card')
  for(let i=0; i<todoCard.length; i++) {
    todoCard[i].classList.remove('finished')
  }
}

await noteService.loadData();
renderNotes();