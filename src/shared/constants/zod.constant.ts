import z from 'zod';

export const idZod = z.number().int().positive();
export const dateTimeZod = z.codec(z.iso.datetime(), z.date(), {
  decode: (isoString) => new Date(isoString),
  encode: (date) => date.toISOString(),
});
