import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class SectionsDto {
  @ApiProperty()
  @IsNumber()
  course_id: number;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(125)
  title: string;

  @ApiProperty()
  @IsString()
  @MaxLength(1000)
  description: string;
}
