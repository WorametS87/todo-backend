import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly repo: Repository<Todo>,
  ) {}

  create(dto: CreateTodoDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const todo = await this.repo.findOneBy({ id });
    if (!todo) throw new NotFoundException();
    return todo;
  }

  async update(id: number, dto: UpdateTodoDto) {
    const todo = await this.findOne(id);
    Object.assign(todo, dto);
    return this.repo.save(todo);
  }

  async remove(id: number) {
    const todo = await this.findOne(id);
    return this.repo.remove(todo);
  }

  async markAsDone(id: number) {
    const todo = await this.findOne(id);
    todo.markAsDone();
    return this.repo.save(todo);
  }

  async markAsPending(id: number) {
    const todo = await this.findOne(id);
    todo.markAsPending();
    return this.repo.save(todo);
  }

  async updateDescription(id: number, description: string) {
    const todo = await this.findOne(id);
    todo.updateDescription(description);
    return this.repo.save(todo);
  }
}
