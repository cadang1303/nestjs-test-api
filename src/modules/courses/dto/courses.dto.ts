import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CoursesDto {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(2000)
  description: string;

  @ApiProperty()
  thumbnail_url?: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsInt()
  author_id: number;
}
