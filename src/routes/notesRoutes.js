import express from 'express';

import { getAllNotes } from '../controllers/notesController.js';
import { createNote } from '../controllers/notesController.js';
import { getNoteById } from '../controllers/notesController.js';
import { deleteNote } from '../controllers/notesController.js';
import { updateNote } from '../controllers/notesController.js';

const router = express.Router();

router.get('/notes', getAllNotes);
router.get('/notes/:noteId', getNoteById);
router.post('/notes', createNote);
router.delete('/notes/:noteId', deleteNote);
router.patch('/notes', updateNote);


export default router;



