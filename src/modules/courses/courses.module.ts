import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, JwtStrategy],
})
export class CoursesModule {}
