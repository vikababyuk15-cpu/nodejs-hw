import express from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js'; // Імпортуємо мідлвар
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
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

// Застосовуємо мідлвар для всіх маршрутів нижче
router.use(authenticate);

router.get('/', celebrate(getAllNotesSchema), ctrlWrapper(getAllNotes));
router.get('/:noteId', celebrate(noteIdSchema), ctrlWrapper(getNoteById));
router.post('/', celebrate(createNoteSchema), ctrlWrapper(createNote));
router.delete('/:noteId', celebrate(noteIdSchema), ctrlWrapper(deleteNote));
router.patch('/:noteId', celebrate(updateNoteSchema), ctrlWrapper(updateNote));

export default router;