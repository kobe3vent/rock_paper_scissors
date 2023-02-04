import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @CreateDateColumn({
    select: false,
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @UpdateDateColumn({
    select: false,
    type: 'timestamp with time zone',
  })
  updatedAt: Date;
}
