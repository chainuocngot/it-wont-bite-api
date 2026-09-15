import { createZodDto } from 'nestjs-zod';
import {
  ConnectCallbackQuerySchema,
  GetConnectUrlQuerySchema,
  GetConnectUrlResSchema,
} from 'src/routes/discord-webhook/discord-webhook.model';

export class GetConnectUrlQueryDto extends createZodDto(GetConnectUrlQuerySchema) {}

export class GetConnectUrlResDto extends createZodDto(GetConnectUrlResSchema, {
  codec: true,
}) {}

export class ConnectCallbackQueryDto extends createZodDto(ConnectCallbackQuerySchema, {
  codec: true,
}) {}
