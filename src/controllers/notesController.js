import createError from 'http-errors';
import  {Note}  from '../models/note.js'; 


export const getAllNotes = async (req, res, next) => {
  try {
const { tag, search, page, perPage } = req.query;
const currentPage = parseInt(page) || 1;
const limitAmount = parseInt(perPage) || 10;
const skipAmount = (currentPage - 1) * limitAmount;
const filter = {};
if (tag) {
      filter.tag = tag;
    }
if (search) {
      filter.$text = { $search: search };
    }

    const notes = await Note.find(filter)
      .skip(skipAmount)
      .limit(limitAmount);

const totalNotes = await Note.countDocuments(filter);
    const totalPages = Math.ceil(totalNotes / limitAmount);

    res.status(200).json({
      page: currentPage,
      perPage: limitAmount,
      totalNotes: totalNotes,
      totalPages: totalPages,
      notes: notes,
    });
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