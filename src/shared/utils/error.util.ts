import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';

export const createUnprocessableEntityException = (
  errors: {
    field: string;
    message: string;
  }[],
) =>
  new UnprocessableEntityException({
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    errors,
    message: 'Error.Validation',
  });
