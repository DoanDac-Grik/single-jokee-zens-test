import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import {
  BadRequestResponse,
  GetJokeSuccessResponse,
  InternalErrorResponse,
  UpdateJokeSuccessResponse,
} from './dtos/joke.dto';

export function SwaggerGetJoke() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Get joke successfully',
      type: GetJokeSuccessResponse,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request: Wrong Id, Not exist joke',
      type: BadRequestResponse,
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Error',
      type: InternalErrorResponse,
    }),
  );
}

export function SwaggerUpdateJoke() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Update joke (update likes or dislikes) successfully',
      type: UpdateJokeSuccessResponse,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request: Wrong Id, Not exist joke',
      type: BadRequestResponse,
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Error',
      type: InternalErrorResponse,
    }),
  );
}
