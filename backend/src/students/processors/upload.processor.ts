// /* eslint-disable prettier/prettier */
// /* eslint-disable @typescript-eslint/no-var-requires */
import { Process, Processor } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { Repository } from 'typeorm';
import { Student } from '../student';

//CONSUMER
@Processor('upload-queue')
export class UploadProcessor {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  @Process('csv')
  async handleCsvfiles(job: Job) {
    const csv = require('csvtojson');
    const csvFilePath = process.cwd() + '/' + job.data.file.path;
    const studentsArray = await csv().fromFile(csvFilePath);
    await this.studentRepository.save(studentsArray);
  }
}
