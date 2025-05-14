import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsIn,
} from 'class-validator';

export class CreateBountyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  targetName: string;

  @IsString()
  @IsNotEmpty()
  planet: string;

  @IsNumber()
  reward: number;

  @IsOptional()
  @IsIn(['OPEN', 'ACCEPTED'])
  status?: 'OPEN' | 'ACCEPTED';

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
