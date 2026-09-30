import { z } from 'zod';

export const AvatarTableSchema = z.object({
  id: z.string(),
  image: z.string(),
  elo: z.number(),
});

export type AvatarTableDTO = z.infer<typeof AvatarTableSchema>;

export const AvatarSchema = z.object({
  id: z.string(),
  image: z.string(),
});

export type AvatarDTO = z.infer<typeof AvatarSchema>;

export const AvatarForResultsSchema = z.object({
  id: z.string(),
  elo: z.number(),
});

export type AvatarForResultsDTO = z.infer<typeof AvatarForResultsSchema>;

export const MatchTableSchema = z.object({
  id: z.string(),
  avatar1: z.string(),
  avatar2: z.string(),
});

export type MatchTableDTO = z.infer<typeof MatchTableSchema>;

export const MatchSchema = z.object({
  id: z.string(),
  avatar1: AvatarSchema,
  avatar2: AvatarSchema,
});

export type MatchDTO = z.infer<typeof MatchSchema>;

export const MatchForResultsSchema = z.object({
  id: z.string(),
  avatar1: AvatarForResultsSchema,
  avatar2: AvatarForResultsSchema,
});

export type MatchForResultsDTO = z.infer<typeof MatchForResultsSchema>;

export const MatchResultSchema = z.object({
  id: z.string(),
  winner: z.string(),
});

export type MatchResultDTO = z.infer<typeof MatchResultSchema>;

export const RankingsSchema = z.array(AvatarSchema);

export type RankingsDTO = z.infer<typeof RankingsSchema>;
