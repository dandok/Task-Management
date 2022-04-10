import { Task } from '../tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true }) //type of property would be a task entity, how to access the user from the task entity, eager here means anytime we fetch the user it would automatically fetch the tasks for that user aswell 
  tasks: Task[];
}
