import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports: [PrismaModule],
  controllers: [CoursesController],
  providers: [CoursesService, JwtStrategy],
})
export class CoursesModule {}
