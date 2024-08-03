// src/auth/user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Stream } from '../steams/stream.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number; // Primary key for the User entity

  @Column()
  name: string; // User's name

  @Column()
  email: string; // User's email

  @Column()
  password: string; // User's hashed password

  @OneToMany(() => Stream, (stream) => stream.user)
  streams: Stream[]; // Relation to the Stream entity
}
