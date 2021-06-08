import { noteService } from '../services/note-service.js';

/**
 * Click Event Listeners
 */
document.querySelector('#cancel-note-creation-btn').addEventListener('click', () => {
    noteService.cancelRequest();
})

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
        const newNote = Object.fromEntries(formData);
        newNote.title = document.querySelector('#title').value
        newNote.description = document.querySelector('#description').value
        newNote.importance = rating
        newNote.created = moment().format().split('T')[0]
        newNote.duedate = document.querySelector('#duedate').value
        newNote.finished = false
        noteService.createNote(newNote);
        await noteService.loadData();
        noteService.redirectToOverview();
    };
}