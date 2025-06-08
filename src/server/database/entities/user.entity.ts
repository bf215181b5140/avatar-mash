import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { BaseIdEntity } from './baseId.entity';
import type { Avatar } from './avatar.entity';
import type { Credentials } from './credentials.entity';

@Entity()
export class User extends BaseIdEntity {
  @Column('text')
  displayName!: string;

  @Column('text')
  image!: string | null;

  @OneToMany('Avatar', (avatar: Avatar) => avatar.user)
  avatars!: Relation<Avatar[]>;

  @OneToMany('Credentials', (credentials: Credentials) => credentials.user)
  credentials!: Relation<Credentials[]>;
}
