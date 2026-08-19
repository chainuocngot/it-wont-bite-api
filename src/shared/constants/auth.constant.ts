export const AUTH_TYPE_KEY = 'authType';
export const REQUEST_USER_KEY = 'activeUser';

export const COOKIES_AT_KEY = 'access_token';
export const COOKIES_RT_KEY = 'refresh_token';

export const AuthType = {
  Bearer: 'Bearer',
  None: 'None',
} as const;

export type TypeOfAuthType = (typeof AuthType)[keyof typeof AuthType];
