import type { NextApiRequest, NextApiResponse } from 'next';
import DATABASE from '../../database/database.service';
import { MatchDTO, MatchResultSchema } from '../../model/database.model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const initialMatches: MatchDTO[] = [];
    initialMatches.push(await DATABASE.getMatch());
    initialMatches.push(await DATABASE.getMatch());
    res.status(200).json(initialMatches);
  } else {
    const matchResult = MatchResultSchema.parse(JSON.parse(req.body));
    await DATABASE.submitMatchResults(matchResult);
    const match = await DATABASE.getMatch();
    res.status(200).json(match);
  }
}