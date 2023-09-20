import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(data: Prisma.UserCreateInput): Promise<any> {
    const { password } = data;
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(password, salt);
    try {
      await this.prisma.user.create({ data });
      return { message: 'success' };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(data: Prisma.UserCreateInput, res: Response): Promise<any> {
    try {
      const { email, password } = data;
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (user) {
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
          const access_token: string = await this.jwtService.signAsync({
            id: user.id,
            email: user.email,
          });
          res.cookie('js4ever_token', access_token);
          return { access_token };
        }
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async logout(res: Response): Promise<any> {
    res.clearCookie('js4ever_token');
    return res.send({ message: 'Logged out successfully' });
  }

  // async getUser(): Promise<any> {}

  // async updateUser(): Promise<any> {}

  // async deleteUser(): Promise<any> {}
}
