import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../auth/user.entity';

@Entity()
export class Stream {
  @PrimaryGeneratedColumn()
  id: number; // Primary key for the Stream entity

  @Column()
  title: string; // Title of the stream

  @Column()
  description: string; // Description of the stream

  @Column({ nullable: true })
  url: string; // URL of the stream, nullable

  @ManyToOne(() => User, user => user.streams)
  user: User; // Many-to-One relationship with User entity
}
