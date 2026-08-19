import { ProjectedUserSchema } from 'src/shared/models/user.model';
import z from 'zod';

// Get Me
export const GetMeResSchema = ProjectedUserSchema;

export type GetMeResType = z.infer<typeof GetMeResSchema>;
