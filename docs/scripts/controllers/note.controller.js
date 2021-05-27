import {noteService} from '../services/note-service.js'


document.querySelector('#sort-by-duedate-btn') ? document.querySelector('#sort-by-duedate-btn').addEventListener('click', () => noteService.sortByDueDate() ) : false
document.querySelector('#sort-by-create-date-btn') ? document.querySelector('#sort-by-create-date-btn').addEventListener('click', () => noteService.sortByCreatedDate() ) : false
document.querySelector('#sort-by-importance-btn') ? document.querySelector('#sort-by-importance-btn').addEventListener('click', () => noteService.sortByImportance() ) : false

document.querySelector('#cancel-note-creation-btn') ? document.querySelector('#cancel-note-creation-btn').addEventListener('click', () => noteService.cancelNoteCreation() ) : false


const formElement = document.querySelector('.form');

if (formElement) {
    // this logic is needed because otherwise the event listener would fire twice for input and label
    let rating = document.getElementById('rate').addEventListener('click', event => {
      const element = event.path[0];
      if (element.tagName === 'INPUT') {
        rating = element.value;
      }
    });
    formElement.onsubmit = async (e) => {
        console.log('inside')
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
    };
  }


//noteService.loadData();
noteService.renderNotes();