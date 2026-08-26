import { createZodDto } from 'nestjs-zod';
import {
  GetMeResSchema,
  GetUserByUsernameResSchema,
  GetUserIdParamSchema,
  GetUsernameParamSchema,
  UpdateMeBodySchema,
  UpdateMeResSchema,
} from 'src/routes/user/user.model';

export class GetMeResDto extends createZodDto(GetMeResSchema, { codec: true }) {}

export class GetUserByUsernameResDto extends createZodDto(GetUserByUsernameResSchema, {
  codec: true,
}) {}

export class GetUserIdParamDto extends createZodDto(GetUserIdParamSchema) {}

export class GetUsernameParamDto extends createZodDto(GetUsernameParamSchema) {}

export class UpdateMeBodyDto extends createZodDto(UpdateMeBodySchema) {}

export class UpdateMeResDto extends createZodDto(UpdateMeResSchema, {
  codec: true,
}) {}
