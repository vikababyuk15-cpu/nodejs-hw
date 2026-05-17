import {Schema, model} from 'mongoose';

const mongooseSchema = new Schema ({
title: {type: String, trim: true, required: true},
content:{trim: true, type: String,
default: ""},
tag:{type: String, default:"Todo", 
enum:['Work', 'Personal', 'Meeting', 'Shopping', 'Ideas', 'Travel', 'Finance', 'Health', 'Important', 'Todo']},},
{timestamps: true}
);



export const Note = model('Note', mongooseSchema);
