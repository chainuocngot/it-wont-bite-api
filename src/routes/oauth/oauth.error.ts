import { UnauthorizedException } from '@nestjs/common';

export const InvalidCodeException = new UnauthorizedException('Error.InvalidCode');

export const InvalidOauthGoogleException = new UnauthorizedException('Error.InvalidOauthGoogle');
