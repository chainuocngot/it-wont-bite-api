import { UnauthorizedException } from '@nestjs/common';
import { createUnprocessableEntityException } from 'src/shared/utils/error.util';

export const EmailAlreadyInUsedException = createUnprocessableEntityException([
  {
    field: 'email',
    message: 'Error.EmailAlreadyInUsed',
  },
]);

export const WrongPasswordException = new UnauthorizedException('Error.WrongPassword');

export const RefreshTokenNotFoundException = new UnauthorizedException(
  'Error.RefreshTokenNotFound',
);
