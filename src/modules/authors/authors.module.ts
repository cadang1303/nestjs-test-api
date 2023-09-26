import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  providers: [AuthorsService, JwtStrategy],
  controllers: [AuthorsController],
})
export class AuthorsModule {}
