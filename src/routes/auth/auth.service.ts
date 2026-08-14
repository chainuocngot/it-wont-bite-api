import { Injectable } from '@nestjs/common';
import {
  EmailAlreadyInUsedException,
  UserNotFoundException,
  WrongPasswordException,
} from 'src/routes/auth/auth.error';
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
} from 'src/routes/auth/auth.model';
import { UserType } from 'src/shared/models/user.model';
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

    const { accessToken, refreshToken } = await this._createAuthSession(user.id);

    return {
      accessToken,
      refreshToken,
    };
  }

  async login(body: LoginBodyType): Promise<LoginResType> {
    const user = await this.userRepository.findUnique({
      where: {
        email: body.email,
      },
    });

    if (user === null) {
      throw UserNotFoundException;
    }

    const isMatchPwd = await this.hashingService.compare(body.pwd, user.pwd);
    if (!isMatchPwd) {
      throw WrongPasswordException;
    }

    const { accessToken, refreshToken } = await this._createAuthSession(user.id);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async _createAuthSession(userId: UserType['id']): Promise<{
    accessToken: string;
    refreshToken: string;
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
    };
  }
}
