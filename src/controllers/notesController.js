import Note from "../models/note.js";
import createError from 'http-errors';

export const getAllNotes = async(req, res) => {
try{
const allResults = await Note.find();
res.status(200).json(allResults);

}

catch(error){res.status(500).json({message: error});};
};

export const createNote = async(req, res) =>{
const note = await Note.create(req.body);
res.status(201).json(note);

};

export const getNoteById = async (req, res, next) => {
try{
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
try{
const { noteId } = req.params;
const oneResult = await Note.findByIdAndDelete(noteId);
if (!oneResult) {
      return next(createError(404, 'Note not found'));
    }

    res.status(200).json(oneResult);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) =>{
const { noteId } = req.params;
const updated = await Note.findOneAndUpdate(
 { _id: noteId }, 
    req.body,
    { returnDocument: "after" },   
);
 if (!updated) {
	throw createError(404, 'Note not found');
  }

  res.status(200).json(updated);
};
