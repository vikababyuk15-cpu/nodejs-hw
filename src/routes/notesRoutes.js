import express from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import { 
  getAllNotes, 
  createNote, 
  getNoteById, 
  deleteNote, 
  updateNote 
} from '../controllers/notesController.js';
import { 
  getAllNotesSchema, 
  createNoteSchema, 
  noteIdSchema, 
  updateNoteSchema 
} from '../validations/notesValidation.js';

const router = express.Router();

// Застосовуємо мідлвар для захисту всіх маршрутів нижче
router.use(authenticate);

// Маршрути викликають контролери напряму
router.get('/', celebrate(getAllNotesSchema), getAllNotes);
router.get('/:noteId', celebrate(noteIdSchema), getNoteById);
router.post('/', celebrate(createNoteSchema), createNote);
router.delete('/:noteId', celebrate(noteIdSchema), deleteNote);
router.patch('/:noteId', celebrate(updateNoteSchema), updateNote);

export default router;
