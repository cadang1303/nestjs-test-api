import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CoursesModule } from './modules/courses/courses.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { PrismaModule } from './database/prisma.module';
import { SectionsModule } from './modules/sections/sections.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { UploadModule } from './modules/upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EnvironmentModule } from './common/env.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CoursesModule,
    AuthorsModule,
    SectionsModule,
    LessonsModule,
    UploadModule,
    EnvironmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
