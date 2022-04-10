import { TaskStatus } from "../task-status.enum";
import { IsEnum, IsString, IsOptional } from 'class-validator';

export class GetTasksFilterDTO {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}