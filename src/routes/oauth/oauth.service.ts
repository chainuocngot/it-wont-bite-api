import { Injectable } from '@nestjs/common';
import { OauthUserProfile } from 'src/routes/oauth/providers/oauth-provider.interface';
import { OauthProviderRegistry } from 'src/routes/oauth/providers/oauth-provider.registry';
import { UserRepository } from 'src/shared/repositories/user.repository';
import { HashingService } from 'src/shared/services/hashing.service';
import { SharedAuthService } from 'src/shared/services/shared-auth.service';
import { TokenService } from 'src/shared/services/token.service';
import { generateRandomPassword, generateRandomUsername } from 'src/shared/utils/common.util';

@Injectable()
export class OauthService {
  constructor(
    private readonly registry: OauthProviderRegistry,
    private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService,
    private readonly sharedAuthService: SharedAuthService,
    private readonly tokenService: TokenService,
  ) {}

  getAuthorizeUrl(provider: string) {
    return this.registry.get(provider).getAuthorizeUrl();
  }

  async authorizeCallback(provider: string, query: unknown) {
    const profile = await this.registry.get(provider).authorizeCallback(query);
    return this._findOrCreateUserAndTokens(profile);
  }

  private async _findOrCreateUserAndTokens(profile: OauthUserProfile) {
    const existingAccount = await this.userRepository.findUnique({
      where: { email: profile.email },
    });
    const userId = existingAccount
      ? existingAccount.id
      : (
          await this.userRepository.create({
            data: {
              email: profile.email,
              name: profile.name,
              username: generateRandomUsername(),
              pwd: await this.hashingService.hash(generateRandomPassword()),
            },
          })
        ).id;

    const tokens = await this.sharedAuthService.createAuthSession(userId);
    const accessTokenPayload = await this.tokenService.verifyAccessToken(tokens.accessToken);

    return { ...tokens, accessTokenPayload };
  }
}
