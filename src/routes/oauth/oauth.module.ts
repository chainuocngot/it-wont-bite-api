import { Module } from '@nestjs/common';
import { DiscordOauthProvider } from 'src/routes/oauth/providers/discord-oauth.provider';
import { GoogleOauthProvider } from 'src/routes/oauth/providers/google-oauth.provider';
import { OauthProviderRegistry } from 'src/routes/oauth/providers/oauth-provider.registry';

import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';

@Module({
  controllers: [OauthController],
  providers: [OauthService, OauthProviderRegistry, GoogleOauthProvider, DiscordOauthProvider],
})
export class OauthModule {}
