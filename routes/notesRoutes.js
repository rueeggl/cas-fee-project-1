import express from 'express';
const router = express.Router();
import {notesController} from '../controllers/notesController.js';

router.get("/", notesController.getNotes.bind(notesController));
router.post("/", notesController.createNote.bind(notesController));
router.get("/:id/", notesController.getNote.bind(notesController));
router.delete("/:id/", notesController.deleteNote.bind(notesController));

export const notesRoutes = router;