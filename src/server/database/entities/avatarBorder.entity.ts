import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';
import { AvatarBorderName, AvatarBorderNameSchema } from '../../../shared/schemas/avatarBorder';

@Entity()
export class AvatarBorder extends BaseEntity {
  @PrimaryColumn('enum', { enum: AvatarBorderNameSchema.options, unique: true })
  name: AvatarBorderName;
}
