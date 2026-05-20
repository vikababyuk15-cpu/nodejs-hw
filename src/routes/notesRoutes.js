import express from 'express';

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

router.get('/notes', getAllNotesSchema, getAllNotes);
router.get('/notes/:noteId', noteIdSchema, getNoteById);
router.post('/notes', createNoteSchema, createNote);
router.delete('/notes/:noteId', noteIdSchema, deleteNote);
router.patch('/notes/:noteId', updateNoteSchema, updateNote);


export default router;



