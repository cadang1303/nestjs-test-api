import { Module } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { StaticController } from './static.controller';

@Module({
  controllers: [StaticController],
  providers: [JwtAuthGuard],
})
export class StaticModule {}
