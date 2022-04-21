/* eslint-disable prettier/prettier */
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('student')
@ObjectType()
export class Student {
  @Field((type) => Int)
  @PrimaryColumn()
  id: number;

  @Field((type) => String)
  @Column()
  name: string;

  @Field((type) => Date)
  @Column()
  dob: Date;

  @Field((type) => String)
  @Column()
  email: string;

  @Field((type) => Int)
  @Column()
  age: number;
}
