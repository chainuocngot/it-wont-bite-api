import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ZodSerializerDto } from 'nestjs-zod';
import { DeleteTodoResDto, GetTodoDetailResDto } from 'src/routes/auth/auth.dto';
import {
  CreateTodoBodyDto,
  CreateTodoResDto,
  GetTodoIdParamDto,
  ListTodoResDto,
  UpdateTodoBodyDto,
  UpdateTodoResDto,
} from 'src/routes/todo/todo.dto';
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

  @Get()
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(ListTodoResDto)
  listTodo(@ActiveUser('userId') userId: UserType['id']) {
    return this.todoService.listTodo(userId);
  }

  @Patch(':todoId')
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(UpdateTodoResDto)
  updateTodo(
    @ActiveUser('userId') userId: UserType['id'],
    @Param() param: GetTodoIdParamDto,
    @Body() body: UpdateTodoBodyDto,
  ) {
    return this.todoService.updateTodo({
      userId,
      todoId: param.todoId,
      body,
    });
  }

  @Get(':todoId')
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(GetTodoDetailResDto)
  getTodoDetail(@ActiveUser('userId') userId: UserType['id'], @Param() param: GetTodoIdParamDto) {
    return this.todoService.getTodoDetail({
      userId,
      todoId: param.todoId,
    });
  }

  @Delete(':todoId')
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(DeleteTodoResDto)
  deleteTodo(@ActiveUser('userId') userId: UserType['id'], @Param() param: GetTodoIdParamDto) {
    return this.todoService.deleteTodo({
      userId,
      todoId: param.todoId,
    });
  }
}
