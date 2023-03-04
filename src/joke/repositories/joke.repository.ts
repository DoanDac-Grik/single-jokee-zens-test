import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateJokeDto } from '../dtos/joke.dto';
import { Joke } from '../models/joke.model';

@Injectable()
export class JokeRepository {
  constructor(@InjectModel('Joke') private readonly jokeModel: Model<Joke>) {}

  async findByCondition(filter: Object, option: Object): Promise<Joke[]> {
    return await this.jokeModel.find(filter, null, option);
  }

  async update(id: string, data: Partial<Joke>) {
    return await this.jokeModel.findByIdAndUpdate(id, data);
  }

  async findById(id: string) {
    return await this.jokeModel.findById(id);
  }
}
