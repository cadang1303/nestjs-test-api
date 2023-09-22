import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CoursesModule } from './modules/courses/courses.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { PrismaModule } from './database/prisma.module';
import { SectionsModule } from './modules/sections/sections.module';
import { LessonsModule } from './modules/lessons/lessons.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CoursesModule,
    AuthorsModule,
    SectionsModule,
    LessonsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
