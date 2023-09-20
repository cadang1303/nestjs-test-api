import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthorsDto } from './dto/authors.dto';
import { CoursesDto } from './dto/courses.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  //author section
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of authors is fetched successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Get('/authors')
  getAuthors(): Promise<any> {
    return this.coursesService.getAuthors();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'An author is fetched successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Get('/authors/:id')
  getAuthorById(@Param('id') id: number): Promise<any> {
    return this.coursesService.getAuthorById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A new author is created successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Post('/authors')
  createAuthor(@Body() authorsDto: AuthorsDto): Promise<void> {
    return this.coursesService.createAuthor(authorsDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'An author is updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Patch('/authors/:id')
  updateAuthor(
    @Param() id: number,
    @Body() authorsDto: AuthorsDto,
  ): Promise<void> {
    return this.coursesService.updateAuthor(id, authorsDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'An author is deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Delete('/authors/:id')
  deleteAuthor(@Param() id: number): Promise<void> {
    return this.coursesService.deleteAuthor(id);
  }

  //courses section
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of courses is fetched successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Get()
  getCourses(): Promise<any> {
    return this.coursesService.getCourses();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A course is fetched successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Get(':id')
  getCoursesById(@Param('id') id: number): Promise<any> {
    return this.coursesService.getCourseById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A course is created successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Post()
  createCourse(@Body() coursesDto: CoursesDto): Promise<void> {
    return this.coursesService.createCourse(coursesDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A course is updated successfully',
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
  updateCourse(
    @Param() id: number,
    @Body() coursesDto: CoursesDto,
  ): Promise<void> {
    return this.coursesService.updateCourse(id, coursesDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A course is deleted successfully',
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
  deleteCourse(@Param() id: number): Promise<void> {
    return this.coursesService.deleteCourse(id);
  }
}
