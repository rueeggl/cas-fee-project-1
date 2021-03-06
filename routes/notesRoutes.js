import express from 'express';
import {notesController} from '../controllers/notesController.js';

const router = express.Router();

router.get('/', notesController.getNotes.bind(notesController));
router.post('/', notesController.createNote.bind(notesController));
router.get('/:id/', notesController.getNote.bind(notesController));
router.put('/:id/', notesController.updateNote.bind(notesController));
router.patch('/:id/', notesController.partialUpdateNote.bind(notesController));
router.delete('/:id/', notesController.deleteNote.bind(notesController));

export const notesRoutes = router;
