import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Transcoder } from 'simple-hls';
import * as fluentFfmpeg from 'fluent-ffmpeg';

@Injectable()
export class UploadService {
  constructor() {}

  async handleUploadVideo(file: Express.Multer.File) {
    if (!fs.existsSync('./uploads')) {
      fs.mkdirSync('./uploads');
    }
    const id = Math.random().toString(36).substring(7);
    fs.mkdirSync('./uploads/' + id);
    const fileName = './uploads/' + id + '/' + file.originalname;
    fs.writeFileSync(fileName, file.buffer);
    const bitrate = await this.getMaxBitrate(fileName);
    console.log(bitrate, 'bitrate');
    return this.convertVideoToHls(fileName, id);
  }

  async convertVideoToHls(fileName: string, id: string) {
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

    const t = new Transcoder(fileName, './uploads/' + id, {
      renditions: customRenditions,
    });
    try {
      await t.transcode();
      fs.unlinkSync(fileName);
      return { message: 'Uploaded successfully' };
    } catch (e) {
      console.log('Something went wrong');
    }
  }

  async getMaxBitrate(fileName: string) {
    const ffmpeg = fluentFfmpeg(fileName);
    let bitrate: string;

    ffmpeg.ffprobe((err, data) => {
      if (err) {
        console.log(err);
      }

      bitrate = data?.streams[0]?.bit_rate;
    });

    return bitrate;
  }
}
