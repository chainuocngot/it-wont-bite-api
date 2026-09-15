import { Injectable } from '@nestjs/common';
import { InvalidOauthGoogleException } from 'src/routes/oauth/oauth.error';
import { DiscordAuthorizeCallbackQueryType } from 'src/routes/oauth/oauth.model';
import { DiscordGetUserResType, DiscordTokenResponse } from 'src/routes/oauth/oauth.type';
import {
  IOauthProvider,
  OauthUserProfile,
} from 'src/routes/oauth/providers/oauth-provider.interface';
import envConfig from 'src/shared/config';
import { DISCORD_API_URL } from 'src/shared/constants/endpoint.constant';
import { stringToBase64 } from 'src/shared/utils/common.util';

@Injectable()
export class DiscordOauthProvider implements IOauthProvider {
  getAuthorizeUrl() {
    const url = new URL('https://discord.com/oauth2/authorize');

    url.searchParams.set('client_id', envConfig.DISCORD_CLIENT_ID);
    url.searchParams.set('scope', 'identify email');
    url.searchParams.set('redirect_uri', envConfig.DISCORD_AUTHORIZE_REDIRECT_URI);
    url.searchParams.set('response_type', 'code');

    return { url: url.toString() };
  }

  async authorizeCallback(query: DiscordAuthorizeCallbackQueryType): Promise<OauthUserProfile> {
    const getTokenInfoRes = await fetch(`${DISCORD_API_URL}/v10/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${stringToBase64(`${envConfig.DISCORD_CLIENT_ID}:${envConfig.DISCORD_CLIENT_SECRET}`)}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: query.code,
        redirect_uri: envConfig.DISCORD_AUTHORIZE_REDIRECT_URI,
      }),
    });
    const tokenInfo = (await getTokenInfoRes.json()) as DiscordTokenResponse;

    const getUserRes = await fetch(`${DISCORD_API_URL}/v10/users/@me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
      },
    });
    const userInfo = (await getUserRes.json()) as DiscordGetUserResType;

    if (!userInfo.email || !userInfo.global_name) {
      throw InvalidOauthGoogleException;
    }

    return { email: userInfo.email, name: userInfo.global_name };
  }
}
