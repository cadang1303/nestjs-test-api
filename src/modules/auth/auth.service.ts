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
import { Request, Response } from 'express';

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
          const access_token = await this.handleLogin({
            id: user.id,
            email: user.email,
          });
          return res.send({ access_token });
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

  async handleLogin(data: any) {
    const { id, email } = data;
    await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        last_login: new Date(),
      },
    });
    const access_token: string = await this.jwtService.signAsync({
      id,
      email,
    });
    return access_token;
  }

  async logout(req: Request): Promise<any> {
    return req.logout((err) => {
      if (err) {
        throw err;
      }
    });
  }

  async loginSocial(req: Request, res: Response): Promise<any> {
    try {
      const reqUser: any = req.user;
      const { email, firstName, lastName, picture } = reqUser;
      const nickname = firstName + ' ' + lastName;
      const avatar_url = picture;
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        const newUser = await this.prisma.user.create({
          data: {
            email,
            nickname,
            avatar_url,
            password: '',
          },
        });

        const access_token = await this.handleLogin({ id: newUser.id, email });
        return res.send({ access_token });
      } else {
        const access_token = await this.handleLogin({ id: user.id, email });
        return res.send({ access_token });
      }
    } catch (error) {
      return { status: error.code, message: error.message };
    }
  }
}
