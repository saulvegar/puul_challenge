import {
  IsString,
  IsNumber,
  IsEnum,
  IsArray,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { TaskStatus } from './create-task.dto';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  hoursEstimate?: number;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsArray()
  @IsOptional()
  assignedUsers?: number[];

  @IsNumber()
  @IsOptional()
  cost?: number;
}
