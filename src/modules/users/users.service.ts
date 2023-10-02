import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersDto } from './dto/users.dto';
import { UploadService } from '../upload/upload.service';
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async getUsers(): Promise<any> {
    try {
      const data = await this.prisma.user.findMany();

      return { data: data };
    } catch (error) {
      return { status: error.code, message: error.message };
    }
  }

  async getUserById(id: number): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!user) {
        throw new NotFoundException();
      }

      return { data: user };
    } catch (error) {
      return { status: error.code, message: error.message };
    }
  }

  async updateUser(
    id: number,
    { email, nickname }: UsersDto,
    file: Express.Multer.File,
  ): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      let upload = '';

      if (user) {
        if (file) {
          const res = await this.uploadService.handleUploadImg(file);
          upload = res.data;
        }
        await this.prisma.user.update({
          where: {
            id: Number(id),
          },
          data: {
            email,
            nickname,
            avatar_url: upload,
          },
        });

        return { message: 'updated successfully' };
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      return { status: error.code, message: error.message };
    }
  }

  async deleteUser(id: number): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!user) {
        throw new NotFoundException();
      }

      return { message: 'deleted successfully' };
    } catch (error) {
      return { status: error.code, message: error.message };
    }
  }
}
