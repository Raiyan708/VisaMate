import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGenerationDto {
  @IsNumber()
  userId: number;

  @IsIn(['sop', 'lor'])
  type: 'sop' | 'lor';

  @IsString()
  @IsNotEmpty()
  prompt: string;

  @IsString()
  @IsNotEmpty()
  output: string;
}
