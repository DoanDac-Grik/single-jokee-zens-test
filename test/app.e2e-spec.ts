import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { JokeModule } from '../src/joke/joke.module';
import { JokeService } from '../src/joke/services/joke.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/ping (GET) pong', () => {
    return request(app.getHttpServer()).get('/ping').expect(200).expect('pong');
  });

  afterAll(async () => {
    await app.close();
  });
});
