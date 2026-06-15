import mongoose, { Schema, Document } from 'mongoose';

interface IExercise extends Document {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  duration: number;
  calories: number;
  createdAt: Date;
}

const exerciseSchema = new Schema<IExercise>(
  {
    name: {
      type: String,
      required: true,
    },
    sets: {
      type: Number,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 0,
    },
    calories: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Exercise = mongoose.model<IExercise>('Exercise', exerciseSchema);
