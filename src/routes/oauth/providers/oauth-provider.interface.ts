export interface OauthUserProfile {
  email: string;
  name: string;
}

export interface IOauthProvider {
  getAuthorizeUrl(): { url: string };
  authorizeCallback(query: unknown): Promise<OauthUserProfile>;
}
