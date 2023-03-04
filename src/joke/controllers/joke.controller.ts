import { Body, Controller, Get, Put, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UpdateJokeDto } from '../dtos/joke.dto';
import { SwaggerGetJoke, SwaggerUpdateJoke } from '../joke.swagger';
import { JokeService } from '../services/joke.service';
@ApiTags('Jokes')
@Controller('jokes')
export class JokeController {
  constructor(private readonly jokeService: JokeService) {}

  @SwaggerGetJoke()
  @Get()
  async getJoke(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const id = request.cookies['jokeId'];

    const result = await this.jokeService.getJoke(id);

    if (result.data.length > 0) {
      response.cookie('jokeId', result.data[0]._id);
    }
    return result;
  }

  @SwaggerUpdateJoke()
  @Put()
  async updateJoke(@Req() request: Request, @Body() payload: UpdateJokeDto) {
    const id = request.cookies['jokeId'];
    return this.jokeService.updateJoke(id, payload);
  }
}
