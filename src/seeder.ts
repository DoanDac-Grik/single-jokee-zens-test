import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { JokeSeeder } from './joke/joke.seed';
import { Joke, JokeSchema } from './joke/models/joke.model';
import { ConfigModule, ConfigService } from '@nestjs/config';

seeder({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/jokee_zens', {
      useNewUrlParser: true,
    }),

    MongooseModule.forFeature([{ name: Joke.name, schema: JokeSchema }]),
  ],
}).run([JokeSeeder]);
