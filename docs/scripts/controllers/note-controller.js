import { noteService } from '../services/note-service.js';

/**
 * Click Event Listeners
 */
document.querySelector('#sort-by-create-date-btn').addEventListener('click', () => {
  noteService.sortByCreatedDate();
  renderNotes();
})
document.querySelector('#sort-by-importance-btn').addEventListener('click', () => {
  noteService.sortByImportance();
  renderNotes();
})
document.querySelector('#sort-by-duedate-btn').addEventListener('click', () => {
  noteService.sortByDueDate();
  renderNotes();
})
document.querySelector('#show-finished-btn').addEventListener('click', () => {
  renderFinished();
})

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
    let checkboxElement = document.querySelectorAll("[id^='checkbox-']")
    for (let i = 0; i < checkboxElement.length; i++) {
      checkboxElement[i].addEventListener('change', async (e) => {
        let selectedCheckbox = document.getElementById(`${e.target.id}`)
        let isChecked = selectedCheckbox.checked
        if (isChecked) {
          e.preventDefault();
          selectedCheckbox.closest('.todo-card').classList.add('finished')
          noteService.checkAsFinished(e.target.id.split('-')[1], true);
        } else {
          selectedCheckbox.closest('.todo-card').classList.remove('finished')
          noteService.checkAsFinished(e.target.id.split('-')[1], false);
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
              <input type="checkbox" name="checkbox" id="checkbox-${note._id}" ${note.finished ? 'checked' : ''}>
              <label for="checkbox-${note._id}">Finished</label>
            </div>
          </div>
          <div class="todo-content">
            <div class="todo-title">
              <p class="bold">${note.title}</p>
            <div id="rate">
              <input type="radio" id="star5" name="rate-${note._id}" value="5" ${note.importance === '5' ? 'checked' : ''} disabled/>
              <label for="star5" title="text"></label>
              <input type="radio" id="star4" name="rate-${note._id}" value="4" ${note.importance === '4' ? 'checked' : ''} disabled/>
              <label for="star4" title="text"></label>
              <input type="radio" id="star3" name="rate-${note._id}" value="3" ${note.importance === '3' ? 'checked' : ''} disabled/>
              <label for="star3" title="text"></label>
              <input type="radio" id="star2" name="rate-${note._id}" value="2" ${note.importance === '2' ? 'checked' : ''} disabled/>
              <label for="star2" title="text"></label>
              <input type="radio" id="star1" name="rate-${note._id}" value="1" ${note.importance === '1' ? 'checked' : ''} disabled/>
              <label for="star1" title="text"></label>
            </div>
            </div>
            <div class="todo-content-txtarea">
              <textarea class="textarea-readonly" readonly>${note.description}</textarea>
            </div>
          </div>
          <div class="todo-edit-btn">
            <a href="#">
              <i id="edit-btn-${note._id}" class="fas fa-edit fa-lg"></i>
            </a>
          </div>
          <div class="todo-delete-btn">
            <a href="#">
              <i id="delete-btn-${note._id}" class="fas fa-trash-alt fa-lg"></i>
            </a>
          </div>
        </div>`).join('');
}

function renderFinished() {
  console.log('clicked')
}

await noteService.loadData();
renderNotes();

// this needs to go after all the rendering has happened and stays at the end
document.querySelectorAll("[id^='edit-btn-']").forEach((item) => {
  item.addEventListener('click', async event => {
    let id = event.target.id.split('-')[2];

    await noteService.getNote(id);
    const urlParams = new URLSearchParams(window.location.search);
    Object.entries(noteService.note).forEach(([key, value]) => {
      urlParams.append(key, value)
    });
    window.location.href = 'edit.html?' + urlParams;
  })
})
document.querySelectorAll("[id^='delete-btn-']").forEach((item) => {
  item.addEventListener('click', async event => {
    let id = event.target.id.split('-')[2];
    await noteService.deleteNote(id);
  })
})
