import { Test, TestingModule } from '@nestjs/testing';
import { JokeRepository } from './joke.repository';
import { getModelToken } from '@nestjs/mongoose';

describe('JokeRepository', () => {
  let jokeRepository: JokeRepository;
  let mockModel: any;

  beforeEach(async () => {
    mockModel = {
      find: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JokeRepository,
        //Inject Mockmodels into JokeRepository
        {
          provide: getModelToken('Joke'),
          useValue: mockModel,
        },
      ],
    }).compile();

    jokeRepository = module.get<JokeRepository>(JokeRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findByCondition', () => {
    it('should call the find method of the joke model with the correct arguments', async () => {
      const filter = { author: 'Bob' };
      const option = { limit: 10 };
      const expectedResult = [
        { _id: 'mongo-id', content: 'Some joke', likes: 0, dislikes: 0 },
      ];

      mockModel.find.mockResolvedValueOnce(expectedResult);

      const result = await jokeRepository.findByCondition(filter, option);

      //Check 3 times: expect result, have been called and called with parameters
      expect(result).toEqual(expectedResult);
      expect(mockModel.find).toHaveBeenCalledTimes(1);
      expect(mockModel.find).toHaveBeenCalledWith(filter, null, option);
    });
  });

  describe('update', () => {
    it('should call the findByIdAndUpdate method of the joke model with the correct arguments', async () => {
      const id = 'mongo-id';
      const data = { likes: 1 };

      mockModel.findByIdAndUpdate.mockResolvedValueOnce({ id, ...data });

      const result = await jokeRepository.update(id, data);

      expect(result).toEqual({ id, ...data });
      expect(mockModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
      expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(id, data);
    });
  });

  describe('findById', () => {
    it('should call the findById method of the joke model with the correct argument', async () => {
      const id = 'mongo-id';
      const expectedResult = {
        _id: 'mongo-id',
        content: 'Some joke',
        likes: 0,
        dislikes: 0,
      };
      mockModel.findById.mockResolvedValueOnce(expectedResult);

      const result = await jokeRepository.findById(id);

      expect(result).toEqual(expectedResult);
      expect(mockModel.findById).toHaveBeenCalledTimes(1);
      expect(mockModel.findById).toHaveBeenCalledWith(id);
    });
  });
});
