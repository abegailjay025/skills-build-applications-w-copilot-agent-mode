import mongoose, { Schema, Document } from 'mongoose';

interface IWorkout extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  date: Date;
  duration: number;
  totalCalories: number;
  exercises: mongoose.Schema.Types.ObjectId[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    duration: {
      type: Number,
      required: true,
    },
    totalCalories: {
      type: Number,
      default: 0,
    },
    exercises: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Exercise',
      },
    ],
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
