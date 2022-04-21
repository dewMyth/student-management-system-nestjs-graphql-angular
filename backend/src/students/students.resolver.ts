/* eslint-disable prettier/prettier */
import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { request, gql } from 'graphql-request';
import { skip, take } from 'rxjs';
import { UpdateStudentDTO } from './dto/update-student.dto';
import { Student } from './student';
import { StudentsService } from './students.service';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(private studentService: StudentsService) {}

  @Query((returns) => [Student])
  students(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
  ): Promise<Student[]> {
    return this.studentService.findAll(limit, offset);
  }

  @Query((returns) => Student)
  getStudent(@Args('id', { type: () => Int }) id: number): Promise<Student> {
    return this.studentService.findOne(id);
  }

  @Mutation((returns) => Student)
  async removeStudent(@Args('id', { type: () => Int }) id: number) {
    return this.studentService.deleteStudent(id);
  }

  @Mutation(() => Student)
  updateStudent(@Args('updateInput') student: UpdateStudentDTO) {
    return this.studentService.updateStudent(student.id, student);
  }

  //View All
  // @Query(() => [Student])
  // async students(): Promise<any> {
  //   const query = gql`
  //     query MyQuery {
  //       allStudents {
  //         nodes {
  //           id
  //           name
  //           dob
  //           email
  //           age
  //         }
  //       }
  //     }
  //   `;

  //   return request('http://localhost:5000/graphql', query).then((data) => {
  //     return data.allStudents.nodes;
  //   });
  // }

  //Get a Student
  // @Query(() => Student)
  // async student(
  //   @Args({ name: 'id', type: () => Int }) id: number,
  // ): Promise<Student> {
  //   const query = gql`query MyQuery {
  //     studentById(id : ${id}){
  //       id
  //       name
  //       email
  //       age
  //     }
  //   }`;
  //   return request('http://localhost:5000/graphql', query).then((data) => {
  //     return data.studentById;
  //   });
  // }

  //Update a student
  // async updateStudent(
  //   @Args({ name: 'id', type: () => Int }) id: number,
  //   @Args({ name: 'name', type: () => Int }) name: string,
  //   @Args({ name: 'email', type: () => Int }) email: string,
  //   @Args({ name: 'age', type: () => Int }) age: number,
  // ) {
  //   const mutation = gql`mutation MyMutation {
  //     updateStudentById(
  //       input: {
  //         studentPatch: {
  //           name : "${name}",
  //           email : "${email}",
  //           age : "${age}",
  //           id : "${id}"
  //         }
  //       }
  //     ){
  //       student {
  //         id
  //         name
  //         email
  //         age
  //       }
  //     }
  //   }`;

  //   return request('http://localhost:5000/graphql', mutation).then((data) => {
  //     return data.updateStudentById.student;
  //   });
  // }

  //Delete a Student
  // async deleteStudent(@Args('id', { type: () => Int }) id: number) {
  //   const mutation = gql`
  //   mutation MyMutation {
  //     deleteStudentById(input: { id : ${id}}){
  //       student{
  //         name
  //         email
  //         age
  //       }
  //     }
  //   }`;
  //   return request('http://localhost:5000/graphql', mutation).then((data) => {
  //     return data.deleteStudentById;
  //   });
  // }
}
