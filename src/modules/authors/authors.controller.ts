import {
  Controller,
  HttpStatus,
  Param,
  Get,
  Post,
  Patch,
  Delete,
  UseGuards,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthorsService } from './authors.service';
import { AuthorsDto } from './dto/authors.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of authors is fetched successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Get('')
  getAuthors(): Promise<any> {
    return this.authorsService.getAuthors();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'An author is fetched successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Get(':id')
  getAuthorById(@Param('id') id: number): Promise<any> {
    return this.authorsService.getAuthorById(id);
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
  @Post('')
  createAuthor(@Body() authorsDto: AuthorsDto): Promise<void> {
    return this.authorsService.createAuthor(authorsDto);
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
  @Patch(':id')
  updateAuthor(
    @Param() id: number,
    @Body() authorsDto: AuthorsDto,
  ): Promise<void> {
    return this.authorsService.updateAuthor(id, authorsDto);
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
  @Delete(':id')
  deleteAuthor(@Param() id: number): Promise<void> {
    return this.authorsService.deleteAuthor(id);
  }
}
