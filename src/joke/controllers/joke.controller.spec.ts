import { Test, TestingModule } from '@nestjs/testing';
import { JokeController } from './joke.controller';
import { JokeService } from '../services/joke.service';
import { IJoke } from '../models/joke.model';
import { Request, Response } from 'express';
describe('JokeController', () => {
  let controller: JokeController;
  let service: JokeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JokeController],
      providers: [
        {
          provide: JokeService,
          useValue: {
            getJoke: jest.fn(),
            updateJoke: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<JokeController>(JokeController);
    service = module.get<JokeService>(JokeService);
  });

  describe('getJoke', () => {
    it('should call jokeService.getJoke with the cookie ID and return the result', async () => {
      const request = { cookies: { jokeId: 'abc123' } } as Request;
      const response = { cookie: jest.fn() } as unknown as Response;
      const expectedResult = {
        statusCode: 200,
        message: 'ok',
        data: [
          {
            _id: 'abc123',
            content: 'Vip pro unit test',
            likes: 0,
            dislikes: 0,
          },
        ] as IJoke[],
      };
      jest.spyOn(service, 'getJoke').mockResolvedValue(expectedResult);

      const result = await controller.getJoke(request, response);

      expect(result).toEqual(expectedResult);
      expect(response.cookie).toHaveBeenCalledWith('jokeId', 'abc123');
      expect(service.getJoke).toHaveBeenCalledWith('abc123');
    });
  });

  describe('updateJoke', () => {
    it('should call jokeService.updateJoke with the cookie ID and payload and return the result', async () => {
      // Arrange
      const request = { cookies: { jokeId: 'abc123' } } as Request;
      const payload = { vote: 'LIKE' };
      const expectedResult = {
        statusCode: 200,
        message: 'Vip pro unit test',
      };
      jest.spyOn(service, 'updateJoke').mockResolvedValue(expectedResult);

      // Act
      const result = await controller.updateJoke(request, payload);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.updateJoke).toHaveBeenCalledWith('abc123', payload);
    });
  });
});
