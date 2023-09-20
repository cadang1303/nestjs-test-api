import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength, IsString } from 'class-validator';

export class AuthorsDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(25)
  name: string;

  @ApiProperty()
  @MaxLength(1000)
  description: string;

  @ApiProperty()
  @MaxLength(255)
  title: string;

  @ApiProperty()
  avatar_url: string;
}
