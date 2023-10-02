import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}
  async getAuthors() {
    try {
      const data = await this.prisma.author.findMany();

      return { data: data };
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async getAuthorById(id: number) {
    try {
      const author = await this.prisma.author.findUnique({
        where: {
          id,
        },
      });

      if (!author) {
        throw new NotFoundException();
      }

      return { data: author };
    } catch (error) {
      return {
        status: error.code,
        message: error.message,
      };
    }
  }

  async createAuthor(data: Prisma.AuthorCreateInput): Promise<any> {
    try {
      await this.prisma.author.create({ data });
      return { message: 'success' };
    } catch (error) {
      return {
        status: error.code,
        message: error.message,
      };
    }
  }

  async updateAuthor(id: number, data: Prisma.AuthorUpdateInput): Promise<any> {
    try {
      const author = await this.prisma.author.findUnique({
        where: {
          id,
        },
      });

      if (author) {
        await this.prisma.author.update({
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

  async deleteAuthor(id: number): Promise<any> {
    try {
      const author = await this.prisma.author.findUnique({
        where: {
          id,
        },
      });
      if (author) {
        await this.prisma.author.delete({
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
