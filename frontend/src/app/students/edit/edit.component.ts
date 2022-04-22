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
  mutation ($id: Int!, $name: String!, $email: String!) {
    updateStudent(updateInput: { id: $id, name: $name, email: $email }) {
      id
      name
      email
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

    this.query.valueChanges.subscribe(({ data }) => {
      this.data = data;
      this.email = this.data.getStudent.email;
      this.name = this.data.getStudent.name;
    });
  }

  editStudent() {
    if (confirm('Are you sure to save?')) {
      let id = this.id;
      let name = this.name;
      let email = this.email;

      console.log({ id, name, email });

      this.apollo
        .mutate<any>({
          mutation: UPDATE_STUDENT,
          variables: { id, name, email },
          fetchPolicy: 'no-cache',
        })
        .subscribe(({ data }) => {
          console.log(data);
          if (data) {
            console.log(data);
            alert('Data Updated Suceesfully!');
            window.location.href = './students';
          }
        });
    }
  }
}
