import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';
import { CoursesDto } from './dto/courses.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async getCourses() {
    try {
      const data = await this.prisma.course.findMany();

      return { data: data };
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async getCourseById(id: number) {
    try {
      const course = await this.prisma.course.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!course) {
        throw new NotFoundException();
      }

      return { data: course };
    } catch (error) {
      return { status: error.code, message: error.message };
    }
  }

  async createCourse(data: CoursesDto): Promise<any> {
    try {
      await this.prisma.course.create({ data });
      return { message: 'success' };
    } catch (error) {
      return { status: error.code, message: error.message };
    }
  }

  async updateCourse(id: number, data: Prisma.CourseUpdateInput): Promise<any> {
    try {
      const course = await this.prisma.course.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (course) {
        await this.prisma.course.update({
          where: {
            id: Number(id),
          },
          data,
        });
        return { message: 'updated successfully' };
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      return { status: error.code, message: error.message };
    }
  }

  async deleteCourse(id: number): Promise<any> {
    try {
      const course = await this.prisma.course.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (course) {
        await this.prisma.course.delete({
          where: {
            id: Number(id),
          },
        });
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      return { status: error.code, message: error.message };
    }
  }

  async getAuthors() {
    try {
      const data = this.prisma.author.findMany();

      return { data: data };
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async getAuthorById(id: number) {
    try {
      const author = this.prisma.author.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!author) {
        throw new NotFoundException();
      }

      return { data: author };
    } catch (error) {
      return { status: error.code, message: error.message };
    }
  }

  async createAuthor(data: Prisma.AuthorCreateInput): Promise<any> {
    try {
      await this.prisma.author.create({ data });
      return { message: 'success' };
    } catch (error) {
      return { status: error.code, message: error.message };
    }
  }

  async updateAuthor(id: number, data: Prisma.AuthorUpdateInput): Promise<any> {
    try {
      const author = await this.prisma.author.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (author) {
        await this.prisma.author.update({
          where: {
            id: Number(id),
          },
          data,
        });
        return { message: 'updated successfully' };
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      return { status: error.code, message: error.message };
    }
  }

  async deleteAuthor(id: number): Promise<any> {
    try {
      const author = await this.prisma.author.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (author) {
        await this.prisma.author.delete({
          where: {
            id: Number(id),
          },
        });
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      return { status: error.code, message: error.message };
    }
  }
}
