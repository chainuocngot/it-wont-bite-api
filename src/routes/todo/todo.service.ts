import { Injectable } from '@nestjs/common';
import { CreateTodoBodyType, CreateTodoResType, ListTodoResType } from 'src/routes/todo/todo.model';
import { UserType } from 'src/shared/models/user.model';
import { TodoRepository } from 'src/shared/repositories/todo.repository';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  createTodo(userId: UserType['id'], body: CreateTodoBodyType): Promise<CreateTodoResType> {
    return this.todoRepository.create({
      data: {
        status: body.status,
        title: body.title,
        userId,
      },
    });
  }

  listTodo(userId: UserType['id']): Promise<ListTodoResType> {
    return this.todoRepository.findMany({
      where: {
        userId,
      },
    });
  }
}
