import { Module } from '@nestjs/common';

import { TodoLabelController } from './todo-label.controller';
import { TodoLabelService } from './todo-label.service';

@Module({
  controllers: [TodoLabelController],
  providers: [TodoLabelService],
})
export class TodoLabelModule {}
