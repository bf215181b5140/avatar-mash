import { BaseEntity, BeforeInsert, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { nanoid } from 'nanoid';

export abstract class BaseIdEntity extends BaseEntity {
  @PrimaryColumn({ length: 20, unique: true })
  id: string;

  @CreateDateColumn({ select: false })
  createDate: Date;

  @UpdateDateColumn({ select: false })
  updateDate: Date;

  @BeforeInsert()
  generateId() {
    // timestamp every 10 seconds + 6 random characters
    // supposedly having predictable timestamps makes this is faster for querying by id than using uuid
    this.id = Math.floor((Date.now() - Date.UTC(2025, 0)) / 10000).toString(16) + '-' + nanoid(6);
  }
}

