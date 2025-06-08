import { Column, Entity, ManyToOne, Relation, Unique } from 'typeorm';
import { BaseIdEntity } from './baseId.entity';
import type { User } from './user.entity';

@Entity()
@Unique(['provider', 'subject'])
export class Credentials extends BaseIdEntity {
  @Column('varchar')
  provider!: string;

  @Column('varchar', { comment: 'User ID' })
  subject!: string;

  @ManyToOne('User', (user: User) => user.credentials, { onDelete: 'CASCADE', nullable: false })
  user!: Relation<User>;
}
