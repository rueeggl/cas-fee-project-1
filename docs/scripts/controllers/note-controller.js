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
if (document.querySelector('#edit-note-save-btn')) {
  document.querySelector('#edit-note-save-btn').addEventListener('click', () => {
    noteService.cancelNoteCreation()
  })
}

/**
 * Create Form
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
  notesListElement ? notesListElement.innerHTML = "" : false;
  if (!noteService.notes.length) {
    notesListElement.innerHTML = `
    <div class="empty-inbox">
      <div>
        <img src="assets/emptyinbox.jpeg" alt="empty-inbox">
      </div>
      <p>You're done for the day! Enjoy!</p>
    </div>`;
  }
  else if (notesListElement) {
    notesListElement.innerHTML = createNotesHTML(noteService.notes);
    let checkboxElement = document.querySelectorAll('#checkbox')
    for (let i = 0; i < checkbox.length; i++) {
      checkboxElement[i].addEventListener('change', (e) => {
        let selectedCheckbox = document.getElementById(`${e.target.id}`)
        let isChecked = selectedCheckbox.checked
        if (isChecked) {
          selectedCheckbox.setAttribute('checked', 'checked')
          selectedCheckbox.closest('.todo-card').classList.add('finished')
          noteService.checkAsFinished(e.target.id, true);
        } else {
          selectedCheckbox.removeAttribute('checked')
          selectedCheckbox.closest('.todo-card').classList.remove('finished')
          noteService.checkAsFinished(e.target.id, false);
        }
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
              <input type="checkbox" name="checkbox" id="checkbox-${note.id}" ${note.finished === true ? 'checked' : ''}>
              <label for="checkbox-${note.id}">Finished</label>
            </div>
          </div>
          <div class="todo-content">
            <div class="todo-title">
              <p class="bold">${note.title}</p>
            <div id="rate">
              <input type="radio" id="star5" name="rate" value="5" ${note.importance === '5' ? 'checked' : ''} disabled/>
              <label for="star5" title="text"></label>
              <input type="radio" id="star4" name="rate" value="4" ${note.importance === '4' ? 'checked' : ''} disabled/>
              <label for="star4" title="text"></label>
              <input type="radio" id="star3" name="rate" value="3" ${note.importance === '3' ? 'checked' : ''} disabled/>
              <label for="star3" title="text"></label>
              <input type="radio" id="star2" name="rate" value="2" ${note.importance === '2' ? 'checked' : ''} disabled/>
              <label for="star2" title="text"></label>
              <input type="radio" id="star1" name="rate" value="1" ${note.importance === '1' ? 'checked' : ''} disabled/>
              <label for="star1" title="text"></label>
            </div>
            </div>
            <div class="todo-content-txtarea">
              <textarea class="textarea-readonly" readonly>${note.description}</textarea>
            </div>
          </div>
          <div class="todo-edit-btn">
            <a href="#">
              <i id="edit-btn-${note.id}" class="fas fa-edit fa-lg"></i>
            </a>
          </div>
        </div>`).join('');
}



function renderFinished() {
  let todoCard = document.querySelectorAll('.todo-card')
  for (let i = 0; i < todoCard.length; i++) {
    todoCard[i].classList.remove('finished')
  }
}

await noteService.loadData();
renderNotes();

// this needs to go after all the rendering has happened and stays at the end
document.querySelectorAll("[id^='edit-btn-']").forEach((item) => {
  item.addEventListener('click', async event => {
    let id = event.target.id.split('-')[2];
    await noteService.getNote(id);
  })
})
