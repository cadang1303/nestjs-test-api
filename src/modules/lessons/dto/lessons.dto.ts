import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LessonsDto {
  @ApiPropertyOptional()
  challenge_id: number;

  @ApiPropertyOptional()
  section_id: number;

  @ApiProperty()
  type: number;

  @ApiPropertyOptional()
  @IsString()
  markdown_content: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file: Express.Multer.File;

  @ApiPropertyOptional()
  ref_link: string;
}
