import { Schema, model } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const mongooseSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      trim: true,
      type: String,
      default: '',
    },
    tag: {
      type: String,
      default: 'Todo',
      enum: TAGS,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Складений індекс для оптимізації пошуку нотаток користувача за тегом
mongooseSchema.index({ userId: 1, tag: 1 });

export const Note = model('Note', mongooseSchema);