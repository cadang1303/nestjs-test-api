import { LessonsService } from './lessons.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  // UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { LessonsDto } from './dto/lessons.dto';
import { FileInterceptor } from '@nestjs/platform-express';
// import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('lessons')
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of lessons is fetched successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Get(':section_id')
  getLessonsBySection(@Param('section_id') section_id: number): Promise<any> {
    return this.lessonsService.getLessonsInSection(section_id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A lesson is fetched successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Get(':id')
  getLessonById(@Param('id') id: number): Promise<any> {
    return this.lessonsService.getLessonById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A new lesson is created successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @ApiConsumes('multipart/form-data')
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  createLesson(
    @Body() lessonsDto: LessonsDto,
    @UploadedFile() file: Express.Multer.File,
  ): any {
    return this.lessonsService.createLesson(lessonsDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'An lesson is updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Patch(':id')
  updateLesson(
    @Param() id: number,
    @Body() lessonsDto: LessonsDto,
  ): Promise<void> {
    return this.lessonsService.updateLesson(lessonsDto, id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A lesson is deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Delete(':id')
  deleteLesson(@Param() id: number): Promise<void> {
    return this.lessonsService.deleteLesson(id);
  }
}
