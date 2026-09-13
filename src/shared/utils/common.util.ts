import { randomBytes } from 'crypto';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import { generate } from 'random-words';

export const toPascalCase = (str: string) => upperFirst(camelCase(str));

export const messageToErrorCode = (str: string) => `Error.${toPascalCase(str)}`;

export function generateRandomPassword(length = 32): string {
  return randomBytes(length).toString('base64url').slice(0, length);
}

export const generateRandomUsername = () => {
  const words = generate({ exactly: 2 }) as string[];
  const name = words.map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join('');

  return name;
};
