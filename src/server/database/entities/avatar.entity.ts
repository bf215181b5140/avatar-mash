import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { BaseIdEntity } from './baseId.entity';
import type { User } from './user.entity';
import { AvatarInfoPosition, AvatarInfoPositionSchema } from '../../../shared/schemas/avatar';
import type { AvatarBorder } from './avatarBorder.entity';

@Entity()
export class Avatar extends BaseIdEntity {
  @Column({ unique: true })
  filename!: string;

  @Column({ default: 0, select: false })
  approved!: boolean;

  @Column({ default: 1300, select: false })
  elo!: number;

  @Column({ length: 32, default: '' })
  label!: string;

  @Column({ length: 100, default: '' })
  link_x!: string;

  @Column({ length: 100, default: '' })
  link_vrc!: string;

  @Column({ length: 100, default: '' })
  discord!: string;

  @Column('enum', { enum: AvatarInfoPositionSchema.options, default: AvatarInfoPositionSchema.enum.bottom })
  infoPosition!: AvatarInfoPosition;

  @ManyToOne('AvatarBorder', { nullable: true })
  avatarBorder!: Relation<AvatarBorder> | null;

  @ManyToOne('User', (user: User) => user.avatars, { onDelete: 'CASCADE', nullable: true })
  user!: Relation<User> | null;
}
