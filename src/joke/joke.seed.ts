import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Seeder, DataFactory } from 'nestjs-seeder';
import { contentJokeSeeds } from './joke.constant';
import { Joke } from './models/joke.model';

@Injectable()
export class JokeSeeder implements Seeder {
  constructor(
    @InjectModel(Joke.name) private readonly jokeModel: Model<Joke>,
  ) {}

  async seed(): Promise<any> {
    // Generate 4 jokes.
    for (let i = 0; i < 4; i++) {
      const jokes = DataFactory.createForClass(Joke).generate(1, {
        content: contentJokeSeeds[i],
      });
      await this.jokeModel.create(jokes);
    }
    return;
    // const jokes = DataFactory.createForClass(Joke).generate(4);
  }

  async drop(): Promise<any> {
    return this.jokeModel.deleteMany({});
  }
}
