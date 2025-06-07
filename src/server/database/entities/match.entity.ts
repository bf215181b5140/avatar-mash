import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { BaseIdEntity } from './baseId.entity';
import type { Avatar } from './avatar.entity';

@Entity()
export class Match extends BaseIdEntity {
  @ManyToOne('Avatar', { onDelete: 'CASCADE' })
  avatar1: Relation<Avatar>;

  @ManyToOne('Avatar', { onDelete: 'CASCADE' })
  avatar2: Relation<Avatar>;

  @Column({ default: 0 })
  submitted: boolean;

  @Column('enum', { enum: [1, 2], nullable: true })
  winner: number | null;

  @Column('int', { nullable: true })
  change: number | null;
}
