import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { BaseIdEntity } from './baseId.entity';
import type { User } from './user.entity';
import type { AvatarBorder } from './avatarBorder.entity';

@Entity()
export class Avatar extends BaseIdEntity {
  @Column({ unique: true })
  filename!: string;

  @Column({ default: 1300, select: false })
  elo!: number;

  @Column({ default: 0, select: false })
  approved!: boolean;

  @Column({ default: 0, select: false })
  archived!: boolean;

  @ManyToOne('AvatarBorder', { nullable: true })
  avatarBorder!: Relation<AvatarBorder> | null;

  @ManyToOne('User', (user: User) => user.avatars, { onDelete: 'CASCADE', nullable: true })
  user!: Relation<User> | null;
}
