import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ValidateObjectIdPipe } from 'src/common/pipes/validate-object-id.pipe';
import { Serialize } from 'src/inteceptors/serialize.interceptor';
import { ValidationErrorResponseDto } from 'src/shared/sto.validation-error-response.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoDto } from './dto/todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Serialize(TodoDto)
  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({
    status: 500,
    description: 'Todo created succesfully',
    type: TodoDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid title/description',
    schema: {
      example: {
        statusCode: 401,
        message: ['title must be a string', 'description must be a string'],
        error: 'Bad Request',
      },
    }
  })
  create(@Body(ValidationPipe) createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Serialize(TodoDto)
  @Get()
  @ApiOperation({ summary: 'Fetch all todos' })
  @ApiResponse({
    status: 200,
    description: 'List of todos fetched succesfully',
    type: TodoDto,
    isArray: true,
  })
  findAll() {
    return this.todosService.findAll();
  }

  @Serialize(TodoDto)
  @Get(':id')
  @ApiOperation({ summary: 'Fetch a todo' })
  @ApiResponse({
    status: 200,
    description: 'todo fetched succesfully',
    type: TodoDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid id',
    type: ValidationErrorResponseDto,
  })
  findOne(@Param('id', ValidateObjectIdPipe) id: string) {
    return this.todosService.findOne(id);
  }

  @Serialize(TodoDto)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo' })
  @ApiOkResponse({
    description: 'todo updated succesfully',
    type: TodoDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid id/title/description' })
  @ApiNotFoundResponse({
    description: 'Todo not found',
    type: ValidationErrorResponseDto,
  })
  update(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body(ValidationPipe) updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Serialize(TodoDto)
  @Patch(':id/check')
  @ApiOperation({ summary: 'Check a todo' })
  @ApiOkResponse({
    description: 'todo checked succesfully',
    type: TodoDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid id' })
  @ApiNotFoundResponse({
    description: 'Todo not found',
    type: ValidationErrorResponseDto,
  })
  check(@Param('id', ValidateObjectIdPipe) id: string) {
    return this.todosService.update(id, { completed: true } as UpdateTodoDto);
  }

  @Serialize(TodoDto)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo' })
  @ApiResponse({
    status: 200,
    description: 'todo deleted succesfully',
    type: TodoDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid id',
    type: ValidationErrorResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Todo not found' })
  remove(@Param('id', ValidateObjectIdPipe) id: string) {
    return this.todosService.remove(id);
  }
}
