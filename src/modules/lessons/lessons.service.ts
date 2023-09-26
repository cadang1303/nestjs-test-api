import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}
  async getLessonsInSection(section_id: number): Promise<any> {
    try {
      const section = await this.prisma.section.findUnique({
        where: {
          id: section_id,
        },
      });

      if (!section) {
        throw new NotFoundException();
      }

      const data = await this.prisma.lesson.findMany({
        where: {
          section_id,
        },
      });

      return { data: data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getLessonById(id: number): Promise<any> {
    try {
      const lesson = await this.prisma.lesson.findUnique({
        where: {
          id,
        },
      });

      if (!lesson) {
        throw new NotFoundException();
      }

      return { data: lesson };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createLesson(data: any): Promise<any> {
    try {
      await this.prisma.lesson.create({ data });
      return { message: 'success' };
    } catch (error) {
      return {
        status: error.code,
        message: error.message,
      };
    }
  }

  async updateLesson(data: Prisma.LessonUpdateInput, id: number): Promise<any> {
    try {
      const lesson = await this.prisma.lesson.findUnique({
        where: {
          id,
        },
      });

      if (lesson) {
        await this.prisma.lesson.update({
          where: {
            id,
          },
          data,
        });
        return { message: 'updated successfully' };
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      return {
        status: error.code,
        message: error.message,
      };
    }
  }

  async deleteLesson(id: number): Promise<any> {
    try {
      const lesson = await this.prisma.lesson.findUnique({
        where: {
          id,
        },
      });

      if (!lesson) {
        throw new NotFoundException();
      }

      await this.prisma.lesson.delete({
        where: {
          id,
        },
      });

      return { message: 'deleted successfully' };
    } catch (error) {
      return {
        status: error.code,
        message: error.message,
      };
    }
  }
}
