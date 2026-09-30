import { DatabaseService } from '../../database/database.service';
import { NextFunction, Request, Response } from 'express';
import { BaseRouter } from '../base.router';
import { Avatar } from '../../database/entities/avatar.entity';
import { Match } from '../../database/entities/match.entity';
import { MatchSchema } from '../../../shared/schemas/match';
import { Brackets } from 'typeorm';
import { MatchResultSchema } from '../../../shared/schemas/matchResult';
import calculateElo from '../../hooks/calculateElo.hook';

export class MatchRouter extends BaseRouter {

  constructor(private database: DatabaseService) {
    super();

    this.route.get('/', this.get());
    this.route.post('/', this.post());
  }

  private get() {
    return async (req: Request, res: Response, next: NextFunction) => {

      const result = await this.generateMatch();

      res.send(MatchSchema.parse(result));
    };
  }

  private post() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const matchResult = MatchResultSchema.parse(req.body);
      const matchType = req.user ? 'normal' : 'public';

      await this.database.transaction(async em => {
        const match = await em.createQueryBuilder<Match>(Match, 'match')
          .innerJoinAndSelect('match.avatar1', 'avatar1')
          .innerJoinAndSelect('match.avatar2', 'avatar2')
          .addSelect(['avatar1.elo', 'avatar2.elo'])
          .where('match.id = :id', { id: matchResult.id })
          .andWhere('match.submitted = :submitted', { submitted: false })
          .andWhere(new Brackets((qb) => qb
            .where('match.avatar1 = :avatar1', { avatar1: matchResult.winner })
            .orWhere('match.avatar2 = :avatar2', { avatar2: matchResult.winner })))
          .getOneOrFail();

        const { avatar1Elo, avatar2Elo, change } = calculateElo(match.avatar1, match.avatar2, matchResult.winner, matchType);

        await em.update(Avatar, { id: match.avatar1.id }, { elo: avatar1Elo });
        await em.update(Avatar, { id: match.avatar2.id }, { elo: avatar2Elo });
        await em.update(Match, { id: match.id }, { submitted: true, change: change });
      });

      const result = await this.generateMatch();

      res.send(MatchSchema.parse(result));
    };
  }

  private async generateMatch() {
    return await this.database.transaction(async em => {
      const avatars = await em.createQueryBuilder<Avatar>(Avatar, 'avatar')
        .where('avatar.approved = 1')
        .orderBy('rand()')
        .take(2)
        .getMany();

      if (avatars.length !== 2) throw new Error(`Couldn't select two avatars.`);

      const tempMatch = new Match();
      tempMatch.avatar1 = avatars[0];
      tempMatch.avatar2 = avatars[1];

      return await em.save(tempMatch);
    });
  }
}