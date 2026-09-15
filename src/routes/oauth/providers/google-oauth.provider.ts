import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { InvalidCodeException, InvalidOauthGoogleException } from 'src/routes/oauth/oauth.error';
import { GoogleAuthorizeCallbackQueryType } from 'src/routes/oauth/oauth.model';
import {
  IOauthProvider,
  OauthUserProfile,
} from 'src/routes/oauth/providers/oauth-provider.interface';
import envConfig from 'src/shared/config';

@Injectable()
export class GoogleOauthProvider implements IOauthProvider {
  private oauth2Client: OAuth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2({
      clientId: envConfig.GOOGLE_CLIENT_ID,
      clientSecret: envConfig.GOOGLE_CLIENT_SECRET,
      redirectUri: envConfig.GOOGLE_REDIRECT_URI,
    });
  }

  getAuthorizeUrl() {
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

  async authorizeCallback(query: GoogleAuthorizeCallbackQueryType): Promise<OauthUserProfile> {
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

    return { email: userInfo.email, name: userInfo.name };
  }
}
