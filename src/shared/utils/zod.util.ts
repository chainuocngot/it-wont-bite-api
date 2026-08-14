import { RefinementCtx } from 'zod';

type PasswordMatch = {
  pwd: string;
  cf_pwd: string;
};

export const validatePasswordMatch = (body: PasswordMatch, ctx: RefinementCtx) => {
  if (body.cf_pwd !== body.pwd) {
    ctx.addIssue({
      code: 'custom',
      path: ['cf_pwd'],
      message: 'Error.ConfirmPasswordNotMatch',
    });
  }
};
