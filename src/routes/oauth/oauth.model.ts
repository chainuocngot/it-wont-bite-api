import z from 'zod';

// Get Google Authorize Url
export const GetGoogleAuthorizeUrlResSchema = z.object({
  url: z.url(),
});

// Google Authorize Callback
export const GoogleAuthorizeCallbackQuerySchema = z.object({
  code: z.string(),
});

// Get Discord Authorize Url
export const GetDiscordAuthorizeUrlResSchema = z.object({
  url: z.url(),
});

// Discord Authorize Callback
export const DiscordAuthorizeCallbackQuerySchema = z.object({
  code: z.string(),
  // guild_id: z.string(),
  // permissions: z.string(),
});

export type GetGoogleAuthorizeUrlResType = z.infer<typeof GetGoogleAuthorizeUrlResSchema>;
export type GoogleAuthorizeCallbackQueryType = z.infer<typeof GoogleAuthorizeCallbackQuerySchema>;
export type GetDiscordAuthorizeUrlResType = z.infer<typeof GetDiscordAuthorizeUrlResSchema>;
export type DiscordAuthorizeCallbackQueryType = z.infer<typeof DiscordAuthorizeCallbackQuerySchema>;
