import { z } from 'zod/v4';
import { AvatarBorderSchema } from './avatarBorder';

export const AvatarSchema = z.object({
  id: z.string(),
  filename: z.string(),
  avatarBorder: AvatarBorderSchema.nullable().optional(),
});

export type AvatarDTO = z.infer<typeof AvatarSchema>;

export const UserAvatarSchema = z.object({
  id: z.string(),
  filename: z.string(),
  elo: z.number().optional(),
  approved: z.boolean(),
  archived: z.boolean(),
  avatarBorder: AvatarBorderSchema.nullable().optional(),
});

export type UserAvatarDTO = z.infer<typeof UserAvatarSchema>;