import { z } from 'zod/v4';

export const MatchResultSchema = z.object({
  id: z.string(),
  winner: z.string()
});

export type MatchResultDTO = z.infer<typeof MatchResultSchema>