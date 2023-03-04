import {
  BadRequestException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateJokeDto } from '../dtos/joke.dto';
import { Vote } from '../joke.constant';
import { IJoke } from '../models/joke.model';
import { JokeRepository } from '../repositories/joke.repository';
import { JokeService } from './joke.service';

describe('JokeService', () => {
  let jokeService: JokeService;
  let jokeRepository: JokeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JokeService,
        {
          provide: JokeRepository,
          useValue: {
            findById: jest.fn(),
            findByCondition: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    jokeService = module.get<JokeService>(JokeService);
    jokeRepository = module.get<JokeRepository>(JokeRepository);
  });

  it('should be defined', () => {
    expect(jokeService).toBeDefined();
  });

  describe('getJoke', () => {
    it('should throw BadRequestException if id is not valid', async () => {
      const id = 'invalid-id';
      const expectedResult = new BadRequestException('Joke Id is not valid');

      try {
        await jokeService.getJoke(id);
      } catch (error) {
        expect(error).toEqual(expectedResult);
      }
    });

    it('should throw BadRequestException if joke does not exist', async () => {
      const id = '64033e3aa5d051e462bd0000';
      jest.spyOn(jokeRepository, 'findById').mockResolvedValueOnce(null);

      await expect(jokeService.getJoke(id)).rejects.toThrow(
        BadRequestException,
      );
      await expect(jokeService.getJoke(id)).rejects.toThrow(
        'Joke does not exist',
      );
    });

    it('should return message that ending jokes', async () => {
      const jokes: IJoke[] = [];
      jest
        .spyOn(jokeRepository, 'findByCondition')
        .mockResolvedValueOnce(jokes);

      const result = await jokeService.getJoke(null);

      expect(result.statusCode).toEqual(HttpStatus.OK);
      expect(result.message).toEqual(
        `That's all the jokes for today! Come back another day!`,
      );
      expect(result.data).toEqual(jokes);
    });

    it('should return next joke based on id', async () => {
      const id = '64033e3aa5d051e462bd0000';
      const jokes: IJoke[] = [
        { _id: 'valid_id', content: 'joke', likes: 0, dislikes: 0 },
      ];
      jest.spyOn(jokeRepository, 'findById').mockResolvedValueOnce(jokes[0]);
      jest
        .spyOn(jokeRepository, 'findByCondition')
        .mockResolvedValueOnce(jokes);

      const result = await jokeService.getJoke(id);

      expect(result.statusCode).toEqual(HttpStatus.OK);
      expect(result.message).toEqual('Get joke successfully');
      expect(result.data).toEqual(jokes);
    });
  });

  describe('updateJoke', () => {
    const data: UpdateJokeDto = { vote: Vote.like };

    it('should throw BadRequestException if id is not valid', async () => {
      const id = 'invalid-id';

      const expectedResult = new BadRequestException('Joke Id is not valid');

      try {
        await jokeService.updateJoke(id, data);
      } catch (error) {
        expect(error).toEqual(expectedResult);
      }
    });

    it('should throw BadRequestException if joke does not exist', async () => {
      const id = '64033e3aa5d051e462bd0000';

      jest.spyOn(jokeRepository, 'findById').mockResolvedValueOnce(null);

      await expect(jokeService.updateJoke(id, data)).rejects.toThrow(
        BadRequestException,
      );
      await expect(jokeService.getJoke(id)).rejects.toThrow(
        'Joke does not exist',
      );
    });

    it('should update joke if the vote is "LIKE"', async () => {
      const id = '64033e3aa5d051e462bd0000';
      const existingJoke: IJoke = {
        _id: id,
        content: 'unit test content joke',
        likes: 0,
        dislikes: 0,
      };

      jest
        .spyOn(jokeRepository, 'findById')
        .mockResolvedValueOnce(existingJoke);

      jest.spyOn(jokeRepository, 'update');

      await jokeService.updateJoke(id, data);

      expect(jokeRepository.update).toHaveBeenCalledWith(id, {
        likes: existingJoke.likes + 1,
      });
    });

    it('should update joke if the vote is "DISLIKE"', async () => {
      const id = '64033e3aa5d051e462bd0000';
      const existingJoke: IJoke = {
        _id: id,
        content: 'unit test content joke',
        likes: 0,
        dislikes: 0,
      };

      jest
        .spyOn(jokeRepository, 'findById')
        .mockResolvedValueOnce(existingJoke);

      jest.spyOn(jokeRepository, 'update');

      await jokeService.updateJoke(id, data);

      expect(jokeRepository.update).toHaveBeenCalledWith(id, {
        likes: existingJoke.dislikes + 1,
      });
    });

    it('should return a success response when the joke is updated', async () => {
      const id = '64033e3aa5d051e462bd0000';

      const existingJoke: IJoke = {
        _id: id,
        content: 'unit test content joke',
        likes: 0,
        dislikes: 0,
      };
      jest
        .spyOn(jokeRepository, 'findById')
        .mockResolvedValueOnce(existingJoke);
      jest.spyOn(jokeRepository, 'update');

      const response = await jokeService.updateJoke(id, data);

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.message).toEqual('Update joke successfully');
    });

    it('should throw InternalServerErrorException when an error occurs during update', async () => {
      const id = '64033e3aa5d051e462bd0000';

      const existingJoke: IJoke = {
        _id: id,
        content: 'unit test content joke',
        likes: 0,
        dislikes: 0,
      };

      jest
        .spyOn(jokeRepository, 'findById')
        .mockResolvedValueOnce(existingJoke);
      jest
        .spyOn(jokeRepository, 'update')
        .mockRejectedValue(InternalServerErrorException);

      await expect(jokeService.updateJoke(id, data)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
