import { noteService } from '../services/note-service.js';

const noteEdited = {
    title: '',
    description: '',
    importance: '',
    duedate: '',
};

/**
 * Prefill Form from URL Params
 */
const urlParams = Object.fromEntries(new URLSearchParams(window.location.search));
document.querySelector('#title').setAttribute('value', urlParams.title);
document.querySelector('textarea').value = urlParams.description;
document.querySelector('#star' + `${urlParams.importance}`).setAttribute('checked', 'checked');
document.querySelector('#duedate').setAttribute('value', urlParams.duedate);

/**
 * Click Event Listeners
 */
document.querySelector('#cancel-note-creation-btn').addEventListener('click', () => {
    noteService.cancelRequest();
});
document.querySelector('#save-note-creation-btn').addEventListener('click', async () => {
    noteService.editNote(urlParams._id, noteEdited);
    await noteService.loadData();
    noteService.redirectToOverview();
});

/**
 * Change Event Listeners
 */
document.querySelector('#title').addEventListener('change', (e) => {
    noteEdited.title = e.target.value;
});
document.querySelector('#description').addEventListener('change', (e) => {
    noteEdited.description = e.target.value;
});
document.querySelector('#rate').addEventListener('change', (e) => {
    noteEdited.importance = e.target.value;
});
document.querySelector('#duedate').addEventListener('change', (e) => {
    noteEdited.duedate = e.target.value;
});
