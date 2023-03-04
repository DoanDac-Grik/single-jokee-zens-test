import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { UpdateJokeDto } from '../dtos/joke.dto';
import { Vote } from '../joke.enum';
import { JokeRepository } from '../repositories/joke.repository';

@Injectable()
export class JokeService {
  constructor(private readonly jokeRepository: JokeRepository) {}
  async getJoke(id: string) {
    //Check valid
    if (id && !isValidObjectId(id)) {
      throw new BadRequestException('Joke Id is not valid');
    }

    //Check exist
    const checkExistJoke = await this.jokeRepository.findById(id);
    if (id && !checkExistJoke) {
      throw new NotFoundException('Joke not found');
    }

    const joke = await this.jokeRepository.findByCondition(
      {
        _id: {
          $gt: id ? id : '000000000000000000000000',
        },
      },
      {
        sort: {
          _id: 1,
        },

        limit: 1,
      },
    );
    if (joke.length === 0) {
      return {
        statusCode: HttpStatus.OK,
        message: `That's all the jokes for today! Come back another day!`,
        data: joke,
      };
    } else {
      return {
        statusCode: HttpStatus.OK,
        message: 'Get joke successfully',
        data: joke,
      };
    }
  }

  async updateJoke(id: string, data: UpdateJokeDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Joke Id is not valid');
    }

    const joke = await this.jokeRepository.findById(id);
    if (!joke) {
      throw new NotFoundException('Joke not found');
    }

    try {
      switch (data.vote) {
        case Vote.like:
          await this.jokeRepository.update(id, { likes: joke.likes + 1 });
          break;
        case Vote.dislike:
          await this.jokeRepository.update(id, { dislikes: joke.dislikes + 1 });
          break;
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Update joke successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
