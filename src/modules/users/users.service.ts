import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

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

  async getUserById(id: number) {
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
}
