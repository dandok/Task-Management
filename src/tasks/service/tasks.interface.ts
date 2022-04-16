import { Injectable } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';
import { CreateTaskDTO } from '../dto/create-task.dto';
import { GetTasksFilterDTO } from '../dto/get-task.filter.dto';
import { Task } from '../task.entity';
import { User } from '../../auth/user.entity';


export default interface ITasksService {
  getTasks(fillterDTO: GetTasksFilterDTO, user: User): Promise<Task[]>;
  createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task>;
  getTaskById(id: string, user: User): Promise<Task>;
  deleteTask(id: string, user: User): Promise<void>;
  updateTask(id: string, status: TaskStatus, user: User): Promise<Task>;
}
