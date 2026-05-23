import createError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res, next) => {
  try {
    const { tag, search, page, perPage } = req.query;
    const currentPage = parseInt(page, 10) || 1;
    const limitAmount = parseInt(perPage, 10) || 10;
    const skipAmount = (currentPage - 1) * limitAmount;

    // 1. Створюємо базовий запит Mongoose (Query Object) для пошуку та для підрахунку
    const notesQuery = Note.find();
    const countQuery = Note.countDocuments();

    // 2. Будуємо ланцюжок запиту для фільтрації за тегом через методи Mongoose
    if (tag) {
      notesQuery.where('tag').equals(tag);
      countQuery.where('tag').equals(tag);
    }

    // 3. Будуємо ланцюжок для регістронечутливого пошуку в title або content
    if (search) {
      const searchRegex = new RegExp(search, 'i'); // 'i' означає регістронечутливість
      
      // Використовуємо метод .or() як вимагає ментор
      notesQuery.or([{ title: searchRegex }, { content: searchRegex }]);
      countQuery.or([{ title: searchRegex }, { content: searchRegex }]);
    }

    // Додаємо пагінацію до основного запиту нотаток
    notesQuery.skip(skipAmount).limit(limitAmount);

    // 4. Виконуємо обидва запити ОДНОЧАСНО за допомогою Promise.all
    const [notes, totalNotes] = await Promise.all([notesQuery, countQuery]);

    const totalPages = Math.ceil(totalNotes / limitAmount);

    res.status(200).json({
      page: currentPage,
      perPage: limitAmount,
      totalNotes,
      totalPages,
      notes,
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