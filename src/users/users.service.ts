import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Task } from '../tasks/entities/task.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  create(dto: CreateUserDto) {
    const user = this.userRepo.create(dto);
    return this.userRepo.save(user);
  }

  async findAll(filters: { name?: string; email?: string; role?: string }) {
    const { name, email, role } = filters;

    const qb = this.userRepo.createQueryBuilder('user');

    if (name) qb.andWhere('user.name ILIKE :name', { name: `%${name}%` });
    if (email) qb.andWhere('user.email ILIKE :email', { email: `%${email}%` });
    if (role) qb.andWhere('user.role = :role', { role });

    const users = await qb.getMany();
    const result = [];

    for (const user of users) {
      const tasks = await this.tasksRepository.find({
        where: { assignedUsers: { id: user.id } },
      });

      const completedTasks = tasks.filter(
        (t) => t.status === 'completed',
      ).length;

      const totalCost = tasks.reduce((sum, t) => sum + (t.cost ?? 0), 0);

      result.push({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        completedTasks,
        totalCost,
      });
    }

    return result;
  }
}
