import { Injectable } from '@nestjs/common';
import {
  ConnectionAlreadyExistException,
  GuildNotFoundException,
} from 'src/routes/discord-webhook/discord-webhook.error';
import {
  ConnectCallbackQueryType,
  GetConnectUrlQueryType,
  GetConnectUrlResType,
} from 'src/routes/discord-webhook/discord-webhook.model';
import {
  DiscordGuild,
  GetDiscordWebhookInfoRes,
} from 'src/routes/discord-webhook/discord-webhook.type';
import envConfig from 'src/shared/config';
import { DISCORD_API_URL } from 'src/shared/constants/endpoint.constant';
import { UserType } from 'src/shared/models/user.model';
import { DiscordWebhookRepository } from 'src/shared/repositories/discord-webhook.repository';
import { base64ToObject, objectToBase64, stringToBase64 } from 'src/shared/utils/common.util';

@Injectable()
export class DiscordWebhookService {
  constructor(private readonly discordWebhookRepository: DiscordWebhookRepository) {}

  async getConnectUrl(
    userId: UserType['id'],
    query: GetConnectUrlQueryType,
  ): Promise<GetConnectUrlResType> {
    const existingConnection = await this.discordWebhookRepository.findUnique({
      where: {
        userId,
      },
    });

    if (existingConnection) {
      throw ConnectionAlreadyExistException;
    }

    const state = objectToBase64({ userId, ...query });

    const url = new URL(`${DISCORD_API_URL}/oauth2/authorize`);

    url.searchParams.set('client_id', envConfig.DISCORD_CLIENT_ID);
    url.searchParams.set('scope', 'webhook.incoming guilds');
    url.searchParams.set('redirect_uri', envConfig.DISCORD_CONNECT_REDIRECT_URI);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('state', state);

    return {
      url: url.toString(),
    };
  }

  async callback(query: ConnectCallbackQueryType): Promise<string> {
    const { userId, redirect } = base64ToObject(query.state) as GetConnectUrlQueryType & {
      userId: UserType['id'];
    };

    const getDiscordWebhookInfoRes = await fetch(`${DISCORD_API_URL}/v10/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${stringToBase64(`${envConfig.DISCORD_CLIENT_ID}:${envConfig.DISCORD_CLIENT_SECRET}`)}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: query.code,
        redirect_uri: envConfig.DISCORD_CONNECT_REDIRECT_URI,
      }),
    });
    const discordWebhookInfo = (await getDiscordWebhookInfoRes.json()) as GetDiscordWebhookInfoRes;

    const connectedGuildInfo = await fetch(`${DISCORD_API_URL}/users/@me/guilds`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${discordWebhookInfo.access_token}` },
    }).then(async (res) => {
      const guilds = (await res.json()) as DiscordGuild[];
      return guilds.find((guild) => guild.id === discordWebhookInfo.webhook.guild_id);
    });

    if (!connectedGuildInfo?.name) {
      throw GuildNotFoundException;
    }

    await this.discordWebhookRepository.create({
      data: {
        webhookUrl: discordWebhookInfo.webhook.url,
        name: `${connectedGuildInfo.name} - [${discordWebhookInfo.webhook.channel_id}]`,
        userId,
      },
    });

    return redirect;
  }
}
