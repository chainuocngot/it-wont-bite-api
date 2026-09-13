import { Controller, Get, Query, Res } from '@nestjs/common';
import { type Response } from 'express';
import { ZodSerializerDto } from 'nestjs-zod';
import {
  DiscordAuthorizeCallbackQueryDto,
  GetDiscordAuthorizeUrlResDto,
  GetGoogleAuthorizeUrlResDto,
  GoogleAuthorizeCallbackQueryDto,
} from 'src/routes/oauth/oauth.dto';
import { OauthService } from 'src/routes/oauth/oauth.service';
import envConfig from 'src/shared/config';
import {
  COOKIES_AT_INFO_KEY,
  COOKIES_AT_KEY,
  COOKIES_RT_KEY,
} from 'src/shared/constants/auth.constant';
import { IsPublic } from 'src/shared/decorators/auth.decorator';

@Controller('oauth')
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Get('google')
  @IsPublic()
  @ZodSerializerDto(GetGoogleAuthorizeUrlResDto)
  getGoogleAuthorizeUrl() {
    return this.oauthService.getGoogleAuthorizeUrl();
  }

  @Get('google/callback')
  @IsPublic()
  async googleAuthorizeCallback(
    @Res({ passthrough: true }) res: Response,
    @Query() query: GoogleAuthorizeCallbackQueryDto,
  ) {
    const { accessToken, refreshToken, accessTokenPayload, refreshTokenPayload } =
      await this.oauthService.googleAuthorizeCallback(query);

    res.cookie(COOKIES_AT_KEY, accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      expires: new Date(accessTokenPayload.exp * 1000),
    });
    res.cookie(COOKIES_RT_KEY, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      expires: new Date(refreshTokenPayload.exp * 1000),
    });
    res.cookie(
      COOKIES_AT_INFO_KEY,
      JSON.stringify({
        exp: accessTokenPayload.exp,
        lifeTime: accessTokenPayload.exp - accessTokenPayload.iat,
      }),
      {
        secure: true,
        sameSite: 'lax',
        path: '/',
        expires: new Date(accessTokenPayload.exp * 1000),
      },
    );

    return res.redirect(envConfig.CLIENT_URL);
  }

  @Get('discord')
  @IsPublic()
  @ZodSerializerDto(GetDiscordAuthorizeUrlResDto)
  getDiscordAuthorizeUrl() {
    return this.oauthService.getDiscordAuthorizeUrl();
  }

  @Get('discord/callback')
  @IsPublic()
  async discordAuthorizeExchange(
    @Res({ passthrough: true }) res: Response,
    @Query() query: DiscordAuthorizeCallbackQueryDto,
  ) {
    const { accessToken, refreshToken, accessTokenPayload, refreshTokenPayload } =
      await this.oauthService.discordAuthorizeCallback(query);

    res.cookie(COOKIES_AT_KEY, accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      expires: new Date(accessTokenPayload.exp * 1000),
    });
    res.cookie(COOKIES_RT_KEY, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      expires: new Date(refreshTokenPayload.exp * 1000),
    });
    res.cookie(
      COOKIES_AT_INFO_KEY,
      JSON.stringify({
        exp: accessTokenPayload.exp,
        lifeTime: accessTokenPayload.exp - accessTokenPayload.iat,
      }),
      {
        secure: true,
        sameSite: 'lax',
        path: '/',
        expires: new Date(accessTokenPayload.exp * 1000),
      },
    );

    return res.redirect(envConfig.CLIENT_URL);
  }
}
