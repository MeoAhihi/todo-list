import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { OmitType } from '@nestjs/swagger';
import { TodoDto } from './todo.dto';

export class UpdateTodoDto extends PartialType(
  OmitType(TodoDto, ['title', 'description', 'completed', '_id']),
) {}
