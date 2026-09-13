export interface DiscordTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface DiscordGetUserResType {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  banner: string | null;
  accent_color: number;
  global_name: string;
  avatar_decoration_data: AvatarDecorationData;
  collectibles: Collectibles;
  display_name_styles: string | null;
  vad_colors: string | null;
  banner_color: string;
  clan: string | null;
  primary_guild: string | null;
  mfa_enabled: boolean;
  locale: string;
  premium_type: number;
  email: string;
  verified: boolean;
}

export interface AvatarDecorationData {
  asset: string;
  sku_id: string;
  expires_at: string | null;
}

export interface Collectibles {
  nameplate: Nameplate;
}

export interface Nameplate {
  sku_id: string;
  asset: string;
  label: string;
  palette: string;
}
