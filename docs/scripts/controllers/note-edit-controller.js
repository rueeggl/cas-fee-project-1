import { noteService } from '../services/note-service.js';

/**
 * Click Event Listeners
 */
document.querySelector('#cancel-note-creation-btn').addEventListener('click', () => {
    console.log('clicked cancel')
})
document.querySelector('#save-note-creation-btn').addEventListener('click', () => {
    console.log('clicked save')
})

