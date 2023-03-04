import { MongooseModule } from '@nestjs/mongoose';
import { seeder } from 'nestjs-seeder';
import { JokeSeeder } from './joke/joke.seed';
import { Joke, JokeSchema } from './joke/models/joke.model';

seeder({
  imports: [
    //TODO: Should not hard code
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/jokee_zens', {
      useNewUrlParser: true,
    }),

    MongooseModule.forFeature([{ name: Joke.name, schema: JokeSchema }]),
  ],
}).run([JokeSeeder]);
