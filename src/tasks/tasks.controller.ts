import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-task.filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Logger } from '@nestjs/common';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController', {timestamp: true});//the context makes it easy to understand where our log is comming from, in this case from the task controller
  
  constructor(private tasksServices: TasksService) {}

  @Get()
  async getTasks(
    @Query() fillterDTO:GetTasksFilterDTO,
    @GetUser() user: User
    ): Promise<Task[]> {
    this.logger.verbose(`User "${user.username}" retrieving all tasks. filters: ${JSON.stringify(fillterDTO)}`)
    return this.tasksServices.getTasks(fillterDTO, user);
  }

  @Post()
  createTask(
    @Body() createTaskDTO: CreateTaskDTO,
    @GetUser() user: User
    ): Promise<Task> {
    this.logger.verbose(`User "${user.username}" creating a new task. Data: ${JSON.stringify(createTaskDTO)}`)
    return this.tasksServices.createTask(createTaskDTO, user);
  }

  @Get('/:id')//need clarity on how validation works without a clear link to the DTO
  async getTaskById(
    @Param('id', ParseUUIDPipe) id: string, 
    @GetUser() user: User
    ): Promise<Task> {
    return await this.tasksServices.getTaskById(id, user)
  }

  @Delete('/:id')
  deleteTask(
    @Param('id') id: string,
    @GetUser() user: User
    ): Promise<void> {
    return this.tasksServices.deleteTask(id, user)
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string, 
    @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
    @GetUser() user: User
    ): Promise<Task> {
    const { status } = updateTaskStatusDTO;
    return this.tasksServices.updateTask(id, status, user)
  }
}
