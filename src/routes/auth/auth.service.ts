import { Injectable } from '@nestjs/common';
import { EmailAlreadyInUsedException } from 'src/routes/auth/auth.error';
import { RegisterBodyType, RegisterResType } from 'src/routes/auth/auth.model';
import { RefreshTokenRepository } from 'src/shared/repositories/refresh-token.repository';
import { UserRepository } from 'src/shared/repositories/user.repository';
import { HashingService } from 'src/shared/services/hashing.service';
import { TokenService } from 'src/shared/services/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async register(body: RegisterBodyType): Promise<RegisterResType> {
    // Pre-check
    const sameEmailUser = await this.userRepository.findUnique({
      where: {
        email: body.email,
      },
    });

    if (sameEmailUser !== null) {
      throw EmailAlreadyInUsedException;
    }

    // Pre-payload
    const hashedPwd = await this.hashingService.hash(body.pwd);

    // Create User
    const user = await this.userRepository.create({
      data: {
        email: body.email,
        name: body.name,
        pwd: hashedPwd,
      },
    });

    // Sign tokens
    const $signAT = this.tokenService.signAccessToken({
      userId: user.id,
    });
    const $signRT = this.tokenService.signRefreshToken({
      userId: user.id,
    });
    const [accessToken, refreshToken] = await Promise.all([$signAT, $signRT]);

    // Create Refresh token
    const refreshTokenPayload = await this.tokenService.verifyRefreshToken(refreshToken);
    await this.refreshTokenRepository.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(refreshTokenPayload.exp * 1000),
      },
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
