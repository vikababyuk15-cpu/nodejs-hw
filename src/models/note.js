import {Schema, model} from 'mongoose';
import { TAGS } from '../constants/tags.js';

const mongooseSchema = new Schema (
    {
title: {
    type: String, 
    trim: true, 
    required: true
},
content:{
    trim: true, 
    type: String,
    default: ""
},
tag:{
    type: String, 
    default:"Todo", 
    enum: TAGS},
},
{
    timestamps: true
}
);

mongooseSchema.index({ tag: '1' });

export const Note = model('Note', mongooseSchema);

