import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { AvatarForResultsDTO, AvatarSchema, MatchDTO, MatchForResultsSchema, MatchResultDTO, MatchSchema, RankingsSchema } from '../model/database.model';

class DatabaseService {
  private supabase = createClient(process.env.DB_URL || '', process.env.DB_KEY || '');
  private ratingConstant = 30;

  constructor() {
    // Delete matches older than 30 minutes, every hour
    setInterval(async () => {
      this.supabase.from('Matches').delete()
        .lt('created_at', new Date(Date.now() - 30 * 60 * 1000).toISOString()).then(res => console.log('deleted old matches, result:', res.statusText));
    }, 60 * 60 * 1000);
  }

  async getRankings() {
    const avatars = await this.supabase
      .from('Avatars')
      .select('id, image')
      .order('elo', { ascending: false })
      .limit(30)
      .then(res => z.array(AvatarSchema).parse(res.data));

    const count = await this.supabase
      .from('Avatars')
      .select('*', { count: 'exact', head: true })
      .then(res => z.number().parse(res.count));

    return RankingsSchema.parse({ rankings: avatars, total: count })
  }

  async getMatch() {
    const avatars = await this.supabase
      .from('avatars_random')
      .select('id, image')
      .limit(2)
      .then(res => z.array(AvatarSchema).length(2).parse(res.data));

    const matchId = await this.supabase
      .from('Matches')
      .insert({ avatar1: avatars[0].id, avatar2: avatars[1].id })
      .select('id')
      .then(res => z.string().parse(res?.data?.[0]?.id));

    return MatchSchema.parse({
      id: matchId,
      avatar1: avatars[0],
      avatar2: avatars[1]
    });
  }

  async submitMatchResults(matchResult: MatchResultDTO) {
    const matchForResults = await this.supabase
      .from('Matches')
      .select('id, avatar1:avatar1(id, elo), avatar2:avatar2(id, elo)')
      .eq('id', matchResult.id)
      .eq('submitted', false)
      .then(res => MatchForResultsSchema.parse(res.data?.[0]));

    if (matchForResults.avatar1.id !== matchResult.winner && matchForResults.avatar2.id !== matchResult.winner) return;

    this.calculateNewElos(matchForResults.avatar1, matchForResults.avatar2, matchResult.winner);

    await this.saveAvatar(matchForResults.avatar1);
    await this.saveAvatar(matchForResults.avatar2);

    await this.supabase
      .from('Matches')
      .update({ submitted: true })
      .eq('id', matchForResults.id);
  }

  private async saveAvatar(avatar: AvatarForResultsDTO) {
    await this.supabase
      .from('Avatars')
      .update({ elo: avatar.elo })
      .eq('id', avatar.id);
  }

  private calculateNewElos(avatar1: AvatarForResultsDTO, avatar2: AvatarForResultsDTO, winner: string) {
    avatar1.elo = avatar1.elo + Math.round(this.ratingConstant * ((winner === avatar1.id ? 1 : 0) - this.winProbability(avatar1.elo, avatar2.elo)));
    avatar2.elo = avatar2.elo + Math.round(this.ratingConstant * ((winner === avatar2.id ? 1 : 0) - this.winProbability(avatar2.elo, avatar1.elo)));
  }

  private winProbability(rating1: number, rating2: number) {
    return 1 / (1 + Math.pow(10, (rating2 - rating1) / 400));
  }
}

const DATABASE = new DatabaseService();

export default DATABASE;