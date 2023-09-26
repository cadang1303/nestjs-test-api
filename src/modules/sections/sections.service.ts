import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';
import { SectionsDto } from './dto/sections.dto';

@Injectable()
export class SectionsService {
  constructor(private prisma: PrismaService) {}

  async getSectionsByCourse(course_id: number): Promise<any> {
    try {
      const data = await this.prisma.section.findMany({
        where: {
          course_id,
        },
      });

      return { data: data };
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async getSectionById(id: number): Promise<any> {
    try {
      const section = await this.prisma.section.findUnique({
        where: {
          id,
        },
      });

      if (!section) {
        throw new NotFoundException();
      }

      return { data: section };
    } catch (error) {
      return {
        status: error.code,
        message: error.message,
      };
    }
  }

  async createSection(data: SectionsDto): Promise<any> {
    try {
      await this.prisma.section.create({ data });
      return {
        status: HttpStatus.OK,
        message: 'success',
      };
    } catch (error) {
      return {
        status: error.code,
        message: error.message,
      };
    }
  }

  async updateSection(
    data: Prisma.SectionUpdateInput,
    id: number,
  ): Promise<any> {
    try {
      const section = await this.prisma.section.findUnique({
        where: { id },
      });

      if (!section) {
        throw new NotFoundException();
      }

      await this.prisma.section.update({
        where: {
          id,
        },
        data,
      });

      return { message: 'updated successfully' };
    } catch (error) {
      return {
        status: error.code,
        message: error.message,
      };
    }
  }

  async deleteSection(id: number): Promise<any> {
    try {
      const section = await this.prisma.section.findUnique({
        where: {
          id,
        },
      });

      if (section) {
        await this.prisma.section.delete({
          where: {
            id,
          },
        });
        return { message: 'deleted successfully' };
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
}
