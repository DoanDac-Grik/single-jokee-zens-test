import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { FailResponse, SucessResponse } from '../../common/interface.common';
import { Vote } from '../joke.constant';
import { Joke } from '../models/joke.model';

export class UpdateJokeDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ example: '6402c106f0c3d15dbc4698b9' })
  id: string;

  @IsNotEmpty()
  @IsEnum(Vote)
  @ApiProperty({ example: 'LIKE' })
  vote: string;
}

export class GetJokeSuccessResponse implements SucessResponse<Joke> {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Get joke successfully' })
  message: string;
  @ApiProperty({
    example: [
      {
        id: '6402c0dff127bff4dbae5947',
        content: 'joke example',
        likes: 1,
        dislikes: 1,
      },
    ],
  })
  data: Array<Joke>;
}

export class UpdateJokeSuccessResponse implements SucessResponse<Joke> {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Update joke successfully' })
  message: string;
}

export class BadRequestResponse implements FailResponse {
  @ApiProperty({ example: 400 })
  statusCode: number;
  @ApiProperty({ example: 'Joke does not exist' })
  message: string;
  @ApiProperty({ example: 'Bad Request' })
  error: string;
}

export class InternalErrorResponse implements FailResponse {
  @ApiProperty({ example: 500 })
  statusCode: number;
  @ApiProperty({ example: 'Internal Error' })
  message: string;
  @ApiProperty({ example: 'Internal Error Response' })
  error: string;
}
