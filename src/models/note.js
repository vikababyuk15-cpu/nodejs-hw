import {Schema, model} from 'mongoose';

const mongooseSchema = new Schema ({
title: {type: String, trim: true},
content:{trim: true, type: String,
default: ""},
tag:{type: String, default:"Todo", 
enum:['Work', 'Personal', 'Meeting', 'Shopping', 'Ideas', 'Travel', 'Finance', 'Health', 'Important', 'Todo']},},
{timestamps: true}
);

mongooseSchema.post('save',(error, data, next) =>{
error.status = 400;
  next();

});

const Note = model('note', mongooseSchema);

export default Note;