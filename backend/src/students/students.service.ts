/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Student } from './student';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { UpdateStudentDTO } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  //Get All Students Service
  async findAll(limit, offset): Promise<Student[]> {
    return this.studentRepository.find({
      order: {
        id: 'ASC',
      },
      skip: offset,
      take: limit,
    });
  }

  //Get a Student Service
  findOne(id: number): Promise<Student> {
    return this.studentRepository.findOneOrFail(id);
  }

  // Delete a Student Service
  async deleteStudent(id: number) {
    console.log(id);
    await this.studentRepository.delete(id);
  }

  //Update a Student Service
  updateStudent(id: number, updateStudentInput: UpdateStudentDTO) {
    let student: Student = this.studentRepository.create(updateStudentInput);
    student.id = id;
    return this.studentRepository.save(student);
  }

  async saveFile(file: any): Promise<string[]> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const csv = require('csvtojson');
    const csvFilePath = process.cwd() + '/' + file.path;

    const studentsArray = await csv().fromFile(csvFilePath);
    let students;

    try {
      students = await this.studentRepository.save(studentsArray);
    } catch (error) {
      students = null;
    }
    return students;
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Student>> {
    return paginate<Student>(this.studentRepository, options);
  }
}
