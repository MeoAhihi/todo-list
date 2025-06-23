import { ApiProperty } from '@nestjs/swagger';

export class ValidationErrorResponseDto {
  @ApiProperty({
    description: 'The messages of the error',
    example: 'Invalid title/description',
  }) 
  message: string[];

  @ApiProperty({
    description: 'The error code',
    example: 'Bad Request',
  })
  error: string;

  @ApiProperty({
    description: 'The status code',
    example: 400,
  })
  statusCode: number;
}
