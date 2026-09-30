import type { NextApiRequest, NextApiResponse } from 'next';
import DATABASE from '../../database/database.service';
import { MatchDTO, MatchResultSchema } from '../../model/database.model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(await DATABASE.getRankings());
}