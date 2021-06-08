import { noteService } from '../services/note-service.js';

/**
 * Click Event Listeners
 */
document.querySelector('#cancel-note-creation-btn').addEventListener('click', () => {
    noteService.cancelRequest();
})
document.querySelector('#save-note-creation-btn').addEventListener('click', () => {
    console.log('clicked save')
})

const urlParams = Object.fromEntries(new URLSearchParams(window.location.search));
document.querySelector('#title').setAttribute('value', urlParams.title);
document.querySelector("textarea").value = urlParams.description;
document.querySelector("#star" + `${urlParams.importance}`).setAttribute('checked', 'checked')
document.querySelector("#duedate").setAttribute('value', urlParams.duedate)
