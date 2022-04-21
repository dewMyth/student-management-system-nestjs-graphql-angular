/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { Student } from './student';
import { BullModule } from '@nestjs/bull';
import { StudentsResolver } from './students.resolver';
import { UploadProcessor } from './processors/upload.processor';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, StudentsResolver, UploadProcessor],
  imports: [
    TypeOrmModule.forFeature([Student]),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'upload-queue',
    }),
  ],
})
export class StudentsModule {}
