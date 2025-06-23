import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { TodoDto } from './todo.dto';

export class CreateTodoDto extends OmitType(TodoDto, ['title', 'description']) {
  @ApiProperty({
    description: 'The title of the todo',
    example: 'Buy milk',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the todo',
    example: 'Buy milk from the store',
    required: false,
  })
  @IsString()
  description?: string;
}
