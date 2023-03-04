import { Body, Controller, Get, Put, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { UpdateJokeDto } from '../dtos/joke.dto';
import { JokeService } from '../services/joke.service';
@Controller('jokes')
export class JokeController {
  constructor(private readonly jokeService: JokeService) {}

  @Get()
  async getJoke(@Req() request: Request) {
    const id = request.cookies['jokeId'];
    return this.jokeService.getJoke(id);
  }

  @Put()
  async updateJoke(@Req() request: Request, @Body() payload: UpdateJokeDto) {
    const id = request.cookies['jokeId'];
    return this.jokeService.updateJoke(id, payload);
  }
}
