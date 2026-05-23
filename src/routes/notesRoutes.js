import express from 'express';
import { celebrate } from 'celebrate';

import { getAllNotes } from '../controllers/notesController.js';
import { createNote } from '../controllers/notesController.js';
import { getNoteById } from '../controllers/notesController.js';
import { deleteNote } from '../controllers/notesController.js';
import { updateNote } from '../controllers/notesController.js';
import { 
  getAllNotesSchema, 
  createNoteSchema, 
  noteIdSchema, 
  updateNoteSchema 
} from '../validations/notesValidation.js';

const router = express.Router();

router.get('/notes', celebrate(getAllNotesSchema), getAllNotes);
router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);
router.post('/notes', celebrate(createNoteSchema), createNote);
router.delete('/notes/:noteId',celebrate(noteIdSchema), deleteNote);
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);


export default router;



