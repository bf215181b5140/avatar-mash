import { Avatar } from '../database/entities/avatar.entity';

export default function calculateElo(avatar1: Avatar, avatar2: Avatar, winner: string, matchType: 'public' | 'normal') {

  let ratingWeight = 0;

  switch (matchType) {
    case 'normal':
      ratingWeight = 30;
      break;
    case 'public':
    default:
      ratingWeight = 3;
      break;
  }

  function winProbability(rating1: number, rating2: number) {
    return 1 / (1 + Math.pow(10, (rating2 - rating1) / 400));
  }

  const change = Math.abs(Math.round(ratingWeight * ((winner === avatar1.id ? 1 : 0) - winProbability(avatar1.elo, avatar2.elo))));
  const avatar1Elo = avatar1.elo + ((winner === avatar1.id ? 1 : -1) * change);
  const avatar2Elo = avatar2.elo + ((winner === avatar2.id ? 1 : -1) * change);

  const avatar1ProperElo = avatar1.elo + Math.round(ratingWeight * ((winner === avatar1.id ? 1 : 0) - winProbability(avatar1.elo, avatar2.elo)));
  const avatar2ProperElo = avatar2.elo + Math.round(ratingWeight * ((winner === avatar2.id ? 1 : 0) - winProbability(avatar2.elo, avatar1.elo)));

  console.log('calculated elo change:', change);
  console.log('avatar1 start elo:', avatar1.elo, ' after change:', avatar1Elo, ' expected:', avatar1ProperElo, ' win prob:', winProbability(avatar1.elo, avatar2.elo), 'proper change:', Math.round(ratingWeight * ((winner === avatar1.id ? 1 : 0) - winProbability(avatar1.elo, avatar2.elo))));
  console.log('avatar2 start elo:', avatar2.elo, ' after change:', avatar2Elo, ' expected:', avatar2ProperElo, ' win prob:', winProbability(avatar2.elo, avatar1.elo), 'proper change:', Math.round(ratingWeight * ((winner === avatar2.id ? 1 : 0) - winProbability(avatar2.elo, avatar1.elo))));

  return { avatar1Elo, avatar2Elo, change };
}