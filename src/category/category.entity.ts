import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../todo/entities/base.entity';
import { Todo } from '../todo/entities/todo.entity';

@Entity('category')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Todo, (todo) => todo.category)
  todos: Todo[];
}
