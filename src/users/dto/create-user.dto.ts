import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';

export enum UserRole {
  MEMBER = 'member',
  ADMIN = 'admin',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(UserRole)
  role: UserRole;
}
