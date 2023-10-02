import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('video')
  @UseInterceptors(FileInterceptor('file'))
  // @UseGuards(JwtAuthGuard)
  uploadVideo(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.handleUploadVideo(file);
  }

  @Post('img')
  @UseInterceptors(FileInterceptor('file'))
  // @UseGuards(JwtAuthGuard)
  uploadImg(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.handleUploadImg(file);
  }
}
