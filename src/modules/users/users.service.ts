import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

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

  async updateUser(id: number, data: Prisma.UserCreateInput): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (user) {
        await this.prisma.user.update({
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
