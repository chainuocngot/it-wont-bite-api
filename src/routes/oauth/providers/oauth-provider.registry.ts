import { Injectable, NotFoundException } from '@nestjs/common';
import { DiscordOauthProvider } from 'src/routes/oauth/providers/discord-oauth.provider';
import { GoogleOauthProvider } from 'src/routes/oauth/providers/google-oauth.provider';
import { IOauthProvider } from 'src/routes/oauth/providers/oauth-provider.interface';

@Injectable()
export class OauthProviderRegistry {
  private readonly providers = new Map<string, IOauthProvider>();

  constructor(
    private readonly google: GoogleOauthProvider,
    private readonly discord: DiscordOauthProvider,
  ) {
    this.providers.set('google', google);
    this.providers.set('discord', discord);
  }

  get(name: string): IOauthProvider {
    const provider = this.providers.get(name);

    if (!provider) {
      throw new NotFoundException(`Unsupported oauth provider: ${name}`);
    }

    return provider;
  }
}
