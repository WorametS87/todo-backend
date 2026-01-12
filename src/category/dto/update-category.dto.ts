import { IsEnum, IsOptional } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';
import { TodoStatus } from 'src/enums/todo-status';

export class UpdateCategoryDto extends CreateCategoryDto {
    // @IsEnum(TodoStatus)
    // @IsOptional()
    // todos?: TodoStatus;

}
