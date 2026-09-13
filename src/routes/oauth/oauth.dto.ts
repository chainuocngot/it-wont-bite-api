import { createZodDto } from 'nestjs-zod';
import {
  DiscordAuthorizeCallbackQuerySchema,
  GetDiscordAuthorizeUrlResSchema,
  GetGoogleAuthorizeUrlResSchema,
  GoogleAuthorizeCallbackQuerySchema,
} from 'src/routes/oauth/oauth.model';

export class GetGoogleAuthorizeUrlResDto extends createZodDto(GetGoogleAuthorizeUrlResSchema, {
  codec: true,
}) {}

export class GoogleAuthorizeCallbackQueryDto extends createZodDto(
  GoogleAuthorizeCallbackQuerySchema,
) {}

export class GetDiscordAuthorizeUrlResDto extends createZodDto(GetDiscordAuthorizeUrlResSchema, {
  codec: true,
}) {}

export class DiscordAuthorizeCallbackQueryDto extends createZodDto(
  DiscordAuthorizeCallbackQuerySchema,
) {}
