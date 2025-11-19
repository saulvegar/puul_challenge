import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export enum TaskStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  hoursEstimate: number;

  @IsDateString()
  dueDate: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsArray()
  @ArrayNotEmpty()
  assignedUsers: number[];

  @IsNumber()
  cost: number;
}
