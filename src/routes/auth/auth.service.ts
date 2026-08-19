import { Injectable } from '@nestjs/common';
import { JsonWebTokenError } from '@nestjs/jwt';
import {
  EmailAlreadyInUsedException,
  RefreshTokenNotFoundException,
  UsernameAlreadyInUsedException,
  WrongPasswordException,
} from 'src/routes/auth/auth.error';
import {
  LoginBodyType,
  LoginResType,
  LogoutBodyType,
  LogoutResType,
  RefreshTokenBodyType,
  RefreshTokenResType,
  RegisterBodyType,
  RegisterResType,
} from 'src/routes/auth/auth.model';
import { createJwtErrorException, UserNotFoundException } from 'src/shared/error';
import { UserType } from 'src/shared/models/user.model';
import { RefreshTokenRepository } from 'src/shared/repositories/refresh-token.repository';
import { UserRepository } from 'src/shared/repositories/user.repository';
import { HashingService } from 'src/shared/services/hashing.service';
import { TokenService } from 'src/shared/services/token.service';
import { isNotFoundPrismaError } from 'src/shared/utils/prisma.util';

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
    const sameEmailOrUsernameUser = await this.userRepository.findFirst({
      where: {
        OR: [{ email: body.email }, { username: body.username }],
      },
    });

    if (sameEmailOrUsernameUser !== null && sameEmailOrUsernameUser.email === body.email) {
      throw EmailAlreadyInUsedException;
    }

    if (sameEmailOrUsernameUser !== null && sameEmailOrUsernameUser.username === body.username) {
      throw UsernameAlreadyInUsedException;
    }

    // Pre-payload
    const hashedPwd = await this.hashingService.hash(body.pwd);

    // Create User
    const user = await this.userRepository.create({
      data: {
        email: body.email,
        name: body.name,
        username: body.username,
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

  async refreshToken(body: RefreshTokenBodyType): Promise<RefreshTokenResType> {
    try {
      const decodedRefreshToken = await this.tokenService.verifyRefreshToken(body.token);
      const { userId, exp } = decodedRefreshToken;

      const RTInDB = await this.refreshTokenRepository.findUnique({
        where: {
          userId_token: {
            token: body.token,
            userId,
          },
        },
      });

      if (RTInDB === null) {
        throw RefreshTokenNotFoundException;
      }

      // Sign tokens
      const $signAT = this.tokenService.signAccessToken({
        userId,
      });
      const $signNewRTWithOldExp = this.tokenService.signRefreshToken({
        userId,
        exp,
      });
      const [accessToken, newRTWithOldExp] = await Promise.all([$signAT, $signNewRTWithOldExp]);

      const $createNewRTWithOldExp = this.refreshTokenRepository.create({
        data: {
          token: newRTWithOldExp,
          userId,
          expiresAt: new Date(exp * 1000),
        },
      });
      const $deleteOldRT = this.refreshTokenRepository.delete({
        where: {
          userId_token: {
            token: body.token,
            userId,
          },
        },
      });

      await Promise.all([$createNewRTWithOldExp, $deleteOldRT]);

      return {
        accessToken,
        refreshToken: newRTWithOldExp,
      };
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw RefreshTokenNotFoundException;
      }

      if (error instanceof JsonWebTokenError) {
        throw createJwtErrorException(error.message);
      }

      throw error;
    }
  }

  async logout(userId: UserType['id'], body: LogoutBodyType): Promise<LogoutResType> {
    try {
      await this.refreshTokenRepository.delete({
        where: {
          userId_token: {
            token: body.refreshToken,
            userId,
          },
        },
      });

      return {
        message: 'Success.Logout',
      };
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw RefreshTokenNotFoundException;
      }

      throw error;
    }
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
