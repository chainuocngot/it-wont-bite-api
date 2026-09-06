import { Injectable } from '@nestjs/common';
import { TodoNotFoundException } from 'src/routes/todo/todo.error';
import {
  CreateTodoBodyType,
  CreateTodoResType,
  DeleteTodoResType,
  GetTodoDetailResType,
  ListTodoResType,
  UpdateTodoBodyType,
  UpdateTodoResType,
} from 'src/routes/todo/todo.model';
import { TodoType } from 'src/shared/models/todo.model';
import { UserType } from 'src/shared/models/user.model';
import { TodoRepository } from 'src/shared/repositories/todo.repository';
import { PrismaService } from 'src/shared/services/prisma.service';
import { isNotFoundPrismaError } from 'src/shared/utils/prisma.util';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  createTodo(userId: UserType['id'], body: CreateTodoBodyType): Promise<CreateTodoResType> {
    return this.todoRepository.create({
      data: {
        ...body,
        userId,
      },
    });
  }

  listTodo(userId: UserType['id']): Promise<ListTodoResType> {
    return this.todoRepository.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        labels: {
          omit: {
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  async updateTodo({
    userId,
    todoId,
    body,
  }: {
    userId: UserType['id'];
    todoId: TodoType['id'];
    body: UpdateTodoBodyType;
  }): Promise<UpdateTodoResType> {
    try {
      const { labels: labelIds, ...restBody } = body;

      return await this.todoRepository.update({
        where: {
          id: todoId,
          userId,
        },
        data: {
          ...restBody,
          ...(labelIds !== undefined && {
            labels: {
              set: labelIds.map((id) => ({ id })),
            },
          }),
        },
      });
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw TodoNotFoundException;
      }

      throw error;
    }
  }

  async getTodoDetail({
    userId,
    todoId,
  }: {
    userId: UserType['id'];
    todoId: TodoType['id'];
  }): Promise<GetTodoDetailResType> {
    const todo = await this.todoRepository.findUnique({
      where: {
        id: todoId,
        userId,
      },
    });

    if (todo === null) {
      throw TodoNotFoundException;
    }

    return todo;
  }

  async deleteTodo({
    userId,
    todoId,
  }: {
    userId: UserType['id'];
    todoId: TodoType['id'];
  }): Promise<DeleteTodoResType> {
    try {
      await this.todoRepository.delete({
        where: {
          id: todoId,
          userId,
        },
      });

      return {
        message: 'Success.DeleteTodo',
      };
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw TodoNotFoundException;
      }

      throw error;
    }
  }
}
