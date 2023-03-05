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

  it('should return a joke', async () => {
    const response = await request('http://localhost:3000').get('/api/jokes');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.header['set-cookie']).toBeDefined();
  });

  it('should update joke', async () => {
    const response = await request('http://localhost:3000')
      .put('/api/jokes')
      .send({ vote: 'LIKE' })
      .set('Cookie', `jokeId=64033e3aa5d051e462bd8a4f`);
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });

  afterAll(async () => {
    await app.close();
  });
});
