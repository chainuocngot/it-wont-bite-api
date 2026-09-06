import { Injectable } from '@nestjs/common';
import { GetListTodoLabelResType } from 'src/routes/todo-label/todo-label.model';
import { TodoLabelRepository } from 'src/shared/repositories/todo-label.repository';

@Injectable()
export class TodoLabelService {
  constructor(private readonly todoLabelRepository: TodoLabelRepository) {}

  listTodoLabel(): Promise<GetListTodoLabelResType> {
    return this.todoLabelRepository.findMany();
  }
}
