import { Module } from '@nestjs/common';
import { JokeController } from './controllers/joke.controller';
import { JokeService } from './services/joke.service';

@Module({
  controllers: [JokeController],
  providers: [JokeService],
})
export class JokeModule {}
