import { Schema, Document } from 'mongoose';

const JokeSchema = new Schema(
  {
    content: String,
    likes: Number,
    dislikes: Number,
  },
  {
    timestamps: true,
    collection: 'jokes',
  },
);

export { JokeSchema };

export interface Joke extends Document {
  content: string;
  likes: number;
  dislikes: number;
}
