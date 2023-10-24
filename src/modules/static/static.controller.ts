import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('files')
export class StaticController {
  @Get(':folder/:filename')
  async serveStatic(
    @Param('folder') folder: string,
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    console.log(folder, filename);
    res.sendFile(`/uploads/${folder}/${filename}`);
  }
}
