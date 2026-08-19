import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { messageToErrorCode } from 'src/shared/utils/common.util';

export const createJwtErrorException = (message: string) =>
  new UnauthorizedException(messageToErrorCode(message));

export const UserNotFoundException = new NotFoundException('Error.UserNotFound');
