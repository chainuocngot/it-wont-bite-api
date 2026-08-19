import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { createUnprocessableEntityException } from 'src/shared/utils/error.util';

export const EmailAlreadyInUsedException = createUnprocessableEntityException([
  {
    field: 'email',
    message: 'Error.EmailAlreadyInUsed',
  },
]);

export const UsernameAlreadyInUsedException = createUnprocessableEntityException([
  {
    field: 'username',
    message: 'Error.UsernameAlreadyInUsed',
  },
]);

export const WrongPasswordException = new UnauthorizedException('Error.WrongPassword');

export const RefreshTokenNotFoundException = new NotFoundException('Error.RefreshTokenNotFound');
