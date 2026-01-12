import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { TodoStatus } from 'src/enums/todo-status';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
    @IsEnum(TodoStatus)
    @IsOptional()
    status?: TodoStatus;

    @IsString()
    @IsOptional()
    description?: string;
}
