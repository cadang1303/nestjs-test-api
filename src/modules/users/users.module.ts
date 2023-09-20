import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  providers: [UsersService, PrismaService, JwtStrategy],
  controllers: [UsersController],
})
export class UsersModule {}
