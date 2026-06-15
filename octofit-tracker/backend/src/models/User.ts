import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  age: number;
  weight: number;
  height: number;
  fitnessGoal: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    fitnessGoal: {
      type: String,
      enum: ['weight loss', 'muscle gain', 'endurance', 'flexibility'],
      default: 'fitness',
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
