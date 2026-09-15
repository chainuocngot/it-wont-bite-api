import z from 'zod';

export const GetConnectUrlQuerySchema = z
  .object({
    redirect: z.string(),
  })
  .strict();

export const GetConnectUrlResSchema = z.object({
  url: z.url(),
});

export const ConnectCallbackQuerySchema = z
  .object({
    code: z.string(),
    state: z.string(),
    guild_id: z.string(),
  })
  .strict();

export type GetConnectUrlQueryType = z.infer<typeof GetConnectUrlQuerySchema>;
export type GetConnectUrlResType = z.infer<typeof GetConnectUrlResSchema>;
export type ConnectCallbackQueryType = z.infer<typeof ConnectCallbackQuerySchema>;
