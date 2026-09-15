export interface GetDiscordWebhookInfoRes {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  webhook: {
    type: number;
    id: string;
    name: string;
    avatar: null;
    channel_id: string;
    guild_id: string;
    application_id: string;
    token: string;
    url: string;
  };
}

export interface DiscordGuild {
  id: string;
  name: string;
  icon: string;
  banner: string | null;
  owner: boolean;
  permissions: number;
  permissions_new: string;
  features: string[];
}
