import { z } from 'zod/v4';

export const AvatarBorderNameSchema = z.enum(['gold']);

export type AvatarBorderName = z.infer<typeof AvatarBorderNameSchema>;

export const AvatarBorderSchema = z.object({
  name: AvatarBorderNameSchema,
});

export type AvatarBorderDTO = z.infer<typeof AvatarBorderSchema>;
