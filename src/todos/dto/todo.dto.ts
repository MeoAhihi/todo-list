import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TodoDto {
  @ApiProperty({
    description: 'The title of the todo',
    example: 'Buy milk',
  })
  @Expose()
  title: string;

  @ApiProperty({
    description: 'The description of the todo',
    example: 'Buy milk from the store',
    required: false,
  })
  @Expose()
  description?: string;

  @ApiProperty({
    description: 'The completed status of the todo',
    example: false,
  })
  @Expose()
  completed: boolean;

  @ApiProperty({
    description: 'The date the todo was created',
    example: '2021-01-01T00:00:00.000Z',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'ID of the todo',
    example: '6853888df95abfb58e956f30',
  })
  @Expose()
  _id: string;
}
