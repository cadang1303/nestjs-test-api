import { Global, Module } from '@nestjs/common';
import { EnvironmentService } from './env.service';

@Global()
@Module({
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
