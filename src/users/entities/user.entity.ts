import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: ['member', 'admin'] })
  role: 'member' | 'admin';

  @ManyToMany(() => Task, (task) => task.assignedUsers)
  tasks: Task[];
}
