import { Component, OnInit } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Student } from '../student.entity';

export const GET_STUDENTS = gql`
  query ($limit: Int!, $offset: Int!) {
    students(limit: $limit, offset: $offset) {
      id
      name
      email
      dob
      age
    }
  }
`;

export const DELETE_STUDENT = gql`
  mutation ($id: Int!) {
    removeStudent(id: $id) {
      id
    }
  }
`;

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  students: Student[] = [];
  student!: Student;
  private query!: QueryRef<any>;

  p: number = 1;
  itemsPerPage = 10;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.query = this.apollo.watchQuery<any>({
      query: GET_STUDENTS,
      variables: {
        offset: 0,
        limit: this.itemsPerPage,
      },
      fetchPolicy: 'no-cache',
    });

    this.query.valueChanges.subscribe((result) => {
      this.students.push(...result.data.students);
    });
  }

  //Load More Students' Data
  fetchMore() {
    this.query
      .fetchMore({
        variables: {
          offset: this.students.length,
        },
      })
      .then((result) => {
        this.students.push(...result.data.students);
      });
  }

  deleteStudent(id: number) {
    if (
      confirm('Are you sure you want to delete the student with ID : ' + id)
    ) {
      this.apollo
        .mutate<any>({
          mutation: DELETE_STUDENT,
          variables: { id },
          fetchPolicy: 'no-cache',
        })
        .subscribe(({ errors }) => {
          window.location.reload();
        });
      window.location.reload();
    }
  }
}
