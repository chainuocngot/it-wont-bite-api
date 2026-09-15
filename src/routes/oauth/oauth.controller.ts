import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { type Response } from 'express';
import { OauthService } from 'src/routes/oauth/oauth.service';
import envConfig from 'src/shared/config';
import {
  COOKIES_AT_INFO_KEY,
  COOKIES_AT_KEY,
  COOKIES_RT_KEY,
} from 'src/shared/constants/auth.constant';
import { IsPublic } from 'src/shared/decorators/auth.decorator';
import { AccessTokenPayload, RefreshTokenPayload } from 'src/shared/types/token.type';

@Controller('oauth')
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Get(':provider')
  @IsPublic()
  getAuthorizeUrl(@Param('provider') provider: string) {
    return this.oauthService.getAuthorizeUrl(provider);
  }

  @Get(':provider/callback')
  @IsPublic()
  async callback(
    @Param('provider') provider: string,
    @Query() query: unknown,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokensInfo = await this.oauthService.authorizeCallback(provider, query);

    this._setAuthCookies(res, tokensInfo);

    return res.redirect(envConfig.CLIENT_URL);
  }

  private _setAuthCookies(
    res: Response,
    {
      accessToken,
      refreshToken,
      accessTokenPayload,
      refreshTokenPayload,
    }: {
      accessToken: string;
      refreshToken: string;
      accessTokenPayload: AccessTokenPayload;
      refreshTokenPayload: RefreshTokenPayload;
    },
  ) {
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
  }
}
