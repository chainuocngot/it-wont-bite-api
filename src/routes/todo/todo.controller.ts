import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ZodSerializerDto } from 'nestjs-zod';
import { CreateTodoBodyDto, CreateTodoResDto } from 'src/routes/todo/todo.dto';
import { TodoService } from 'src/routes/todo/todo.service';
import { ActiveUser } from 'src/shared/decorators/active-user.decorator';
import { UserType } from 'src/shared/models/user.model';

@ApiBearerAuth()
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ZodSerializerDto(CreateTodoResDto)
  createTodo(@ActiveUser('userId') userId: UserType['id'], @Body() body: CreateTodoBodyDto) {
    return this.todoService.createTodo(userId, body);
  }
}
