import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';

export const toPascalCase = (str: string) => upperFirst(camelCase(str));

export const messageToErrorCode = (str: string) => `Error.${toPascalCase(str)}`;
