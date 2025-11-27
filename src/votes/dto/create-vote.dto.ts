// src/votes/dto/create-vote.dto.ts
import { IsInt, Min, Max } from 'class-validator';

export class CreateVoteDto {
  @IsInt()
  reportId: number;

  @IsInt()
  @Min(-1)
  @Max(1)
  value: 1 | -1;
}
