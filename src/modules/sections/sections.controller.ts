import {
  Controller,
  HttpStatus,
  Get,
  Post,
  Patch,
  Delete,
  UseGuards,
  Param,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SectionsService } from './sections.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { SectionsDto } from './dto/sections.dto';

@ApiTags('sections')
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of sections is fetched successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Get(':course_id')
  getSectionsByCourse(@Param('course_id') course_id: number): Promise<any> {
    return this.sectionsService.getSectionsByCourse(course_id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A section is fetched successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Get(':id')
  getSectionById(@Param('id') id: number): Promise<any> {
    return this.sectionsService.getSectionById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A new section is created successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Post('')
  createSection(@Body() sectionsDto: SectionsDto): Promise<void> {
    return this.sectionsService.createSection(sectionsDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'An section is updated successfully',
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
  updateSection(
    @Param() id: number,
    @Body() sectionsDto: SectionsDto,
  ): Promise<void> {
    return this.sectionsService.updateSection(sectionsDto, id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A section is deleted successfully',
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
  deleteSection(@Param() id: number): Promise<void> {
    return this.sectionsService.deleteSection(id);
  }
}
