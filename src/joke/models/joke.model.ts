import { Document, Schema } from 'mongoose';
import { Factory } from 'nestjs-seeder';
import { contentJokeSeeds } from '../joke.constant';

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

export class Joke extends Document {
  @Factory((_faker, ctx) => ctx.content)
  content: string;
  @Factory(0)
  likes: number;
  @Factory(0)
  dislikes: number;
}
