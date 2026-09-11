import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TodoStatus } from 'src/shared/constants/todo.constant';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'checkStatusTodo',
  })
  async checkTodos() {
    const now = new Date();
    try {
      const $markOverdueTodos = this.prisma.todo.updateMany({
        where: { status: { in: [TodoStatus.Todo, TodoStatus.InProgress] }, dueAt: { lt: now } },
        data: { status: TodoStatus.Overdue },
      });
      const $removeFromTodayTodos = this.prisma.todo.updateMany({
        where: { removeFromTodayAt: { lte: now } },
        data: { removeFromTodayAt: null },
      });

      const [overdueResult, clearedTodayResult] = await this.prisma.$transaction([
        $markOverdueTodos,
        $removeFromTodayTodos,
      ]);

      this.logger.log(
        `Overdue: ${overdueResult.count}, cleared today: ${clearedTodayResult.count}`,
      );
    } catch (err) {
      this.logger.error('checkStatusTodo failed', err);
    }
  }
}
