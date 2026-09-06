import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ZodSerializerDto } from 'nestjs-zod';
import { GetListTodoLabelResDto } from 'src/routes/todo-label/todo-label.dto';
import { TodoLabelService } from 'src/routes/todo-label/todo-label.service';

@ApiBearerAuth()
@Controller('todo-labels')
export class TodoLabelController {
  constructor(private readonly todoLabelService: TodoLabelService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(GetListTodoLabelResDto)
  listTodoLabel() {
    return this.todoLabelService.listTodoLabel();
  }
}
