import { Injectable } from '@nestjs/common';
import { UserType } from 'src/shared/models/user.model';
import { RefreshTokenRepository } from 'src/shared/repositories/refresh-token.repository';
import { TokenService } from 'src/shared/services/token.service';
import { RefreshTokenPayload } from 'src/shared/types/token.type';

@Injectable()
export class SharedAuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async createAuthSession(userId: UserType['id']): Promise<{
    accessToken: string;
    refreshToken: string;
    refreshTokenPayload: RefreshTokenPayload;
  }> {
    // Sign tokens
    const $signAT = this.tokenService.signAccessToken({
      userId,
    });
    const $signRT = this.tokenService.signRefreshToken({
      userId,
    });
    const [accessToken, refreshToken] = await Promise.all([$signAT, $signRT]);

    // Create Refresh token
    const refreshTokenPayload = await this.tokenService.verifyRefreshToken(refreshToken);
    await this.refreshTokenRepository.create({
      data: {
        token: refreshToken,
        userId,
        expiresAt: new Date(refreshTokenPayload.exp * 1000),
      },
    });

    return {
      accessToken,
      refreshToken,
      refreshTokenPayload,
    };
  }
}
