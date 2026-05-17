import createError from 'http-errors';
import  {Note}  from '../models/note.js'; 


export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};


export const createNote = async (req, res, next) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (error) {
    next(error); 
  }
};


export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const oneResult = await Note.findById(noteId);
    if (!oneResult) {
      return next(createError(404, 'Note not found'));
    }
    res.status(200).json(oneResult);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const deleteResult = await Note.findByIdAndDelete(noteId);
    if (!deleteResult) {
      return next(createError(404, 'Note not found'));
    }
    res.status(200).json(deleteResult);
  } catch (error) {
    next(error);
  }
};


export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const updated = await Note.findOneAndUpdate(
      { _id: noteId },
      req.body,
      { returnDocument: 'after', runValidators: true } 
    );

    if (!updated) {
      return next(createError(404, 'Note not found'));
    }

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};