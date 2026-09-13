import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { InvalidCodeException, InvalidOauthGoogleException } from 'src/routes/oauth/oauth.error';
import {
  DiscordAuthorizeCallbackQueryType,
  GetDiscordAuthorizeUrlResType,
  GetGoogleAuthorizeUrlResType,
  GoogleAuthorizeCallbackQueryType,
} from 'src/routes/oauth/oauth.model';
import { DiscordGetUserResType, DiscordTokenResponse } from 'src/routes/oauth/oauth.type';
import envConfig from 'src/shared/config';
import { UserRepository } from 'src/shared/repositories/user.repository';
import { HashingService } from 'src/shared/services/hashing.service';
import { SharedAuthService } from 'src/shared/services/shared-auth.service';
import { TokenService } from 'src/shared/services/token.service';
import { AccessTokenPayload, RefreshTokenPayload } from 'src/shared/types/token.type';
import { generateRandomPassword, generateRandomUsername } from 'src/shared/utils/common.util';

@Injectable()
export class OauthService {
  oauth2Client: OAuth2Client;

  constructor(
    private readonly tokenService: TokenService,
    private readonly hashingService: HashingService,
    private readonly userRepository: UserRepository,
    private readonly sharedAuthService: SharedAuthService,
  ) {
    this.oauth2Client = new google.auth.OAuth2({
      clientId: envConfig.GOOGLE_CLIENT_ID,
      clientSecret: envConfig.GOOGLE_CLIENT_SECRET,
      redirectUri: envConfig.GOOGLE_REDIRECT_URI,
    });
  }

  getGoogleAuthorizeUrl(): GetGoogleAuthorizeUrlResType {
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ];

    const url = this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      include_granted_scopes: true,
    });

    return { url };
  }

  async googleAuthorizeCallback(query: GoogleAuthorizeCallbackQueryType): Promise<{
    accessToken: string;
    refreshToken: string;
    accessTokenPayload: AccessTokenPayload;
    refreshTokenPayload: RefreshTokenPayload;
  }> {
    if (!query.code) {
      throw InvalidCodeException;
    }

    const { tokens } = await this.oauth2Client.getToken(query.code);
    this.oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: this.oauth2Client,
      version: 'v2',
    });
    const { data: userInfo } = await oauth2.userinfo.get();

    if (!userInfo.email || !userInfo.name) {
      throw InvalidOauthGoogleException;
    }

    // Check if already exists email
    const existingAccount = await this.userRepository.findUnique({
      where: {
        email: userInfo.email,
      },
    });

    let accessToken: string;
    let refreshToken: string;
    let refreshTokenPayload: RefreshTokenPayload;
    if (existingAccount) {
      // Login
      const tokens = await this.sharedAuthService.createAuthSession(existingAccount.id);

      accessToken = tokens.accessToken;
      refreshToken = tokens.refreshToken;
      refreshTokenPayload = tokens.refreshTokenPayload;
    } else {
      // Register
      // Pre-payload
      const randomPw = generateRandomPassword();
      const hashedPwd = await this.hashingService.hash(randomPw);

      // Create User
      const randomUsername = generateRandomUsername();
      const user = await this.userRepository.create({
        data: {
          email: userInfo.email,
          name: userInfo.name,
          username: randomUsername,
          pwd: hashedPwd,
        },
      });

      const tokens = await this.sharedAuthService.createAuthSession(user.id);

      accessToken = tokens.accessToken;
      refreshToken = tokens.refreshToken;
      refreshTokenPayload = tokens.refreshTokenPayload;
    }

    const accessTokenPayload = await this.tokenService.verifyAccessToken(accessToken);

    return {
      accessToken,
      refreshToken,
      accessTokenPayload,
      refreshTokenPayload,
    };
  }

  getDiscordAuthorizeUrl(): GetDiscordAuthorizeUrlResType {
    const url = new URL('https://discord.com/oauth2/authorize');

    url.searchParams.set('client_id', envConfig.DISCORD_CLIENT_ID);
    url.searchParams.set('scope', 'identify email');
    url.searchParams.set('redirect_uri', envConfig.DISCORD_AUTHORIZE_REDIRECT_URI);
    url.searchParams.set('response_type', 'code');

    return { url: url.toString() };
  }

  async discordAuthorizeCallback(query: DiscordAuthorizeCallbackQueryType) {
    const getTokenInfoRes = await fetch('https://discord.com/api/v10/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${envConfig.DISCORD_CLIENT_ID}:${envConfig.DISCORD_CLIENT_SECRET}`,
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: query.code,
        redirect_uri: envConfig.DISCORD_AUTHORIZE_REDIRECT_URI,
      }),
    });
    const tokenInfo = (await getTokenInfoRes.json()) as DiscordTokenResponse;

    const getUserRes = await fetch('https://discord.com/api/v10/users/@me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
      },
    });
    const userInfo = (await getUserRes.json()) as DiscordGetUserResType;

    if (!userInfo.email || !userInfo.global_name) {
      throw InvalidOauthGoogleException;
    }

    // Check if already exists email
    const existingAccount = await this.userRepository.findUnique({
      where: {
        email: userInfo.email,
      },
    });

    let accessToken: string;
    let refreshToken: string;
    let refreshTokenPayload: RefreshTokenPayload;
    if (existingAccount) {
      // Login
      const tokens = await this.sharedAuthService.createAuthSession(existingAccount.id);

      accessToken = tokens.accessToken;
      refreshToken = tokens.refreshToken;
      refreshTokenPayload = tokens.refreshTokenPayload;
    } else {
      // Register
      // Pre-payload
      const randomPw = generateRandomPassword();
      const hashedPwd = await this.hashingService.hash(randomPw);

      // Create User
      const randomUsername = generateRandomUsername();
      const user = await this.userRepository.create({
        data: {
          email: userInfo.email,
          name: userInfo.global_name,
          username: randomUsername,
          pwd: hashedPwd,
        },
      });

      const tokens = await this.sharedAuthService.createAuthSession(user.id);

      accessToken = tokens.accessToken;
      refreshToken = tokens.refreshToken;
      refreshTokenPayload = tokens.refreshTokenPayload;
    }

    const accessTokenPayload = await this.tokenService.verifyAccessToken(accessToken);

    return {
      accessToken,
      refreshToken,
      accessTokenPayload,
      refreshTokenPayload,
    };
  }
}
