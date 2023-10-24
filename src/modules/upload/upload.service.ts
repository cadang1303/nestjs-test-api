import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Transcoder } from 'simple-hls';
import { exec } from 'child_process';
import { IMG_UPLOAD_DIR, VIDEO_UPLOAD_DIR } from 'src/constants/index';
import { randomUUID } from 'crypto';
import { EnvironmentService } from 'src/common/env.service';

@Injectable()
export class UploadService {
  constructor(private readonly envi: EnvironmentService) {}

  async handleUploadImg(file: Express.Multer.File) {
    if (!fs.existsSync(IMG_UPLOAD_DIR)) {
      fs.mkdirSync(IMG_UPLOAD_DIR);
    }

    const id = randomUUID();
    const filePath = IMG_UPLOAD_DIR + '/' + id + file.originalname;
    fs.writeFileSync(filePath, file.buffer);
    return {
      message: 'Uploaded Successfully',
      data: this.envi.isProduction()
        ? `${process.env.HOST}/imgs/${id}${file.originalname}`
        : `http://localhost:${process.env.PORT_API}/imgs/${id}${file.originalname}`,
    };
  }

  async handleUploadVideo(file: Express.Multer.File) {
    if (!fs.existsSync(VIDEO_UPLOAD_DIR)) {
      fs.mkdirSync(VIDEO_UPLOAD_DIR);
    }
    const id = randomUUID();
    fs.mkdirSync(VIDEO_UPLOAD_DIR + '/' + id);
    const filePath = VIDEO_UPLOAD_DIR + '/' + id + '/' + file.originalname;
    fs.writeFileSync(filePath, file.buffer);

    return this.convertVideoToHls(filePath, id);
  }

  async convertVideoToHls(filePath: string, id: string) {
    const customRenditions = [
      {
        width: 640,
        height: 360,
        profile: 'main',
        hlsTime: '4',
        bv: '800k',
        maxrate: '856k',
        bufsize: '1200k',
        ba: '96k',
        ts_title: '360p',
        master_title: '360p',
      },
      {
        width: 842,
        height: 480,
        profile: 'main',
        hlsTime: '4',
        bv: '1400k',
        maxrate: '1498',
        bufsize: '2100k',
        ba: '128k',
        ts_title: '480p',
        master_title: '480p',
      },
      {
        width: 1280,
        height: 720,
        profile: 'main',
        hlsTime: '4',
        bv: '2800k',
        maxrate: '2996k',
        bufsize: '4200k',
        ba: '128k',
        ts_title: '720p',
        master_title: '720p',
      },
      {
        width: 1920,
        height: 1080,
        profile: 'main',
        hlsTime: '4',
        bv: '5000k',
        maxrate: '5350k',
        bufsize: '7500k',
        ba: '192k',
        ts_title: '1080p',
        master_title: '1080p',
      },
    ];
    const resolution = await this.getResolution(filePath);
    const renditions = [];
    if (resolution) {
      customRenditions.forEach((item) => {
        if (resolution?.height >= item.height) {
          renditions.push(item);
        }
      });
    }
    const t = new Transcoder(filePath, VIDEO_UPLOAD_DIR + '/' + id, {
      renditions: renditions,
    });
    try {
      await t.transcode();
      fs.unlinkSync(filePath);
      return {
        message: 'Uploaded successfully',
        data: this.envi.isProduction()
          ? `${process.env.HOST}/videos/${id}/index.m3u8`
          : `http://localhost:${process.env.PORT_API}/videos/${id}/index.m3u8`,
      };
    } catch (e) {
      console.log('Something went wrong');
    }
  }

  getResolution(filePath: string) {
    return new Promise<{
      width: number;
      height: number;
    }>((resolve, reject) => {
      exec(
        `ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 ${filePath}`,
        (err, stdout) => {
          if (err) {
            return reject(err);
          }
          const resolution = stdout.trim().split('x');
          const [width, height] = resolution;
          resolve({
            width: Number(width),
            height: Number(height),
          });
        },
      );
    });
  }
}
