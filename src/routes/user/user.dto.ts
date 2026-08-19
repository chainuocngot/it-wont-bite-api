import { createZodDto } from 'nestjs-zod';
import {
  GetMeResSchema,
  GetUserByUsernameResSchema,
  GetUserIdParamSchema,
  GetUserUsernameParamSchema,
} from 'src/routes/user/user.model';

export class GetMeResDto extends createZodDto(GetMeResSchema, { codec: true }) {}

export class GetUserByUsernameResDto extends createZodDto(GetUserByUsernameResSchema, {
  codec: true,
}) {}

export class GetUserIdParamDto extends createZodDto(GetUserIdParamSchema) {}

export class GetUserUsernameParamDto extends createZodDto(GetUserUsernameParamSchema) {}
