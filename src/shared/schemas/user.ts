import { z } from 'zod/v4';
import { AvatarSchema } from './avatar';

export const UserSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  image: z.string(),
  link_x: z.string(),
  link_vrc: z.string(),
  discord: z.string(),
  avatars: z.array(AvatarSchema).optional(),
});

export type UserDTO = z.infer<typeof UserSchema>;