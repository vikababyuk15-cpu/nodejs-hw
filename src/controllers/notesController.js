import createError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res, next) => {
  try {
    const { tag, search, page, perPage } = req.query;
    const currentPage = parseInt(page, 10) || 1;
    const limitAmount = parseInt(perPage, 10) || 10;
    const skipAmount = (currentPage - 1) * limitAmount;
    
    // Фільтруємо запити саме за userId користувача
    const filter = { userId: req.user._id };

    if (tag) filter.tag = tag;
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filter.$or = [{ title: searchRegex }, { content: searchRegex }];
    }

    const [notes, totalNotes] = await Promise.all([
      Note.find(filter).skip(skipAmount).limit(limitAmount),
      Note.countDocuments(filter)
    ]);

    res.status(200).json({
      page: currentPage,
      perPage: limitAmount,
      totalNotes,
      totalPages: Math.ceil(totalNotes / limitAmount),
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    // Встановлюємо userId при створенні нотатки
    const note = await Note.create({ ...req.body, userId: req.user._id });
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    // Шукаємо нотатку за ID та userId
    const oneResult = await Note.findOne({ _id: noteId, userId: req.user._id });
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
    // Видаляємо лише якщо вона належить користувачу
    const deleteResult = await Note.findOneAndDelete({ _id: noteId, userId: req.user._id });
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
    // Оновлюємо лише якщо вона належить користувачу
    const updated = await Note.findOneAndUpdate(
      { _id: noteId, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return next(createError(404, 'Note not found'));
    }

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};