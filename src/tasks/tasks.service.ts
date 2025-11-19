import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Task } from './entities/task.entity';
import { User } from '../users/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: CreateTaskDto) {
    const users = await this.userRepository.findBy({
      id: In(data.assignedUsers),
    });

    const task = this.taskRepository.create({
      ...data,
      assignedUsers: users,
    });

    return await this.taskRepository.save(task);
  }

  async findAll(filters: any) {
    const query = this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.assignedUsers', 'user')
      .orderBy('task.id', 'DESC');

    if (filters.title)
      query.andWhere('task.title ILIKE :title', {
        title: `%${filters.title}%`,
      });
    if (filters.dueDate)
      query.andWhere('task.dueDate = :dueDate', { dueDate: filters.dueDate });
    if (filters.assignedUser)
      query.andWhere('user.id = :id', { id: filters.assignedUser });
    if (filters.name)
      query.andWhere('user.name ILIKE :name', { name: `%${filters.name}%` });
    if (filters.email)
      query.andWhere('user.email ILIKE :email', {
        email: `%${filters.email}%`,
      });

    return await query.getMany();
  }

  async update(id: number, data: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['assignedUsers'],
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    Object.assign(task, data);

    if (data.assignedUsers) {
      const users = await this.userRepository.findBy({
        id: In(data.assignedUsers),
      });
      task.assignedUsers = users;
    }

    return await this.taskRepository.save(task);
  }

  async remove(id: number) {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Task not found');
    return { message: 'Task deleted' };
  }

  async analytics() {
    return {
      totalTasks: await this.taskRepository.count(),
      completedTasks: await this.taskRepository.count({
        where: { status: 'completed' },
      }),
    };
  }
}
