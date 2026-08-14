import { ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';

export const UserNotFoundException = new NotFoundException('Error.UserNotFound');

export const EmailAlreadyInUsedException = new ConflictException('Error.EmailAlreadyInUsed');

export const WrongPasswordException = new UnauthorizedException('Error.WrongPassword');
