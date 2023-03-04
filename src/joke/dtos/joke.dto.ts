import { IsEnum, IsNotEmpty } from 'class-validator';
import { Vote } from '../joke.enum';

export class UpdateJokeDto {
  @IsNotEmpty()
  @IsEnum(Vote)
  vote: string;
}
