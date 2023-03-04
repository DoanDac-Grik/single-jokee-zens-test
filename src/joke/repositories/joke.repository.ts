import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IJoke, Joke } from '../models/joke.model';

@Injectable()
export class JokeRepository {
  constructor(@InjectModel('Joke') private readonly jokeModel: Model<Joke>) {}

  async findByCondition(filter: Object, option: Object): Promise<IJoke[]> {
    const result = await this.jokeModel.find(filter, null, option);
    return result;
  }

  async update(id: string, data: Partial<IJoke>) {
    return await this.jokeModel.findByIdAndUpdate(id, data);
  }

  async findById(id: string): Promise<IJoke> {
    const result = await this.jokeModel.findById(id);
    return result;
  }
}
