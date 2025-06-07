import { z } from 'zod/v4';
import { AvatarBorderSchema } from './avatarBorder';

export const AvatarInfoPositionSchema = z.enum(['top', 'bottom', 'below']);

export type AvatarInfoPosition = z.infer<typeof AvatarInfoPositionSchema>;

export const AvatarSchema = z.object({
  id: z.string(),
  filename: z.string(),
  label: z.string(),
  link_x: z.string(),
  link_vrc: z.string(),
  discord: z.string(),
  infoPosition: AvatarInfoPositionSchema,
  avatarBorder: AvatarBorderSchema.nullable().optional(),
});

export type AvatarDTO = z.infer<typeof AvatarSchema>;

export const UserAvatarSchema = z.object({
  id: z.string(),
  filename: z.string(),
  approved: z.boolean(),
  elo: z.number().optional(),
  label: z.string(),
  link_x: z.string(),
  link_vrc: z.string(),
  discord: z.string(),
  avatarInfoPosition: AvatarInfoPositionSchema,
  avatarBorder: AvatarBorderSchema.nullable().optional(),
});

export type UserAvatarDTO = z.infer<typeof UserAvatarSchema>;