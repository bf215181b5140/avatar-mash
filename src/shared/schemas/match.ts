import { z } from 'zod/v4';
import { AvatarSchema } from './avatar';

export const MatchSchema = z.object({
  id: z.string(),
  avatar1: AvatarSchema,
  avatar2: AvatarSchema,
  submitted: z.boolean(),
  winner: z.number().nullable(),
  change: z.number().nullable(),
});

export type MatchDTO = z.infer<typeof MatchSchema>;