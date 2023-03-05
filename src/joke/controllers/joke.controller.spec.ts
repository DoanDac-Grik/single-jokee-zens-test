import { Test, TestingModule } from '@nestjs/testing';
import { JokeController } from './joke.controller';

describe('JokeController', () => {
  let jokeController: JokeController;

  it('should be defined', () => {
    expect(jokeController).toBeDefined();
  });
});
