/* eslint-disable prettier/prettier */
import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { StudentsService } from './students.service';
import { extname } from 'path';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('/api/students')
export class StudentsController {
  //Bull Queue
  constructor(@InjectQueue('upload-queue') private fileQueue: Queue) {}

  // constructor(private studentService: StudentsService) {}

  @Post('/upload')
  @UseInterceptors(
    ClassSerializerInterceptor,
    FileInterceptor('csv', {
      storage: diskStorage({
        destination: './csv',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  // uploadCsv(@UploadedFile() file): any {
  //   return this.studentService.saveFile(file);
  // }

  //PRODUCER
  //Bull Queue
  uploadCsv(@UploadedFile() file): any {
    this.fileQueue.add('csv', { file: file });
  }
}
