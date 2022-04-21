import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Student } from '../student.entity';

export const GET_STUDENT = gql`
  query ($id: Int!) {
    getStudent(id: $id) {
      id
      name
      email
      age
    }
  }
`;

// export const UPDATE_STUDENT = gql`
//   mutation updateStudent(
//     $id: Int!
//     $name: String!
//     $email: String!
//     $age: Int!
//   ) {
//     updateStudent(id: $id, name: $name, email: $email, age: $age) {
//       id
//       name
//       email
//       age
//     }
//   }
// `;

export const UPDATE_STUDENT = gql`
  mutation ($id: Int!, $name: String!, $email: String!, $age: Int!) {
    updateStudent(
      updateInput: { id: $id, name: $name, email: $email, age: $age }
    ) {
      id
      name
      email
      age
    }
  }
`;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  private query!: QueryRef<any, any>;
  student!: Student;
  id!: number;
  name!: string;
  email!: string;
  age!: number;
  data: any;

  constructor(private apollo: Apollo, private route: ActivatedRoute) {
    this.id = +this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getStudent(this.id);
  }

  getStudent(id: number) {
    this.query = this.apollo.watchQuery({
      query: GET_STUDENT,
      variables: { id },
      fetchPolicy: 'no-cache',
    });

    console.log(this.query);

    this.query.valueChanges.subscribe(({ data }) => {
      console.log(data);
      this.data = data;
      this.email = this.data.getStudent.email;
      this.name = this.data.getStudent.name;
      this.age = this.data.getStudent.age;
    });
  }

  editStudent() {
    if (confirm('Are you sure to save?')) {
      let id = this.id;
      let name = this.name;
      let email = this.email;
      let age = this.age;

      this.apollo
        .mutate<any>({
          mutation: UPDATE_STUDENT,
          variables: { id, name, email, age },
          fetchPolicy: 'no-cache',
        })
        .subscribe(({ data }) => {
          if (data != null) {
            alert('Data Updated Suceesfully!');
            window.location.href = './students';
          }
        });
    }
  }
}
