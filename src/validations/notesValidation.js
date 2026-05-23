import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

export const getAllNotesSchema = {
[Segments.QUERY]: Joi.object().keys({
page: Joi.number().integer().min(1).default(1),
    
    perPage: Joi.number().integer().min(5).max(20).default(10),
    
    tag: Joi.string().valid(...TAGS),
    
    search: Joi.string().allow(''),


})
};

export const createNoteSchema = {
[Segments.BODY]: Joi.object().keys({
title: Joi.string().min(1).required(),
content: Joi.string().allow(''),
tag: Joi.string().valid(...TAGS),
    


})
};


// DELETE
const validateObjectId = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message('Invalid noteId format'); 
  }
  return value; 
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    noteId: Joi.string().custom(validateObjectId).required(),
  }),
};

export const updateNoteSchema = {
  
  [Segments.PARAMS]: Joi.object().keys({
    noteId: Joi.string().custom(validateObjectId).required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().min(1), 
    
    content: Joi.string().allow(''), 
    
    tag: Joi.string().valid(
      ...TAGS
    ), 
  })
  .or('title', 'content', 'tag'), 

};