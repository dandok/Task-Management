import { Exclude } from 'class-transformer';
import { User } from '../auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { TaskStatus } from './task-status.enum';

@Entity() //this tells typeorm that this is a db entity - model
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(_type => User, user => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })//whenever i print that object into plain text i want to exclude the user object. whenever you send a response in jason that counts as plaintext from this packages point of view 
  user: User;
}