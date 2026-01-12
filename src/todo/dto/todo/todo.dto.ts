import { Category } from 'src/category/category.entity';
import { TodoStatus } from '../enums/todo-status';

export interface TodoDto {
  id: number;
  title: string;
  description?: string;
  status: TodoStatus;
  category?: Category | null;
  createdAt: Date;
  updatedAt: Date;
}
