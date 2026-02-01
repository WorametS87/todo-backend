import { IsNumber, IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TodoStatus } from 'src/enums/todo-status';

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @IsEnum(TodoStatus)
  @IsOptional()
  status?: TodoStatus;
}
