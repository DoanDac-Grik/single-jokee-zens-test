import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JokeController } from './controllers/joke.controller';
import { JokeSchema } from './models/joke.model';
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
  providers: [JokeService],
})
export class JokeModule {}
