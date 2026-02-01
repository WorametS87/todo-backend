import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { TodoStatus } from 'src/enums/todo-status';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly repo: Repository<Todo>,
  ) { }

  async create(dto: CreateTodoDto) {
    const todo = this.repo.create({
      title: dto.title,
      description: dto.description,
      status: dto.status || TodoStatus.PENDING,
    });
    if (dto.categoryId) {
      todo.category = { id: dto.categoryId } as Category;
    }

    const savedTodo = await this.repo.save(todo);
    // Reload with relations to include category
    return this.repo.findOne({
      where: { id: savedTodo.id },
      relations: ['category'],
    });
  }


  findAll(categoryId?: number) {
    if (categoryId) {
      return this.repo.find({
        where: { category: { id: categoryId } },
        relations: ['category'],
      });
    }
    return this.repo.find({ relations: ['category'] });
  }

  async findOne(id: number) {
    const todo = await this.repo.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!todo) throw new NotFoundException();
    return todo;
  }

  async update(id: number, dto: UpdateTodoDto) {
    const todo = await this.findOne(id);
    // Handle category update
    if (dto.categoryId !== undefined) {
      if (dto.categoryId) {
        todo.category = { id: dto.categoryId } as Category;
      } else {
        todo.category = null;
      }
    }
    // Update other fields
    if (dto.title !== undefined) todo.title = dto.title;
    if (dto.description !== undefined) todo.description = dto.description;
    if (dto.status !== undefined) todo.status = dto.status;
    
    const updatedTodo = await this.repo.save(todo);
    // Reload with relations to include category
    return this.repo.findOne({
      where: { id: updatedTodo.id },
      relations: ['category'],
    });
  }

  async remove(id: number) {
    const todo = await this.findOne(id);
    return this.repo.remove(todo);
  }

}
