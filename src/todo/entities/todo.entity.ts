import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { TodoStatus } from '../dto/enums/todo-status';
import { Category } from '../../category/category.entity';

@Entity('todo')
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.PENDING,
  })
  status: TodoStatus;

  markAsDone() {
    this.status = TodoStatus.DONE;
  }

  markAsPending() {
    this.status = TodoStatus.PENDING;
  }

  updateDescription(description: string) {
    this.description = description;
  }

  @ManyToOne(() => Category, { nullable: true })
  category?: Category;
}
