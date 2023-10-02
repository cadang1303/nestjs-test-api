import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvironmentService {
  constructor() {}

  isProduction() {
    return process.env.NODE_ENV === 'production';
  }
}
