import { ConflictException, NotFoundException } from '@nestjs/common';

export const GuildNotFoundException = new NotFoundException('Error.GuildNotFound');

export const ConnectionAlreadyExistException = new ConflictException(
  'Error.ConnectionAlreadyExist',
);
