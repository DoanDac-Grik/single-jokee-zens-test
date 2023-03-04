import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JokeController } from './controllers/joke.controller';
import { JokeSchema } from './models/joke.model';
import { JokeRepository } from './repositories/joke.repository';
import { JokeService } from './services/joke.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Joke',
        schema: JokeSchema,
      },
    ]),
  ],
  controllers: [JokeController],
  providers: [JokeService, JokeRepository],
})
export class JokeModule {}
