import { Body, Controller, Get, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UpdateJokeDto } from '../dtos/joke.dto';
import { SwaggerGetJoke, SwaggerUpdateJoke } from '../joke.swagger';
import { JokeService } from '../services/joke.service';
@ApiTags('Jokes')
@Controller('jokes')
export class JokeController {
  constructor(private readonly jokeService: JokeService) {}

  @SwaggerGetJoke()
  @Get()
  async getJoke(@Req() request: Request) {
    const id = request.cookies['jokeId'];
    return this.jokeService.getJoke(id);
  }

  @SwaggerUpdateJoke()
  @Put()
  async updateJoke(@Body() payload: UpdateJokeDto) {
    return this.jokeService.updateJoke(payload);
  }
}
